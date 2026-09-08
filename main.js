// ===== Конфетти при клике =====
document.addEventListener('click', (e) => {
    if (e.target.closest('.fun-card') || e.target.closest('.btn-primary')) {
        createConfetti(e.clientX, e.clientY);
    }
});

function createConfetti(x, y) {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#c44dff', '#4d79ff', '#00d4ff', '#00e676', '#ffeb3b', '#ff9100'];
    const shapes = ['■', '●', '▲', '★', '♦'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        
        // Случайное направление разлёта
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 100;
        
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ===== Анимация счётчиков =====
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        el.textContent = current.toLocaleString('ru-RU');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString('ru-RU') + '+';
        }
    }
    
    requestAnimationFrame(update);
}

// ===== Tilt-эффект для карточек =====
document.querySelectorAll('.fun-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Приветствие =====
console.log('%c🎉 Добро пожаловать в ИнфоМир!', 'font-size: 20px; color: #c44dff; font-weight: bold;');
console.log('%cЗдесь учиться — одно удовольствие! 🚀', 'font-size: 14px; color: #ff6b9d;');