// Supabase Config from Ramesh
const SUPABASE_URL = 'https://tzzswixccstjhzyzhkfz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6enN3aXhjY3N0amh6eXpoa2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTE0MjksImV4cCI6MjA1NzI4NzQyOX0.Nv1JzlHhst1ouCUzlkKEfQjD7zJ09CpWzaCmXiOgo6c';

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Calculator logic
    document.getElementById('calculatorForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const ctc = parseFloat(document.getElementById('ctc').value);
        const days = parseInt(document.getElementById('days').value);

        if (isNaN(ctc) || isNaN(days) || ctc < 0 || days < 0) {
            alert('Please enter valid positive numbers!');
            return;
        }

        const allowance = (ctc / 240) * 0.25 * days;
        const resultDiv = document.getElementById('result');
        const allowanceAmount = document.getElementById('allowanceAmount');
        const shareButton = document.getElementById('shareResult');
        const message = document.getElementById('message');
        const investTip = document.getElementById('investTip');
        const rainContainer = document.getElementById('currencyRain');

        let spins = 0;
        const spinInterval = setInterval(() => {
            allowanceAmount.textContent = (Math.random() * 10000).toFixed(2);
            spins++;
            if (spins >= 5) {
                clearInterval(spinInterval);
                allowanceAmount.textContent = allowance.toFixed(2);
                allowanceAmount.style.animation = 'none';
                shareButton.style.display = 'inline-block';
            }
        }, 100);

        resultDiv.style.display = 'block';
        resultDiv.style.opacity = '0';
        setTimeout(() => resultDiv.style.opacity = '1', 10);

        for (let i = 0; i < 100; i++) {
            const rupee = document.createElement('div');
            rupee.textContent = '₹';
            rupee.className = 'rupee';
            rupee.style.left = `${Math.random() * 100}%`;
            rupee.style.animationDelay = `${Math.random() * 2}s`;
            rainContainer.appendChild(rupee);
            setTimeout(() => rupee.remove(), 8000);
        }

        const messages = [
            "Time to treat yourself, boss!",
            "Paisa hi paisa hoga!",
            "Night shift pays off!",
            "Ka-ching, you’re rich!"
        ];
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        message.style.display = 'block';
        setTimeout(() => message.style.display = 'none', 3000);

        const tips = [
            "Tip: Invest in a mutual fund for steady growth!",
            "Tip: Try a fixed deposit for safe returns!",
            "Tip: Sip some cash into an SIP each month!",
            "Tip: Buy some stocks—risk it for the biscuit!"
        ];
        investTip.textContent = tips[Math.floor(Math.random() * tips.length)];
        investTip.style.display = 'block';
        setTimeout(() => investTip.style.display = 'none', 5000);

        shareButton.onclick = () => {
            const shareText = `I earned ₹${allowance.toFixed(2)} for ${days} night shifts with the Night Shift Allowance Calculator! Check it out: https://night-shift-calculator-ideas.netlify.app/`;
            navigator.clipboard.writeText(shareText).then(() => alert('Result copied to clipboard! Share it with your friends!'));
        };
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('change', function() {
        const body = document.body;
        if (this.checked) {
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
        } else {
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
        }
    });

    // Community tips with Supabase
    document.getElementById('tipForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const tipInput = document.getElementById('tipInput');
        const tipText = tipInput.value.trim();
        if (tipText) {
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/tips`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    },
                    body: JSON.stringify({ text: tipText })
                });
                const responseBody = await response.text();
                if (response.ok) {
                    console.log('Tip saved:', tipText, 'at', new Date().toLocaleTimeString());
                    tipInput.value = '';
                    fetchTips(); // Immediate update after save
                } else {
                    throw new Error(`Save failed: ${response.status} - ${responseBody}`);
                }
            } catch (error) {
                console.error('Save error:', error);
                alert('Failed to save tip—saved locally.');
                saveTipLocally(tipText);
                tipInput.value = '';
            }
        }
    });

    // Start polling for tips
    fetchTips(); // Initial fetch
    setInterval(fetchTips, 10000); // Poll every 10 seconds
});

// Tip functions
function saveTipLocally(tipText) {
    let tips = JSON.parse(localStorage.getItem('nightShiftTips') || '[]');
    tips.push(tipText);
    localStorage.setItem('nightShiftTips', JSON.stringify(tips));
    displayLocalTips();
}

async function fetchTips() {
    const tipDisplay = document.getElementById('tipDisplay');
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
            // Only update if new tips differ to avoid resetting rotation
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
        console.error
