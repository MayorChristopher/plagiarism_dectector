const express = require('express');
const fetch = require('node-fetch');
const multer = require('multer');
const FormData = require('form-data');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors({
    origin: [
        'https://mouaupd.vercel.app', // your production frontend
        'http://localhost:5173',      // your local dev (optional)
        'http://localhost:3000'       // your local dev (optional)
    ],
    credentials: true
}));
app.use(express.json());
const upload = multer();

const CLIENT_ID = process.env.CLIENT_ID || 'hackonrichard@gmail.com'; // <-- your Copyleaks account email
const CLIENT_SECRET = process.env.CLIENT_SECRET || '328dfc6e-3671-405a-8e4e-5579853c9656'; // <-- your API key

let accessToken = null;
let tokenExpires = 0;

async function getAccessToken() {
    const now = Date.now();
    if (accessToken && tokenExpires > now + 60000) return accessToken;
    const res = await fetch('https://id.copyleaks.com/v3/account/login/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: CLIENT_ID, key: CLIENT_SECRET }),
    });
    const raw = await res.text();
    console.log('Copyleaks auth response:', raw); // <-- Add this line
    const data = JSON.parse(raw);
    accessToken = data.access_token;
    tokenExpires = now + (data.expires_in || 3600) * 1000;
    return accessToken;
}

function generateScanId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16)
    );
}

app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const token = await getAccessToken();
        const scanId = generateScanId();
        const url = `https://api.copyleaks.com/v3/scans/submit/file/${scanId}`;

        // Convert file buffer to base64
        const base64 = req.file.buffer.toString('base64');
        const filename = req.file.originalname;

        const copyleaksRes = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                base64,
                filename,
                properties: {
                    webhooks: {
                        status: "https://webhook.site/fd7d1cc6-0ef9-4317-8740-37675d892955"
                    }
                }
            }),
        });

        const copyleaksText = await copyleaksRes.text();
        console.log('Copyleaks upload response:', copyleaksText);

        if (!copyleaksRes.ok) {
            return res.status(500).json({ error: 'Copyleaks upload failed', details: copyleaksText });
        }

        // Try to parse the response to get the actual scan ID from Copyleaks
        let actualScanId = scanId;
        try {
            const responseData = JSON.parse(copyleaksText);
            if (responseData.scanId) {
                actualScanId = responseData.scanId;
            }
        } catch (e) {
            // If parsing fails, use our generated ID
            console.log('Could not parse Copyleaks response, using generated ID');
        }

        res.json({ id: actualScanId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/report/:scanId', async (req, res) => {
    try {
        const token = await getAccessToken();
        const url = `https://api.copyleaks.com/v3/scans/${req.params.scanId}/result`;
        const copyleaksRes = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (copyleaksRes.status === 404) {
            return res.json({ status: 'processing' });
        }
        const data = await copyleaksRes.json();
        data.status = "finished"; // Normalize for frontend

        // Normalize for frontend expectations:
        data.plagiarism = data.results?.score?.aggregatedScore ?? 0;
        data.matches = (data.results?.internet ?? []).map((m, i) => ({
            id: m.id || i + 1,
            text: m.introduction || m.title || "",
            source: m.title || m.url || "Unknown Source",
            url: m.url || "",
            similarity: m.similarity || m.aggregatedScore || m.matchedWords || 0,
            type: "exact", // or infer from Copyleaks fields if possible
        }));

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add DELETE endpoint to delete scans from Copyleaks
app.delete('/api/scan/:scanId', async (req, res) => {
    try {
        const token = await getAccessToken();
        const url = `https://api.copyleaks.com/v3/scans/${req.params.scanId}`;

        console.log(`Attempting to delete scan: ${req.params.scanId}`);
        console.log(`Delete URL: ${url}`);

        const copyleaksRes = await fetch(url, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        const responseText = await copyleaksRes.text();
        console.log(`Delete response status: ${copyleaksRes.status}`);
        console.log(`Delete response: ${responseText}`);

        if (copyleaksRes.status === 404) {
            // Treat as success: scan already deleted
            return res.json({ success: true, message: 'Scan already deleted or not found on Copyleaks' });
        }

        if (copyleaksRes.ok) {
            res.json({ success: true, message: 'Scan deleted successfully from Copyleaks' });
        } else {
            res.status(copyleaksRes.status).json({
                error: 'Failed to delete scan from Copyleaks',
                details: responseText
            });
        }
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add endpoint to list all scans (optional, for debugging)
app.get('/api/scans', async (req, res) => {
    try {
        const token = await getAccessToken();
        const url = 'https://api.copyleaks.com/v3/scans';

        console.log('Fetching scans from:', url);
        console.log('Using token:', token.substring(0, 10) + '...');

        const copyleaksRes = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        const responseText = await copyleaksRes.text();
        console.log('Scans response status:', copyleaksRes.status);
        console.log('Scans response:', responseText);

        if (copyleaksRes.ok) {
            const data = JSON.parse(responseText);
            res.json(data);
        } else {
            res.status(copyleaksRes.status).json({
                error: 'Failed to fetch scans',
                details: responseText
            });
        }
    } catch (err) {
        console.error('Error fetching scans:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add endpoint to manually delete specific scans (for testing)
app.post('/api/delete-scans', async (req, res) => {
    try {
        const { scanIds } = req.body;
        if (!scanIds || !Array.isArray(scanIds)) {
            return res.status(400).json({ error: 'scanIds array is required' });
        }

        const token = await getAccessToken();
        const results = [];

        for (const scanId of scanIds) {
            let retries = 3;
            let success = false;

            while (retries > 0 && !success) {
                try {
                    const url = `https://api.copyleaks.com/v3/scans/${scanId}`;
                    console.log(`Deleting scan: ${scanId} (attempt ${4 - retries}/3)`);

                    const copyleaksRes = await fetch(url, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: 10000 // 10 second timeout
                    });

                    const responseText = await copyleaksRes.text();
                    console.log(`Delete response for ${scanId}: ${copyleaksRes.status} - ${responseText}`);

                    results.push({
                        scanId,
                        success: copyleaksRes.ok,
                        status: copyleaksRes.status,
                        response: responseText,
                        attempts: 4 - retries
                    });

                    success = true; // Exit retry loop
                } catch (err) {
                    console.error(`Error deleting scan ${scanId} (attempt ${4 - retries}/3):`, err.message);
                    retries--;

                    if (retries === 0) {
                        results.push({
                            scanId,
                            success: false,
                            error: err.message,
                            attempts: 3
                        });
                    } else {
                        // Wait before retry
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }
            }
        }

        res.json({ results });
    } catch (err) {
        console.error('Bulk delete error:', err);
        res.status(500).json({ error: err.message });
    }
});

// === AI Content Detection Endpoint ===
app.post('/api/ai-content-detect', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid text field.' });
        }
        // Forward the text to the Python AI detector service
        const response = await fetch('https://ai-detector-service.onrender.com/detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        if (!response.ok) {
            const errorText = await response.text();
            return res.status(500).json({ error: 'AI detector service error', details: errorText });
        }
        const result = await response.json();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
