// ============================================
// CHETAN VERMA PORTFOLIO — main.js
// ============================================

// ---- NAVBAR: scroll effect + active section ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- SCROLL REVEAL OBSERVER ----
const revealEls = document.querySelectorAll('.reveal, .fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// ---- SMOOTH SCROLL for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- CURSOR TRAIL (subtle) ----
let mouseX = 0, mouseY = 0;
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; width: 6px; height: 6px;
  background: rgba(0,212,255,0.6); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s, opacity 0.3s;
  mix-blend-mode: screen;
`;
document.body.appendChild(cursor);

const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none; z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.6s ease, top 0.6s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  glow.style.left = mouseX + 'px';
  glow.style.top = mouseY + 'px';
});

// Hide cursor dot on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  glow.style.display = 'none';
}

// ---- SKILL PILLS: stagger animation on reveal ----
const skillGroups = document.querySelectorAll('.skill-group');
skillGroups.forEach(group => {
  const groupObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pills = entry.target.querySelectorAll('.skill-pills span');
        pills.forEach((pill, i) => {
          pill.style.opacity = '0';
          pill.style.transform = 'translateY(8px)';
          pill.style.transition = `opacity 0.4s ${0.05 * i + 0.2}s ease, transform 0.4s ${0.05 * i + 0.2}s ease`;
          requestAnimationFrame(() => {
            pill.style.opacity = '1';
            pill.style.transform = 'translateY(0)';
          });
        });
        groupObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  groupObserver.observe(group);
});

// ---- COUNTER ANIMATION for stat numbers ----
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statCards = document.querySelectorAll('.stat-card');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      if (numEl) {
        const text = numEl.textContent;
        const num = parseInt(text);
        const suffix = text.includes('%') ? '%' : '+';
        animateCounter(numEl, num, suffix);
      }
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(card => statObserver.observe(card));

// ---- TYPING EFFECT for hero title ----
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const originalText = heroTitle.innerHTML;
  // Already has HTML — just add a blinking cursor via CSS class
  heroTitle.classList.add('typed');
}
