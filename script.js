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
    const message = document.getElementById('message');
    const investTip = document.getElementById('investTip');
    const rainContainer = document.getElementById('currencyRain');

    // Slot machine effect - Stop after 5 spins
    let spins = 0;
    const spinInterval = setInterval(() => {
        allowanceAmount.textContent = (Math.random() * 10000).toFixed(2);
        spins++;
        if (spins >= 5) {
            clearInterval(spinInterval);
            allowanceAmount.textContent = allowance.toFixed(2);
            allowanceAmount.style.animation = 'none';
        }
    }, 100);

    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.opacity = '1';
    }, 10);

    // Currency rain - 100 symbols
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
});

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
