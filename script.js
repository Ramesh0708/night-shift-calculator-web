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

    // Slot machine effect
    let spins = 0;
    const spinInterval = setInterval(() => {
        allowanceAmount.textContent = (Math.random() * 10000).toFixed(2);
        spins++;
        if (spins >= 5) {
            clearInterval(spinInterval);
            allowanceAmount.textContent = allowance.toFixed(2);
            allowanceAmount.style.animation = 'none';
            shareButton.style.display = 'inline-block'; // Show share button
        }
    }, 100);

    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    setTimeout(() => resultDiv.style.opacity = '1', 10);

    // Currency rain
    for (let i = 0; i < 100; i++) {
        const rupee = document.createElement('div');
        rupee.textContent = '₹';
        rupee.className = 'rupee';
        rupee.style.left = `${Math.random() * 100}%`;
        rupee.style.animationDelay = `${Math.random() * 2}s`;
        rainContainer.appendChild(rupee);
        setTimeout(() => rupee.remove(), 8000);
    }

    // Celebration message
    const messages = [
        "Time to treat yourself, boss!",
        "Paisa hi paisa hoga!",
        "Night shift pays off!",
        "Ka-ching, you’re rich!"
    ];
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    message.style.display = 'block';
    setTimeout(() => message.style.display = 'none', 3000);

    // Investing tip
    const tips = [
        "Tip: Invest in a mutual fund for steady growth!",
        "Tip: Try a fixed deposit for safe returns!",
        "Tip: Sip some cash into an SIP each month!",
        "Tip: Buy some stocks—risk it for the biscuit!"
    ];
    investTip.textContent = tips[Math.floor(Math.random() * tips.length)];
    investTip.style.display = 'block';
    setTimeout(() => investTip.style.display = 'none', 5000);

    // Share result
    shareButton.onclick = () => {
        const shareText = `I earned ₹${allowance.toFixed(2)} for ${days} night shifts with the Night Shift Allowance Calculator! Check it out: https://night-shift-calculator-ideas.netlify.app/`;
        navigator.clipboard.writeText(shareText).then(() => alert('Result copied to clipboard! Share it with your friends!'));
    };
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
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

// Community tips
document.getElementById('tipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipInput = document.getElementById('tipInput');
    const tipText = tipInput.value.trim();
    if (tipText) {
        let tips = JSON.parse(localStorage.getItem('nightShiftTips') || '[]');
        tips.push(tipText);
        localStorage.setItem('nightShiftTips', JSON.stringify(tips));
        tipInput.value = '';
        displayTips();
    }
});

function displayTips() {
    const tips = JSON.parse(localStorage.getItem('nightShiftTips') || '[]');
    const tipDisplay = document.getElementById('tipDisplay');
    if (tips.length === 0) {
        tipDisplay.textContent = 'Submit a tip to see it here!';
        return;
    }
    let index = 0;
    tipDisplay.textContent = tips[index];
    setInterval(() => {
        index = (index + 1) % tips.length;
        tipDisplay.textContent = tips[index];
    }, 5000); // Rotate every 5 seconds
}

// Load tips on page load
displayTips();
