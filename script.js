// ── Typing animation ──────────────────────────────────────────────
const phrases = [
  'Resilient Infrastructure',
  'Cloud Architectures',
  'Observability Stacks',
  'Metrics That Matter',
  'Systems That Scale',
];

let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];

  typedEl.textContent = deleting
    ? current.slice(0, --charIdx)
    : current.slice(0, ++charIdx);

  let delay = deleting ? 48 : 88;

  if (!deleting && charIdx === current.length) {
    delay    = 2200;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting  = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay     = 380;
  }

  setTimeout(type, delay);
}

type();

// ── Nav: scroll class + active link ───────────────────────────────
const nav      = document.getElementById('nav');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
  );
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile nav toggle ─────────────────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));

navLinksEl.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinksEl.classList.remove('open'))
);

// ── Scroll reveal (IntersectionObserver) ─────────────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Counter animation for hero stats ─────────────────────────────
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 30));

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value[data-count]')
  .forEach(el => counterObserver.observe(el));

// ── Scroll rocket ─────────────────────────────────────────────────
const scrollRocket = document.getElementById('scrollRocket');
let rocketTicking = false;
function updateRocket() {
  if (rocketTicking) return;
  rocketTicking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    scrollRocket.style.setProperty('--rocket-progress', progress.toFixed(4));
    rocketTicking = false;
  });
}
window.addEventListener('scroll', updateRocket, { passive: true });
window.addEventListener('resize', updateRocket);
updateRocket();

// ── Resume button placeholder ─────────────────────────────────────
document.getElementById('resumeBtn')?.addEventListener('click', e => {
  // Replace href="#" with your actual resume PDF path, e.g. href="resume.pdf"
  if (e.currentTarget.getAttribute('href') === '#') {
    e.preventDefault();
    alert('Resume coming soon! Update the href in index.html to point to your PDF.');
  }
});