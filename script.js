// Supabase Config from Ramesh
const SUPABASE_URL = 'https://tzzswixccstjhzyzhkfz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6enN3aXhjY3N0amh6eXpoa2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTE0MjksImV4cCI6MjA1NzI4NzQyOX0.Nv1JzlHhst1ouCUzlkKEfQjD7zJ09CpWzaCmXiOgo6c';

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
        ru
