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

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
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
        // Optional: Add any custom handling here
        console.log('Email contact initiated');
    });
}

// ===== EXTERNAL LINK HANDLING =====
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Links will open in new tab due to target="_blank"
        console.log('Opening external link:', link.href);
    });
});

// ===== LAZY LOADING IMAGE EFFECT =====
// This prepares the portfolio for future image additions
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.loading = 'lazy';
});

// ===== PRINT STYLES =====
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .navbar, .hero-buttons, footer {
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

console.log('Portfolio loaded successfully!');
