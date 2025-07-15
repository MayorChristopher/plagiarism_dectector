// Copyleaks API integration
// Docs: https://api.copyleaks.com/documentation/v3

const COPYLEAKS_CLIENT_ID = "37934be1-fa06-41ee-b985-313591ab0d1c";
const COPYLEAKS_CLIENT_SECRET = "bd3f04df-24c8-4fb1-8a44-773f182b90a4";
const COPYLEAKS_AUTH_URL = "https://id.copyleaks.com/v3/account/login";
const COPYLEAKS_API_BASE = "https://api.copyleaks.com/v3";

let accessToken = null;
let tokenExpires = 0;

async function getAccessToken() {
    const now = Date.now();
    if (accessToken && tokenExpires > now + 60000) {
        return accessToken;
    }
    const res = await fetch(COPYLEAKS_AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: COPYLEAKS_CLIENT_ID,
            key: COPYLEAKS_CLIENT_SECRET,
        }),
    });
    if (!res.ok) throw new Error("Copyleaks authentication failed");
    const data = await res.json();
    accessToken = data.access_token;
    tokenExpires = now + (data.expires_in || 3600) * 1000;
    return accessToken;
}

function generateScanId() {
    // Copyleaks requires a unique scanId (UUID or similar)
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export async function uploadFile(file) {
    // Copyleaks: submit file and return scanId
    const token = await getAccessToken();
    const scanId = generateScanId();
    const url = `${COPYLEAKS_API_BASE}/scans/submit/file/${scanId}`;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error("Copyleaks file upload failed: " + err);
    }
    return { id: scanId };
}

export async function checkFile(scanId) {
    // Copyleaks: scan is started on upload, so just return scanId
    return { id: scanId };
}

export async function getReport(scanId) {
    // Copyleaks: poll for results
    const token = await getAccessToken();
    const url = `${COPYLEAKS_API_BASE}/scans/${scanId}/result`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.status === 404) {
        // Not ready yet
        return { status: "processing" };
    }
    if (!res.ok) {
        const err = await res.text();
        throw new Error("Copyleaks get report failed: " + err);
    }
    const data = await res.json();
    // Transform Copyleaks results to match your app's expectations
    let plagiarism = 0;
    let matches = [];
    if (Array.isArray(data.results)) {
        matches = data.results.map((result, i) => ({
            id: i + 1,
            text: result.text || result.matchedText || "Matched text",
            source: result.url || result.title || "Source",
            url: result.url || "",
            similarity: result.percentage || 100,
            type: result.type || "match",
        }));
        plagiarism = matches.length > 0 ? Math.round(
            matches.reduce((acc, m) => acc + (m.similarity || 0), 0) / matches.length
        ) : 0;
    }
    return {
        id: scanId,
        status: "finished",
        plagiarism,
        matches,
    };
} 