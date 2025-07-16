import fetch from 'node-fetch';

const CLIENT_ID = 'hackonrichard@gmail.com';
const CLIENT_SECRET = '328dfc6e-3671-405a-8e4e-5579853c9656';

const scanIds = [
    "9258a0ef-8066-4678-a654-f55ee45d2cf9",
    "1440577b-df70-4ba0-b9ac-099241b38dfd",
    "d5a3400e-285d-4ef8-859a-c65e814c46ac",
    "80959602-7b66-4eca-b54a-e4135b4557fa",
    "sample-6xix",
    "23d149df-f5a8-4037-8d2e-66bbe9aa63e1",
    "0c046a24-a5e8-44d1-aee5-245c890bbfdb",
    "dce4d79f-9bb8-4306-829e-9442431e7d19",
    "b9bf42ae-1e11-4dd3-a92c-1ceeb43393ca",
    "b6f0e69d-c12f-4bec-9df3-f4f7a2317be0",
    "sample-vell",
    "sample-ojh3",
    "sample-sqzw"
];

async function getAccessToken() {
    const res = await fetch('https://id.copyleaks.com/v3/account/login/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: CLIENT_ID, key: CLIENT_SECRET }),
    });
    const data = await res.json();
    return data.access_token;
}

async function deleteScan(scanId, token) {
    const url = `https://api.copyleaks.com/v3/scans/${scanId}`;
    console.log(`Deleting scan: ${scanId}`);

    const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    const responseText = await res.text();
    console.log(`Response: ${res.status} - ${responseText}`);

    return {
        scanId,
        success: res.ok,
        status: res.status,
        response: responseText
    };
}

async function main() {
    try {
        console.log('Getting access token...');
        const token = await getAccessToken();
        console.log('Token obtained successfully');

        console.log(`\nAttempting to delete ${scanIds.length} scans...`);
        const results = [];

        for (const scanId of scanIds) {
            try {
                const result = await deleteScan(scanId, token);
                results.push(result);

                // Wait 1 second between requests to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(`Failed to delete ${scanId}:`, error.message);
                results.push({
                    scanId,
                    success: false,
                    error: error.message
                });
            }
        }

        console.log('\n=== RESULTS ===');
        const successCount = results.filter(r => r.success).length;
        const failCount = results.length - successCount;

        console.log(`Successfully deleted: ${successCount}`);
        console.log(`Failed: ${failCount}`);

        if (failCount > 0) {
            console.log('\nFailed scans:');
            results.filter(r => !r.success).forEach(r => {
                console.log(`- ${r.scanId}: ${r.error || r.response}`);
            });
        }

    } catch (error) {
        console.error('Script failed:', error.message);
    }
}

main(); 