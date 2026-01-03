// Funkcja dla automatu do gry
function spinSlots(type = 'fruits') {
    let reels, symbols;
    if (type === 'fruits') {
        reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];
        symbols = ['🍒', '🍋', '🍊', '🍇', '🍓', '🍉', '🍏', '🍌'];
    } else if (type === 'diamonds') {
        reels = [
            document.getElementById('dreel1'),
            document.getElementById('dreel2'),
            document.getElementById('dreel3')
        ];
        symbols = ['💎', '🔷', '🔶', '🔺', '🔸', '🔹', '🟦', '🟪'];
    } else if (type === 'cyber') {
        reels = [
            document.getElementById('creel1'),
            document.getElementById('creel2'),
            document.getElementById('creel3')
        ];
        symbols = ['🤖', '🦾', '🔋', '💾', '🛸', '🦿', '⚡', '🧬'];
    }

    // Animacja wirowania
    reels.forEach(reel => {
        reel.style.animation = 'spin 0.5s ease-in-out';
    });

    setTimeout(() => {
        reels.forEach(reel => {
            reel.style.animation = '';
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });

        // Sprawdź czy wygrana
        const results = Array.from(reels).map(reel => reel.textContent);
        if (results[0] === results[1] && results[1] === results[2]) {
            showWinMessage('🎉 JACKPOT! Wygrywasz 1000 zł!');
            updateBalance(1000);
        } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
            showWinMessage('💰 Mała wygrana! +50 zł');
            updateBalance(50);
        } else {
            showWinMessage('😔 Spróbuj ponownie!');
            updateBalance(-10); // Koszt gry
        }
    }, 500);
}

// Funkcja aktualizacji salda
function updateBalance(amount) {
    const balanceElement = document.querySelector('.nav-balance span strong');
    let currentBalance = parseInt(balanceElement.textContent.replace(' zł', ''));
    currentBalance += amount;
    balanceElement.textContent = currentBalance + ' zł';

    // Zmień kolor w zależności od wygranej/przegranej
    if (amount > 0) {
        balanceElement.style.color = '#00ff00';
        setTimeout(() => balanceElement.style.color = '', 2000);
    } else if (amount < 0) {
        balanceElement.style.color = '#ff4444';
        setTimeout(() => balanceElement.style.color = '', 2000);
    }
}

function showWinMessage(message) {
    // Utwórz element powiadomienia
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
    notification.style.color = '#000';
    notification.style.padding = '20px 40px';
    notification.style.borderRadius = '20px';
    notification.style.fontSize = '1.5rem';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
    notification.style.zIndex = '9999';
    notification.style.animation = 'jackpotPulse 1s ease-in-out infinite';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Animacja licznika jackpot
function animateJackpot() {
    const jackpotElement = document.getElementById('jackpotAmount');
    let currentAmount = 2547891;
    let targetAmount = 2547891 + Math.floor(Math.random() * 10000);

    const interval = setInterval(() => {
        if (currentAmount < targetAmount) {
            currentAmount += Math.floor(Math.random() * 100) + 1;
            jackpotElement.textContent = currentAmount.toLocaleString() + ' zł';
        } else {
            clearInterval(interval);
            setTimeout(animateJackpot, 5000); // Restart za 5 sekund
        }
    }, 100);
}

// Efekt matrix rain
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';

    for (let i = 0; i < 100; i++) {
        const span = document.createElement('span');
        span.textContent = Math.random() > 0.5 ? '1' : '0';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 10 + 's';
        matrixContainer.appendChild(span);
    }

    document.body.appendChild(matrixContainer);
}

// Smooth scrolling dla linków nawigacyjnych
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Intersection Observer dla animacji
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Obserwuj elementy do animacji
document.querySelectorAll('.game-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formularz kontaktowy
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Pobierz dane formularza
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Symulacja wysłania
        console.log('Wysyłanie formularza:', data);

        // Pokaż komunikat sukcesu
        alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');

        // Wyczyść formularz
        this.reset();
    });
}

// Slot machine switcher
const machineBtns = document.querySelectorAll('.machine-btn');
const slotMachines = {
    fruits: document.getElementById('slot-fruits'),
    diamonds: document.getElementById('slot-diamonds'),
    cyber: document.getElementById('slot-cyber')
};

machineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-machine');
        Object.keys(slotMachines).forEach(key => {
            slotMachines[key].style.display = (key === type) ? '' : 'none';
        });
    });
});

// Funkcja dla przycisków "Graj teraz"
document.querySelectorAll('.btn-play').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const gameCards = document.querySelectorAll('.game-card');
        const gameType = gameCards[index].querySelector('h3').textContent;

        if (gameType === 'Automaty') {
            // Przewiń do sekcji hero z automatem
            document.querySelector('#home').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Pokaż komunikat
            showGameMessage('🎰 Automat jest gotowy do gry! Kliknij SPIN aby zacząć.');
        } else {
            // Dla innych gier - placeholder
            showGameMessage(`🎮 Gra "${gameType}" będzie dostępna wkrótce!`);
        }
    });
});

function showGameMessage(message) {
    // Utwórz element powiadomienia
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
    notification.style.color = '#000';
    notification.style.padding = '20px 30px';
    notification.style.borderRadius = '15px';
    notification.style.fontSize = '1.2rem';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    notification.style.textAlign = 'center';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Inicjalizacja po załadowaniu strony
window.addEventListener('load', () => {
    createMatrixRain();
    animateJackpot();
});