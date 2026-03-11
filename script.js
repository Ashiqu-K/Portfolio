/* ============================================================
   Muhammed Ashiqu K — Portfolio Script (Enhanced)
   ============================================================ */

// ── Custom Cursor ────────────────────────────────────────────
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Expand cursor on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-chip, .project-card, .contact-link');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ── Scroll Progress Bar ──────────────────────────────────────
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
}, { passive: true });

// ── Navbar Scroll Effect ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger Menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Typing Animation ─────────────────────────────────────────
const roles = [
    'Senior Frontend Engineer',
    'React.js Specialist',
    'TypeScript Enthusiast',
    'Next.js Developer',
    'UI Performance Geek',
];

let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    const current = roles[roleIndex];
    typedEl.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;

    let delay = isDeleting ? 55 : 95;
    if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }

    setTimeout(type, delay);
}
type();

// ── Scroll Reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero items visible immediately
document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));

// ── Animated Counter (Hero Stats) ────────────────────────────
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = entry.target.dataset.count;
            const suffix = entry.target.dataset.suffix || '';
            animateCounter(entry.target, parseInt(num), suffix);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stat-num[data-count]').forEach(el => statsObserver.observe(el));

// ── 3D Card Tilt Effect ──────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const tiltX = dy * -8;
        const tiltY = dx * 8;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => card.style.transition = '', 500);
    });
});

// ── Timeline Line Draw Animation ─────────────────────────────
const timelineLine = document.querySelector('.timeline-line');
const timelineSection = document.querySelector('.experience');

if (timelineLine && timelineSection) {
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const total = timelineSection.querySelector('.timeline').scrollHeight;
                timelineLine.style.height = total + 'px';
                lineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    lineObserver.observe(timelineSection);
}

// ── Active Nav Link Highlight ────────────────────────────────
const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNav() {
    const pos = window.scrollY + 130;
    let current = 'hero';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
    });
    navItems.forEach(a => {
        const isActive = a.getAttribute('href') === `#${current}`;
        a.style.color = (isActive && !a.classList.contains('nav-cta')) ? 'var(--text-primary)' : '';
    });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// ── Hero Background Parallax ─────────────────────────────────
const heroBg = document.getElementById('heroBg');
let heroParallaxX = 0, heroParallaxY = 0;
let targetParallaxX = 0, targetParallaxY = 0;
const PARALLAX_STRENGTH = 18; // max px shift

document.addEventListener('mousemove', e => {
    // Only active while hero is in view
    if (window.scrollY > window.innerHeight) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    // Opposite direction to cursor for depth effect
    targetParallaxX = ((e.clientX - cx) / cx) * -PARALLAX_STRENGTH;
    targetParallaxY = ((e.clientY - cy) / cy) * -PARALLAX_STRENGTH;
});

function animateParallax() {
    heroParallaxX += (targetParallaxX - heroParallaxX) * 0.06;
    heroParallaxY += (targetParallaxY - heroParallaxY) * 0.06;
    if (heroBg) {
        heroBg.style.transform =
            `scale(${1 + Math.abs(heroParallaxX + heroParallaxY) * 0.0008}) translate(${heroParallaxX}px, ${heroParallaxY}px)`;
    }
    requestAnimationFrame(animateParallax);
}
animateParallax();

// ── Projects Carousel ────────────────────────────────────────
(function () {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (!track) return;

    const cards = Array.from(track.children);
    const total = cards.length;
    let current = 0;

    function getPerView() {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }

    function maxIndex() {
        return Math.max(0, total - getPerView());
    }

    function cardWidth() {
        return cards[0].offsetWidth + 24; // card + gap (1.5rem = 24px)
    }

    function goTo(index) {
        const perView = getPerView();
        current = Math.max(0, Math.min(index, maxIndex()));
        track.style.transform = `translateX(-${current * cardWidth()}px)`;
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIndex();
    }

    // Build dots
    function buildDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    buildDots();
    goTo(0);

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 5s
    let autoTimer = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
    const viewport = track.closest('.carousel-viewport');
    viewport.addEventListener('mouseenter', () => clearInterval(autoTimer));
    viewport.addEventListener('mouseleave', () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
    });

    // Touch / mouse drag
    let startX = 0, isDragging = false;
    track.addEventListener('mousedown', e => { startX = e.clientX; isDragging = true; track.classList.add('dragging'); clearInterval(autoTimer); });
    track.addEventListener('mousemove', e => { if (!isDragging) return; e.preventDefault(); });
    track.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false; track.classList.remove('dragging');
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
    track.addEventListener('mouseleave', () => { isDragging = false; track.classList.remove('dragging'); });

    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    // Rebuild on resize
    window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, maxIndex())); });
})();
