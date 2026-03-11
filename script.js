/* ===============================================
   Muhammed Ashiqu K — Portfolio Script
   =============================================== */

// ── Typing Animation ──────────────────────────
const roles = [
  'Senior Frontend Engineer',
  'React.js Specialist',
  'TypeScript Enthusiast',
  'Next.js Developer',
  'UI Performance Geek',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

// ── Navbar Scroll Effect ───────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Hamburger Menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Scroll Reveal ──────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px',
});

revealEls.forEach(el => observer.observe(el));

// Make hero items visible immediately (above fold)
document.querySelectorAll('.hero .reveal').forEach(el => {
  el.classList.add('visible');
});

// ── Smooth Active Nav Link Highlight ──────────
const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  const scrollPos = window.scrollY + 120;
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollPos) current = id;
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--text-primary)'
      : '';
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();
