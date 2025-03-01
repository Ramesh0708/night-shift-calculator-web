document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ctc = parseFloat(document.getElementById('ctc').value);
    const days = parseInt(document.getElementById('days').value);

    if (isNaN(ctc) || isNaN(days) || ctc < 0 || days < 0) {
        alert('Please enter valid positive numbers.');
        return;
    }

    const allowance = (ctc / 240) * 0.25 * days;
    document.getElementById('allowanceAmount').textContent = allowance.toFixed(2);
    document.getElementById('result').style.display = 'block';
});