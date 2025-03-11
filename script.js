// Firebase Config from Ramesh
const firebaseConfig = {
    apiKey: "AIzaSyCBBKMKIJ8V4zriCrfG9ZqvAh9LW_nMCxM",
    authDomain: "nightshiftcalculator.firebaseapp.com",
    projectId: "nightshiftcalculator",
    storageBucket: "nightshiftcalculator.firebasestorage.app",
    messagingSenderId: "804931239067",
    appId: "1:804931239067:web:9a81be5764444bf6ec1a3e"
};

// Initialize Firebase safely
let db;
function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.log('Firebase SDK not loaded—retrying in 1s');
        setTimeout(initializeFirebase, 1000);
        return;
    }
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('Firebase initialized at', new Date().toLocaleTimeString());
        testFirestoreConnection(); // Test write on init
        displayTips();
    } catch (error) {
        console.error('Firebase init failed:', error);
        fallbackLocalTips();
    }
}

// Test Firestore connectivity
function testFirestoreConnection() {
    db.collection('test').doc('init').set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log('Test write to Firestore succeeded');
    }).catch(error => {
        console.error('Test write failed:', error);
    });
}

initializeFirebase();

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

// Community tips with Firebase
document.getElementById('tipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipInput = document.getElementById('tipInput');
    const tipText = tipInput.value.trim();
    if (tipText) {
        if (db) {
            console.log('Attempting to save tip:', tipText);
            db.collection('tips').add({
                text: tipText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                tipInput.value = '';
                console.log('Tip saved:', tipText, 'at', new Date().toLocaleTimeString());
            }).catch(error => {
                console.error('Save tip failed:', error);
                alert('Failed to save to cloud—saved locally.');
                saveTipLocally(tipText);
            });
        } else {
            console.log('Firebase not ready—saving locally');
            saveTipLocally(tipText);
            tipInput.value = '';
        }
    }
});

function saveTipLocally(tipText) {
    let tips = JSON.parse(localStorage.getItem('nightShiftTips') || '[]');
    tips.push(tipText);
    localStorage.setItem('nightShiftTips', JSON.stringify(tips));
    console.log('Saved locally:', tipText);
    fallbackLocalTips();
}

function displayTips() {
    const tipDisplay = document.getElementById('tipDisplay');
    if (!db) {
        console.log('Firebase not ready—falling back');
        tipDisplay.textContent = 'Loading tips...';
        fallbackLocalTips();
        return;
    }

    console.log('Starting listener...');
    db.collection('tips').orderBy('timestamp', 'desc').limit(10).onSnapshot(snapshot => {
        console.log('Snapshot:', snapshot.docs.length, 'tips at', new Date().toLocaleTimeString());
        const tips = snapshot.docs.map(doc => doc.data().text);
        if (tips.length === 0) {
            tipDisplay.textContent = 'No tips yet—be the first!';
            console.log('No tips in Firestore');
        } else {
            let index = 0;
            tipDisplay.textContent = tips[index];
            console.log('Showing:', tips[index]);
            clearInterval(window.tipInterval);
            window.tipInterval = setInterval(() => {
                index = (index + 1) % tips.length;
                tipDisplay.textContent = tips[index];
                console.log('Rotating to:', tips[index]);
            }, 5000);
        }
    }, error => {
        console.error('Listener error:', error);
        tipDisplay.textContent = 'Error loading tips—using local.';
        fallbackLocalTips();
    });
}

function fallbackLocalTips() {
    const tips = JSON.parse(localStorage.getItem('nightShiftTips') || '[]');
    const tipDisplay = document.getElementById('tipDisplay');
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
