// Copyleaks API integration
// Docs: https://api.copyleaks.com/documentation/v3

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://copyleaks-backend.onrender.com'; // Uses env variable if set

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error('File upload failed');
    return await res.json(); // { id }
}

export async function checkFile(scanId) {
    // No-op, scan starts on upload
    return { id: scanId };
}

export async function getReport(scanId) {
    const res = await fetch(`${BACKEND_URL}/api/report/${scanId}`);
    if (!res.ok) throw new Error('Failed to fetch report');
    return await res.json();
}

// Delete a scan from Copyleaks to free up credits
export async function deleteScan(scanId) {
    const res = await fetch(`${BACKEND_URL}/api/scan/${scanId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete scan from Copyleaks');
    return await res.json();
}

// List all scans (for debugging and management)
export async function listScans() {
    const res = await fetch(`${BACKEND_URL}/api/scans`);
    if (!res.ok) throw new Error('Failed to fetch scans');
    return await res.json();
}

// Bulk delete specific scans (for manual cleanup)
export async function deleteSpecificScans(scanIds) {
    const res = await fetch(`${BACKEND_URL}/api/delete-scans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanIds }),
    });
    if (!res.ok) throw new Error('Failed to delete scans');
    return await res.json();
} 