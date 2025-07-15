// Utility for PlagiarismCheck.org API integration
// Docs: https://plagiarismcheck.org/api/

const API_KEY = "Hi1QfJ26LG0LLKcjn-aEcPahVrYG7zKQ";
const API_BASE = "https://api.plagiarismcheck.org";

// Helper to get auth headers
function getHeaders(isFile = false) {
    return {
        Authorization: `Bearer ${API_KEY}`,
        ...(isFile ? {} : { "Content-Type": "application/json" }),
    };
}

const isLocal = false; // Always use the real API, never the mock

// Mock helpers for local development
function randomId() { return Math.random().toString(36).slice(2); }
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Mock DB for local dev
const mockDB = typeof window !== 'undefined' ? (window.__plagiarism_mock_db = window.__plagiarism_mock_db || {}) : {};

async function mockUploadFile(file) {
    await delay(500);
    const id = randomId();
    mockDB[id] = { file, status: 'uploaded', plagiarism: null };
    return { id };
}
async function mockCheckFile(fileId) {
    await delay(500);
    if (mockDB[fileId]) mockDB[fileId].status = 'checking';
    return { id: fileId };
}
async function mockGetReport(fileId) {
    await delay(1000);
    if (!mockDB[fileId]) throw new Error('Not found');
    if (!mockDB[fileId].plagiarism) {
        mockDB[fileId].plagiarism = Math.floor(Math.random() * 50);
        mockDB[fileId].status = 'finished';
    }
    // Generate matches if plagiarism > 0
    let matches = [];
    if (mockDB[fileId].plagiarism > 0) {
        // Try to extract some text from the file (if possible)
        let text = '';
        if (mockDB[fileId].file && typeof mockDB[fileId].file.text === 'function') {
            try {
                text = await mockDB[fileId].file.text();
            } catch { }
        }
        // Use a few sentences or words as matches
        if (text) {
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            matches = sentences.slice(0, Math.min(3, sentences.length)).map((sentence, i) => ({
                id: i + 1,
                text: sentence.trim(),
                source: 'Mock Source ' + (i + 1),
                url: 'https://example.com/source' + (i + 1),
                similarity: Math.floor(Math.random() * 40) + 60,
                type: Math.random() > 0.6 ? 'exact' : 'paraphrase',
            }));
        } else {
            // Fallback: generic matches
            matches = [
                {
                    id: 1,
                    text: 'Sample matched text from your document.',
                    source: 'Mock Source',
                    url: 'https://example.com/source',
                    similarity: 75,
                    type: 'paraphrase',
                },
            ];
        }
    }
    return { id: fileId, status: mockDB[fileId].status, plagiarism: mockDB[fileId].plagiarism, matches };
}
async function mockCheckText(text) {
    await delay(500);
    const id = randomId();
    mockDB[id] = { text, status: 'finished', plagiarism: Math.floor(Math.random() * 50) };
    return { id };
}
async function mockGetTextReport(textId) {
    await delay(500);
    if (!mockDB[textId]) throw new Error('Not found');
    return { id: textId, status: 'finished', plagiarism: mockDB[textId].plagiarism };
}

// Upload a file for analysis
export async function uploadFile(file) {
    if (isLocal) return mockUploadFile(file);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE}/v1/files/upload`, {
        method: "POST",
        headers: getHeaders(true),
        body: formData,
    });
    if (!res.ok) throw new Error("File upload failed");
    return res.json(); // { id: ... }
}

// Submit a file for plagiarism check
export async function checkFile(fileId) {
    if (isLocal) return mockCheckFile(fileId);
    const res = await fetch(`${API_BASE}/v1/files/${fileId}/check`, {
        method: "POST",
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Plagiarism check failed");
    return res.json(); // { id: ... }
}

// Get plagiarism report by fileId
export async function getReport(fileId) {
    if (isLocal) return mockGetReport(fileId);
    const res = await fetch(`${API_BASE}/v1/files/${fileId}/report`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch report");
    return res.json();
}

// Upload and check plain text
export async function checkText(text) {
    if (isLocal) return mockCheckText(text);
    const res = await fetch(`${API_BASE}/v1/text/check`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Text check failed");
    return res.json(); // { id: ... }
}

// Get text report by id
export async function getTextReport(textId) {
    if (isLocal) return mockGetTextReport(textId);
    const res = await fetch(`${API_BASE}/v1/text/${textId}/report`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch text report");
    return res.json();
} 