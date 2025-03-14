// Supabase Config from Ramesh
const SUPABASE_URL = 'https://tzzswixccstjhzyzhkfz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6enN3aXhjY3N0amh6eXpoa2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTE0MjksImV4cCI6MjA1NzI4NzQyOX0.Nv1JzlHhst1ouCUzlkKEfQjD7zJ09CpWzaCmXiOgo6c';

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded at', new Date().toLocaleTimeString());

    // Night Shift Calculator
    const calcForm = document.getElementById('calculatorForm');
    if (calcForm) {
        calcForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Calc submitted');

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

            const messages = ["Time to treat yourself, boss!", "Paisa hi paisa hoga!", "Night shift pays off!", "Ka-ching, you’re rich!"];
            message.textContent = messages[Math.floor(Math.random() * messages.length)];
            message.style.display = 'block';
            setTimeout(() => message.style.display = 'none', 3000);

            const tips = ["Tip: Invest in a mutual fund!", "Tip: Try a fixed deposit!", "Tip: Sip into an SIP!", "Tip: Buy stocks—risk it!"];
            investTip.textContent = tips[Math.floor(Math.random() * tips.length)];
            investTip.style.display = 'block';
            setTimeout(() => investTip.style.display = 'none', 5000);

            shareButton.onclick = () => {
                const shareText = `I earned ₹${allowance.toFixed(2)} for ${days} night shifts! Check it out: https://night-shift-calculator-ideas.netlify.app/`;
                navigator.clipboard.writeText(shareText).then(() => alert('Copied to clipboard!'));
            };
        });
    } else {
        console.error('calculatorForm not found');
    }

    // Appraisal Calculator
    const appraisalForm = document.getElementById('appraisalForm');
    if (appraisalForm) {
        appraisalForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Appraisal submitted');

            const lastCtc = parseFloat(document.getElementById('lastCtc').value);
            const currentCtc = parseFloat(document.getElementById('currentCtc').value);
            const position = document.getElementById('position').value.trim();
            const location = document.getElementById('location').value.trim();

            if (isNaN(lastCtc) || isNaN(currentCtc) || lastCtc <= 0 || currentCtc < 0) {
                alert('Please enter valid positive CTC values!');
                return;
            }

            const hike = ((currentCtc - lastCtc) / lastCtc) * 100;
            const resultDiv = document.getElementById('appraisalResult');
            const hikePercentage = document.getElementById('hikePercentage');
            const feedback = document.getElementById('appraisalFeedback');
            const shareButton = document.getElementById('shareAppraisal');

            let spins = 0;
            const spinInterval = setInterval(() => {
                hikePercentage.textContent = (Math.random() * 100).toFixed(2);
                spins++;
                if (spins >= 5) {
                    clearInterval(spinInterval);
                    hikePercentage.textContent = hike.toFixed(2);
                    hikePercentage.style.animation = 'none';
                    shareButton.style.display = 'inline-block';
                }
            }, 100);

            resultDiv.style.display = 'block';
            resultDiv.style.opacity = '0';
            setTimeout(() => resultDiv.style.opacity = '1', 10);

            let feedbackText;
            if (hike < 10) feedbackText = "Below average—might be time to negotiate!";
            else if (hike < 15) feedbackText = "Average hike—pretty standard!";
            else if (hike < 20) feedbackText = "Good hike—nice job!";
            else feedbackText = "Awesome hike—way above average!";
            feedback.textContent = feedbackText;

            shareButton.onclick = () => {
                const shareText = `I got a ${hike.toFixed(2)}% appraisal hike! Check yours at: https://night-shift-calculator-ideas.netlify.app/`;
                navigator.clipboard.writeText(shareText).then(() => alert('Copied to clipboard!'));
            };

            // Save to Supabase (optional)
            if (position && location) {
                try {
                    await fetch(`${SUPABASE_URL}/rest/v1/appraisals`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`
                        },
                        body: JSON.stringify({ hike: hike.toFixed(2), position, location })
                    });
                    console.log('Appraisal saved:', { hike, position, location });
                } catch (error) {
                    console.error('Appraisal save error:', error);
                }
            }
        });
    } else {
        console.error('appraisalForm not found');
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const body = document.body;
            if (this.checked) {
                body.classList.remove('night-mode');
                body.classList.add('day-mode');
            } else {
                body.classList.remove('day-mode');
                body.classList.add('night-mode');
            }
        });
    }

    // CTC visibility toggles
    document.getElementById('toggleCtc').addEventListener('click', () => toggleVisibility('ctc'));
    document.getElementById('toggleLastCtc').addEventListener('click', () => toggleVisibility('lastCtc'));
    document.getElementById('toggleCurrentCtc').addEventListener('click', () => toggleVisibility('currentCtc'));

    function toggleVisibility(id) {
        const input = document.getElementById(id);
        const button = input.nextElementSibling;
        if (input.type === 'password') {
            input.type = 'number';
            button.textContent = 'Hide';
        } else {
            input.type = 'password';
            button.textContent = 'Show';
        }
    }

    // Community tips
    const tipForm = document.getElementById('tipForm');
    if (tipForm) {
        tipForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Tip form submitted');
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
                    if (response.ok) {
                        console.log('Tip saved:', tipText, 'at', new Date().toLocaleTimeString());
                        tipInput.value = '';
                        fetchTips();
                    } else {
                        throw new Error('Save failed: ' + response.statusText);
                    }
                } catch (error) {
                    console.error('Save error:', error);
                    alert('Failed to save tip—saved locally.');
                    saveTipLocally(tipText);
                    tipInput.value = '';
                }
            }
        });
    }

    // Polling for tips
    fetchTips();
    const pollInterval = setInterval(() => {
        console.log('Polling tips at', new Date().toLocaleTimeString());
        fetchTips().catch(err => console.error('Poll failed:', err));
    }, 10000);
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

function displayLocalTips() {
    const tips = JSON.parse(localStorage.getItem('nightShiftTips') || '[]');
    const tipDisplay = document.getElementById('tipDisplay');
    if (!tipDisplay) return;
    if (tips.length === 0) {
        tipDisplay.textContent = 'Submit a tip to see it here!';
    } else {
        let index = 0;
        tipDisplay.textContent = tips[index];
        clearInterval(window.tipInterval);
        window.tipInterval = setInterval(() => {
            index = (index + 1) % tips.length;
            tipDisplay.textContent = tips[index];
        }, 5000);
    }
}
