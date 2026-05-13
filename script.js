// ===== INTERACTIVE BACKGROUND - MOUSE TRACKING =====
const glowFollow = document.querySelector('.glow-follow');
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseTimeout;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update glow position
    glowFollow.style.left = mouseX + 'px';
    glowFollow.style.top = mouseY + 'px';

    // Show glow on mouse move
    if (!isMouseMoving) {
        glowFollow.style.opacity = '1';
        isMouseMoving = true;
    }

    // Clear timeout
    clearTimeout(mouseTimeout);

    // Hide glow after mouse stops
    mouseTimeout = setTimeout(() => {
        glowFollow.style.opacity = '0';
        isMouseMoving = false;
    }, 1000);
});

// Hide glow when mouse leaves window
document.addEventListener('mouseleave', () => {
    glowFollow.style.opacity = '0';
    isMouseMoving = false;
});

// ===== PARTICLE SYSTEM =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = ['#0ea5e9', '#06b6d4', '#10b981'][Math.floor(Math.random() * 3)];
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.opacity = this.life * (Math.random() * 0.5 + 0.3);

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Create particles
let particles = [];

// Initialize particles
function initParticles() {
    particles = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Remove dead particles
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Randomly create new particles
    if (particles.length < 80) {
        if (Math.random() < 0.3) {
            particles.push(new Particle());
        }
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();

// Create particles on mouse move (extra effect)
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

// ===== INTERACTIVE BACKGROUND EFFECTS =====

// Mouse tracking for background gradient
document.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
    document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
    
    // Update cursor glow position
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// Create floating particles
function createParticles(count = 50) {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particles = ['small', 'medium', 'large'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${particles[Math.floor(Math.random() * particles.length)]}`;
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 2;
        const horizontalDrift = (Math.random() - 0.5) * 200;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.setProperty('--drift', horizontalDrift + 'px');
        
        container.appendChild(particle);
        
        // Remove particle after animation ends and create new one
        setTimeout(() => {
            particle.remove();
            // Create single new particle to maintain count
            createParticles(1);
        }, (duration + delay) * 1000);
    }
}

// Initialize particles with device-aware count
const isMobileDevice = () => {
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

createParticles(isMobileDevice() ? 20 : 50);

// ===== NAVIGATION MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL BEHAVIOR =====
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

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.stat-card, .education-card, .project-card, .curriculum-card, .research-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Subtle parallax effect on orbs based on scroll
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const offset = window.scrollY * (0.1 + index * 0.05);
        orb.style.transform = `translateY(${offset}px)`;
    });
});

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ===== STATS COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.ceil(current);
    }, 16);
};

// Trigger counter animation when stats section is visible
const statCards = document.querySelectorAll('.stat-number');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statCards.forEach(stat => {
                const target = parseInt(stat.textContent);
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('.about-stats')) {
    counterObserver.observe(document.querySelector('.about-stats'));
}

// ===== MOBILE MENU STYLING =====
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background: rgba(15, 23, 42, 0.98);
            flex-direction: column;
            padding: 20px;
            gap: 1rem;
            border-bottom: 1px solid var(--border-color);
            display: none !important;
        }

        .nav-menu.active {
            display: flex !important;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(style);

// ===== FLOATING ANIMATION FOR CARDS =====
const setupFloatingCards = () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animation = `float 4s ease-in-out infinite`;
        card.style.animationDelay = `${index * 1}s`;
    });
};

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn, .contact-link');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== RIPPLE EFFECT STYLES =====
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .contact-link {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    setupFloatingCards();
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
});

// ===== FADE IN UP ANIMATION =====
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// ===== SKILL TAGS ANIMATION =====
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.animation = `fadeInUp 0.5s ease-out forwards`;
    tag.style.animationDelay = `${index * 0.05}s`;
});

// ===== TIMELINE ITEM STAGGER ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `fadeInUp 0.6s ease-out forwards`;
    item.style.animationDelay = `${index * 0.15}s`;
});

// ===== RESEARCH ITEM ANIMATION =====
const researchItems = document.querySelectorAll('.research-item');
researchItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `fadeInUp 0.5s ease-out forwards`;
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    }
});

// ===== SMOOTH PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== FORM EMAIL LINK HANDLER =====
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        console.log('Email contact initiated');
    });
}

// ===== EXTERNAL LINK HANDLING =====
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Opening external link:', link.href);
    });
});

// ===== LAZY LOADING IMAGE EFFECT =====
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.loading = 'lazy';
});

// ===== PRINT STYLES =====
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .navbar, .hero-buttons, footer, .background-container {
            display: none;
        }
        
        body {
            background: white;
            color: black;
        }
        
        section {
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(printStyle);

// ===== ENHANCE SCROLL PERFORMANCE =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// ===== CURSOR ENHANCEMENT =====
document.addEventListener('mousemove', (e) => {
    // Optional: Add cursor glow effect on interactive elements
    const hoverElement = document.elementFromPoint(e.clientX, e.clientY);
    
    if (hoverElement && (hoverElement.classList.contains('btn') || 
        hoverElement.classList.contains('nav-link') ||
        hoverElement.classList.contains('skill-tag'))) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'auto';
    }
});

// ===== MOUSE CLICK SPARKLE EFFECT =====
document.addEventListener('click', (e) => {
    if (Math.random() > 0.5) {
        for (let i = 0; i < 3; i++) {
            const particle = new Particle(e.clientX, e.clientY);
            particle.speedX = (Math.random() - 0.5) * 2;
            particle.speedY = (Math.random() - 0.5) * 2;
            particle.size = Math.random() * 2 + 1;
            particles.push(particle);
        }
    }
});

console.log('✨ Interactive Portfolio loaded successfully! Move your mouse to see the magic! ✨');
