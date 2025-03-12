// [Same as above until the end of DOMContentLoaded]

// Start polling safely
fetchTips(); // Initial fetch
const pollInterval = setInterval(() => {
    console.log('Polling tips at', new Date().toLocaleTimeString());
    fetchTips().catch(err => console.error('Poll failed:', err));
}, 10000); // Every 10 seconds

// Tip functions (unchanged)
function saveTipLocally(tipText) { /* ... */ }

async function fetchTips() {
    const tipDisplay = document.getElementById('tipDisplay');
    if (!tipDisplay) {
        console.error('tipDisplay not found');
        return;
    }
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/tips?order=created_at.desc&limit=10`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        if (!response.ok) throw new Error('Fetch failed: ' + response.statusText);
        const tips = await response.json();
        console.log('Fetched:', tips.length, 'tips at', new Date().toLocaleTimeString());

        if (tips.length === 0) {
            tipDisplay.textContent = 'No tips yet—be the first!';
        } else {
            const currentTip = tipDisplay.textContent;
            if (!tips.some(tip => tip.text === currentTip)) {
                let index = 0;
                tipDisplay.textContent = tips[index].text;
                clearInterval(window.tipInterval);
                window.tipInterval = setInterval(() => {
                    index = (index + 1) % tips.length;
                    tipDisplay.textContent = tips[index].text;
                }, 5000);
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        tipDisplay.textContent = 'Error loading tips—using local.';
        displayLocalTips();
    }
}

function displayLocalTips() { /* ... */ }
