/* =========================================================
   UTKARSH KESHARI — PORTFOLIO — interactions & motion
   ========================================================= */

document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------------- Mobile menu ---------------- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

/* ---------------- Active nav tab on scroll ---------------- */
const sections = document.querySelectorAll('section[id], header[id]');
const tabs = document.querySelectorAll('.nav-tabs a[data-tab]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ---------------- Hero typing rotation ---------------- */
const typingPhrases = [
  'Building systems that scale.',
  'Java · Spring Boot · Microservices.',
  'Founder, 21Day Neem Karoli Baba.',
  'Creator of KRSON.'
];
const typingEl = document.getElementById('typingText');
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const phrase = typingPhrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    typingEl.textContent = phrase.slice(0, charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 38);
  } else {
    charIndex--;
    typingEl.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 18);
  }
}
typeLoop();

/* ---------------- Hero tilt card ---------------- */
const tiltCard = document.getElementById('tiltCard');
if (isFinePointer && !prefersReducedMotion) {
  const stage = tiltCard.parentElement;
  stage.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 22;
    const rotX = (0.5 - py) * 16;
    tiltCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  stage.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

/* ---------------- Flip card ---------------- */
const flipCard = document.getElementById('flipCard');
flipCard.addEventListener('click', () => flipCard.classList.toggle('flipped'));
flipCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flipCard.classList.toggle('flipped');
  }
});

/* ---------------- Generic scroll reveal ---------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------------- Stat counters ---------------- */
const statEls = document.querySelectorAll('.stat-num');
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statObserver.observe(el));

/* ---------------- Tech stack 3D ring ---------------- */
const skills = ['Java', 'Spring Boot', 'Spring Security', 'Hibernate', 'Spring Data JPA', 'MySQL', 'Redis', 'JWT / OAuth2', 'REST APIs', 'Maven', 'Git', 'Postman'];
const ring = document.getElementById('ring');
const ringFallback = document.getElementById('ringFallback');
const radius = 270;

skills.forEach((skill, i) => {
  const angle = (360 / skills.length) * i;
  const chip = document.createElement('div');
  chip.className = 'ring-chip';
  chip.textContent = skill;
  chip.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
  ring.appendChild(chip);

  const flat = document.createElement('span');
  flat.className = 'tag primary';
  flat.textContent = skill;
  ringFallback.appendChild(flat);
});

if (prefersReducedMotion) ring.classList.add('paused');

/* ---------------- Experience timeline progress + reveal ---------------- */
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineEl = document.querySelector('.timeline');
const timelineProgress = document.getElementById('timelineProgress');

const itemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.35 });
timelineItems.forEach(item => itemObserver.observe(item));

function updateTimelineProgress() {
  if (!timelineEl) return;
  const rect = timelineEl.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height;
  const visibleStart = vh * 0.75;
  let progressPx = visibleStart - rect.top;
  progressPx = Math.max(0, Math.min(progressPx, total));
  const pct = total > 0 ? (progressPx / total) * 100 : 0;
  timelineProgress.style.height = pct + '%';
}
window.addEventListener('scroll', updateTimelineProgress, { passive: true });
window.addEventListener('resize', updateTimelineProgress);
updateTimelineProgress();

/* ---------------- Architecture diagram flow animation ---------------- */
const archDiagram = document.getElementById('archDiagram');
const archNodes = archDiagram.querySelectorAll('[data-node]');
const archConns = archDiagram.querySelectorAll('[data-conn]');
let archTimers = [];

function clearArchTimers() { archTimers.forEach(t => clearTimeout(t)); archTimers = []; }

function runArchFlow() {
  clearArchTimers();
  archNodes.forEach(n => n.classList.remove('active'));
  archConns.forEach(c => c.classList.remove('flowing'));
  let delay = 0;
  const step = 650;
  archNodes[0].classList.add('active');
  archConns.forEach((conn, i) => {
    archTimers.push(setTimeout(() => { conn.classList.add('flowing'); }, delay));
    archTimers.push(setTimeout(() => {
      conn.classList.remove('flowing');
      archNodes[i].classList.remove('active');
      archNodes[i + 1].classList.add('active');
    }, delay + step));
    delay += step;
  });
  archTimers.push(setTimeout(() => { archNodes[archNodes.length - 1].classList.remove('active'); }, delay + 900));
}

let archInterval = null;
const archObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runArchFlow();
      if (!archInterval) archInterval = setInterval(runArchFlow, 5200);
    } else if (archInterval) {
      clearInterval(archInterval);
      archInterval = null;
      clearArchTimers();
    }
  });
}, { threshold: 0.4 });
archObserver.observe(archDiagram);

/* ---------------- Particle / depth background (hero) ---------------- */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.parentElement.clientWidth;
    h = canvas.parentElement.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const count = Math.min(110, Math.floor((w * h) / 9000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),                // depth 0 (far) - 1 (near)
      vy: 0.05 + Math.random() * 0.12,
      r: 0.6 + Math.random() * 1.8,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      const depth = 0.4 + p.z * 0.6;
      const parX = (mouseX - 0.5) * 24 * p.z;
      const parY = (mouseY - 0.5) * 24 * p.z;
      const x = p.x + parX;
      const y = p.y + parY;

      ctx.beginPath();
      ctx.arc(x, y, p.r * depth, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 217, 255, ${0.15 + p.z * 0.45})`;
      ctx.fill();

      if (!prefersReducedMotion) {
        p.y -= p.vy * depth;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      }
    }
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  if (isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    });
  }

  resize();
  // Always draw at least one frame (static field); loop only if motion is allowed.
  requestAnimationFrame(draw);
})();
