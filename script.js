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
    const moon = document.getElementById('moon');
    const chaChing = document.getElementById('chaChing');
    const resultGif = document.getElementById('resultGif');

    allowanceAmount.textContent = allowance.toFixed(2);
    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.opacity = '1';
    }, 10);

    moon.style.animation = 'glow 1s ease-in-out 2';
    setTimeout(() => {
        moon.style.animation = 'float 4s infinite ease-in-out';
    }, 2000);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: document.body.classList.contains('night-mode') ? ['#ff6f61', '#fff', '#1e3c72'] : ['#4682b4', '#ffd700', '#87ceeb']
    });

    chaChing.currentTime = 0;
    chaChing.play().catch(error => {
        console.log('Audio play failed:', error);
    });

    console.log('Showing GIF'); // Debug log
    resultGif.style.display = 'block';
    setTimeout(() => {
        console.log('Hiding GIF'); // Debug log
        resultGif.style.display = 'none';
    }, 3000);
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    const body = document.body;
    if (body.classList.contains('night-mode')) {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        themeToggle.textContent = 'Switch to Night Mode';
    } else {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        themeToggle.textContent = 'Switch to Day Mode';
    }
});
