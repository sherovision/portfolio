/* =====================================================
   SHERO VISION — script.js
   Modular vanilla JS + GSAP + ScrollTrigger + Lenis
   Sections: config / lenis / preloader / cursor / nav /
   menu / page transitions / hero / reveals / parallax /
   horizontal scroll / services / kinetic / about / video /
   process / misc
   ===================================================== */

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  isDesktop: window.matchMedia('(min-width: 1024px)').matches,
  isTouch: window.matchMedia('(hover: none)').matches,
  reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};
const FINE = CONFIG.isDesktop && !CONFIG.isTouch && !CONFIG.reduceMotion;

/* =====================================================
   LENIS SMOOTH SCROLL
   ===================================================== */
let lenis = null;
if (!CONFIG.reduceMotion) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollToTarget = (target) => {
  if (lenis) lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el === 0 || target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

/* =====================================================
   PRELOADER — cinematic film-opening sequence
   ===================================================== */
(function preloader() {
  const root = document.getElementById('preloader');
  const wordEl = document.getElementById('preloaderWord');
  const subEl = document.getElementById('preloaderSub');
  const counterEl = document.getElementById('preloaderCounter');
  const word = 'SHERO VISION';

  if (CONFIG.reduceMotion) {
    root.style.display = 'none';
    document.body.classList.add('is-ready');
    return;
  }

  lenis && lenis.stop();
  document.body.style.overflow = 'hidden';

  const counter = { v: 0 };
  const tl = gsap.timeline({
    onComplete() {
      root.style.display = 'none';
      document.body.style.overflow = '';
      lenis && lenis.start();
      document.body.classList.add('is-ready');
      heroIntro();
      ScrollTrigger.refresh();
    },
  });

  // Letter-by-letter logo build: S → SH → SHE → ... → SHERO VISION
  const letters = [];
  word.split('').forEach((ch) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? ' ' : ch;
    s.style.opacity = '0';
    s.style.display = 'inline-block';
    if (ch === ' ') s.style.width = '0.35em';
    wordEl.appendChild(s);
    if (ch !== ' ') letters.push(s);
  });
  wordEl.textContent = '';
  letters.forEach((s) => wordEl.appendChild(s));

  tl.to(letters, { opacity: 1, duration: 0.06, stagger: 0.09, ease: 'power2.out' }, 0.3)
    .to(subEl, { opacity: 1, letterSpacing: '0.5em', duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to(counter, {
      v: 100, duration: 2.2, ease: 'power2.inOut',
      onUpdate: () => { counterEl.textContent = String(Math.round(counter.v)).padStart(2, '0') + '%'; },
    }, 0.3)
    // Logo moves upward, panels split vertically, clip exit
    .to(wordEl, { y: -60, duration: 0.7, ease: 'power3.in' }, '+=0.25')
    .to([subEl, counterEl], { opacity: 0, duration: 0.4 }, '<')
    .to('.preloader__panel--left', { xPercent: -101, duration: 0.9, ease: 'power4.inOut' }, '-=0.15')
    .to('.preloader__panel--right', { xPercent: 101, duration: 0.9, ease: 'power4.inOut' }, '<')
    .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.01 }, '-=0.9');
})();

/* =====================================================
   HERO INTRO + HERO SCROLL TRANSFORMATION
   ===================================================== */
const heroWords = gsap.utils.toArray('.hero__word');
gsap.set(heroWords, { yPercent: 120, opacity: 0, filter: 'blur(12px)' });
gsap.set('.hero__meta', { opacity: 0, y: 20 });
gsap.set('.nav', { y: -80, opacity: 0 });
gsap.set('.hero__img', { opacity: 0, scale: 1.1 });

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to('.hero__img', { opacity: 1, scale: 1, duration: 1.6, stagger: 0.15, ease: 'power3.out' }, 0)
    .to(heroWords, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.3, stagger: 0.09 }, 0.1)
    .to('.nav', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.6)
    .to('.hero__meta', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.9);
}

if (!CONFIG.reduceMotion) {
  // Hero scroll transformation: headline scales/moves/fades, images zoom + rotate + drift
  gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=120%', scrub: 1, pin: false },
  })
    .to('.hero__content', { scale: 0.82, yPercent: -18, opacity: 0, ease: 'none' }, 0)
    .to('.hero__img--1', { scale: 1.35, xPercent: -14, rotation: 4, opacity: 0.15, ease: 'none' }, 0)
    .to('.hero__img--2', { scale: 1.3, xPercent: 16, rotation: -5, opacity: 0.1, ease: 'none' }, 0)
    .to('.hero__img--3', { scale: 1.4, yPercent: -20, opacity: 0, ease: 'none' }, 0)
    .to('.hero__meta', { opacity: 0, ease: 'none' }, 0);

  // Subtle mouse-follow: images drift opposite the cursor
  if (FINE) {
    const drift = heroWords.length ? gsap.quickTo('.hero__media', 'x', { duration: 0.9, ease: 'power3.out' }) : null;
    const driftY = gsap.quickTo('.hero__media', 'y', { duration: 0.9, ease: 'power3.out' });
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / innerWidth - 0.5) * -30;
      const ny = (e.clientY / innerHeight - 0.5) * -20;
      drift && drift(nx); driftY(ny);
    });
  }
}

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
(function cursor() {
  if (!FINE) return;
  document.body.classList.add('has-cursor');
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    cursor.classList.remove('cursor--hidden');
  });
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.add('cursor--hidden'));

  document.querySelectorAll('a, button, .service').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--link'));
  });
  document.querySelectorAll('.js-view').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--view'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--view'));
  });
})();

/* =====================================================
   NAVIGATION — scroll state
   ===================================================== */
const nav = document.getElementById('nav');
const onScrollNav = () => nav.classList.toggle('nav--scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScrollNav, { passive: true });
if (lenis) lenis.on('scroll', ({ scroll }) => nav.classList.toggle('nav--scrolled', scroll > 60));

/* ---------- Mobile menu ---------- */
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
let menuOpen = false;

function toggleMenu(open) {
  menuOpen = open;
  burger.classList.toggle('is-open', open);
  if (open) {
    lenis && lenis.stop();
    gsap.timeline()
      .set(menu, { visibility: 'visible' })
      .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
      .to('.menu__link', { y: 0, duration: 0.8, stagger: 0.07, ease: 'power4.out' }, '-=0.25');
  } else {
    gsap.timeline({
      onComplete() { gsap.set(menu, { visibility: 'hidden' }); lenis && lenis.start(); },
    })
      .to('.menu__link', { y: '120%', duration: 0.4, stagger: 0.04, ease: 'power3.in' })
      .to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power4.inOut' }, '-=0.2');
  }
}
burger.addEventListener('click', () => toggleMenu(!menuOpen));
document.getElementById('menuClose').addEventListener('click', () => toggleMenu(false));

/* =====================================================
   PAGE TRANSITIONS — diagonal clip-path wipe
   ===================================================== */
let transitioning = false;
function pageTransition(target) {
  if (transitioning) return;
  transitioning = true;
  const overlay = document.getElementById('transition');
  const panel = overlay.querySelector('.transition__panel');
  const word = overlay.querySelector('.transition__word');

  gsap.timeline({
    onComplete() { transitioning = false; },
  })
    .set(overlay, { visibility: 'visible' })
    .to(panel, { y: '0%', skewY: 0, duration: 0.45, ease: 'power4.in' })
    .to(word, { opacity: 1, duration: 0.2 }, '-=0.1')
    .add(() => { scrollToTarget(target); ScrollTrigger.refresh(); })
    .to(word, { opacity: 0, duration: 0.2 }, '+=0.35')
    .set(panel, { transformOrigin: 'right bottom' })
    .to(panel, { y: '-100%', skewY: -6, duration: 0.6, ease: 'power4.out' })
    .set(overlay, { visibility: 'hidden' })
    .set(panel, { y: '100%', transformOrigin: 'left top' });
}

document.querySelectorAll('.js-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.dataset.target || link.getAttribute('href');
    if (menuOpen) { toggleMenu(false); setTimeout(() => pageTransition(target), 500); }
    else if (CONFIG.reduceMotion || CONFIG.isTouch) scrollToTarget(target);
    else pageTransition(target);
  });
});

document.getElementById('backToTop').addEventListener('click', () => scrollToTarget(0));

/* =====================================================
   SCROLL REVEALS — section titles + project masks
   ===================================================== */
if (!CONFIG.reduceMotion) {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // Project image reveals: mask expands, image scales 1.15 → 1, opacity 0 → 1
  // Direction alternates per project via data-dir
  gsap.utils.toArray('.project').forEach((proj) => {
    const img = proj.querySelector('.project__mask img');
    const fromX = proj.dataset.dir === 'right' ? 100 : -100;
    gsap.timeline({ scrollTrigger: { trigger: proj, start: 'top 80%' } })
      .fromTo(proj.querySelector('.project__mask'),
        { clipPath: `inset(0 ${proj.dataset.dir === 'right' ? 0 : 100}% 0 ${proj.dataset.dir === 'right' ? 100 : 0}%)` },
        { clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'power4.inOut' })
      .fromTo(img, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' }, '<');
    // Project numbers count animation
    gsap.from(proj.querySelector('.project__num'), {
      innerText: 0, duration: 1, snap: { innerText: 1 }, ease: 'power2.out',
      scrollTrigger: { trigger: proj, start: 'top 80%' },
    });
  });

  // Horizontal scroll portfolio (desktop)
  if (CONFIG.isDesktop) {
    const track = document.querySelector('.hscroll__track');
    const getAmount = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -getAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.hscroll',
        start: 'top top',
        end: () => '+=' + getAmount(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // Kinetic typography — vertical shift, rotation, scale, opacity per word
  gsap.utils.toArray('[data-kinetic]').forEach((word, i) => {
    gsap.fromTo(word,
      { yPercent: 45, rotation: i % 2 ? 4 : -4, scale: 0.85, opacity: 0 },
      {
        yPercent: -15, rotation: 0, scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: word, start: 'top 95%', end: 'top 35%', scrub: 1 },
      });
  });

  // Video section: scales 0.8 → 1, opacity 0 → 1 on enter
  gsap.fromTo('.video__wrap', { scale: 0.8, opacity: 0 }, {
    scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out',
    scrollTrigger: { trigger: '.video__wrap', start: 'top 80%' },
  });

  // Contact lines reveal from behind mask
  gsap.from('.contact__line', {
    yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'power4.out',
    scrollTrigger: { trigger: '.contact', start: 'top 65%' },
  });
  gsap.from('.contact__links li', {
    opacity: 0, y: 24, duration: 0.8, stagger: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact__links', start: 'top 90%' },
  });

  // Image parallax via data-speed
  gsap.utils.toArray('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    gsap.to(el, {
      y: () => -(speed * 200), ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  });
} else {
  gsap.set('[data-reveal]', { opacity: 1, y: 0 });
  gsap.set('.project__mask img', { opacity: 1, scale: 1 });
}

/* =====================================================
   SERVICES — hover image follower with inertia
   ===================================================== */
(function servicesHover() {
  if (!FINE) return;
  const hover = document.getElementById('servicesHover');
  const img = hover.querySelector('img');
  gsap.set(hover, { xPercent: -50, yPercent: -50, scale: 0.85 });
  const xTo = gsap.quickTo(hover, 'x', { duration: 0.7, ease: 'power3.out' });
  const yTo = gsap.quickTo(hover, 'y', { duration: 0.7, ease: 'power3.out' });

  document.getElementById('servicesList').addEventListener('mousemove', (e) => {
    xTo(e.clientX); yTo(e.clientY);
  });
  document.querySelectorAll('.service').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      img.src = item.dataset.img;
      gsap.to(hover, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(hover, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: 'power3.in' });
    });
  });
})();

/* =====================================================
   ABOUT — line-by-line text reveal + animated counters
   ===================================================== */
(function about() {
  const text = document.getElementById('aboutText');
  const words = text.textContent.trim().split(' ');
  text.innerHTML = words.map((w) => `<span class="line" style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${w}</span></span>`).join(' ');

  if (!CONFIG.reduceMotion) {
    gsap.from(text.querySelectorAll('.line > span'), {
      yPercent: 110, duration: 0.9, stagger: 0.02, ease: 'power4.out',
      scrollTrigger: { trigger: text, start: 'top 80%' },
    });
  }

  document.querySelectorAll('.stat__num').forEach((num) => {
    const end = parseInt(num.dataset.count, 10);
    if (CONFIG.reduceMotion) { num.textContent = end; return; }
    gsap.fromTo(num, { innerText: 0 }, {
      innerText: end, duration: 2, snap: { innerText: 1 }, ease: 'power2.out',
      scrollTrigger: { trigger: num, start: 'top 88%' },
    });
  });
})();

/* =====================================================
   PROCESS — staggered activation, active step brightens
   ===================================================== */
(function process() {
  const steps = gsap.utils.toArray('[data-step]');
  if (CONFIG.reduceMotion) { steps.forEach((s) => s.classList.add('is-active')); return; }
  steps.forEach((step, i) => {
    gsap.fromTo(step, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: i * 0.08,
      scrollTrigger: {
        trigger: step, start: 'top 75%',
        onEnter: () => step.classList.add('is-active'),
        onLeaveBack: () => step.classList.remove('is-active'),
      },
    });
    ScrollTrigger.create({
      trigger: step, start: 'top 60%', end: 'bottom 40%',
      onToggle: (self) => step.classList.toggle('is-active', self.isActive),
    });
  });
})();

/* =====================================================
   VIDEO — cinematic play interaction
   ===================================================== */
(function videoSection() {
  const wrap = document.getElementById('videoWrap');
  const video = document.getElementById('reelVideo');
  const play = document.getElementById('videoPlay');
  play.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = false;
    video.paused ? video.play() : video.pause();
    play.querySelector('.video__playIcon').textContent = video.paused ? '▶' : '❚❚';
  });
  wrap.addEventListener('click', () => play.click());
})();

/* =====================================================
   MAGNETIC BUTTONS
   ===================================================== */
(function magnetic() {
  if (!FINE) return;
  document.querySelectorAll('.js-magnetic').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  });
})();


/* =====================================================
   REVIEWS — cinematic testimonial slider
   Word-stagger transitions / arrows / auto-advance
   ===================================================== */
(function reviews() {
  const viewport = document.getElementById('reviewsViewport');
  if (!viewport) return;
  const slides = gsap.utils.toArray('.review');
  const indexEl = document.getElementById('reviewIndex');
  const bar = document.getElementById('reviewProgressBar');
  const AUTOPLAY = 7; // seconds per slide (0 to disable)
  let current = 0, busy = false, timer = null;

  const pad = (n) => String(n).padStart(2, '0');

  // Split each quote into word spans for staggered transitions
  slides.forEach((slide) => {
    const p = slide.querySelector('.review__text');
    p.innerHTML = p.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w">${w}</span>`).join(' ');
    gsap.set(slide.querySelectorAll('.w'), { yPercent: 60, opacity: 0 });
    gsap.set(slide.querySelector('.review__author'), { y: 30, opacity: 0 });
  });

  function updateIndex() { indexEl.textContent = `${pad(current + 1)} / ${pad(slides.length)}`; }

  function startProgress() {
    gsap.killTweensOf(bar);
    gsap.fromTo(bar, { width: '0%' }, {
      width: '100%', duration: AUTOPLAY, ease: 'none',
      onComplete: () => go(current + 1, 1),
    });
  }
  function stopProgress() { gsap.killTweensOf(bar); gsap.set(bar, { width: '0%' }); }

  function go(n, dir = 1) {
    if (busy) return;
    const next = (n + slides.length) % slides.length;
    if (next === current) { if (AUTOPLAY) startProgress(); return; }
    busy = true;
    stopProgress();

    const out = slides[current];
    const inn = slides[next];

    gsap.timeline({
      onComplete() {
        busy = false;
        if (AUTOPLAY) startProgress();
      },
    })
      .to(out.querySelectorAll('.w'), {
        yPercent: -60, opacity: 0, duration: 0.5, stagger: 0.008,
        ease: 'power3.in',
      })
      .to(out.querySelector('.review__author'), { y: -20, opacity: 0, duration: 0.4, ease: 'power3.in' }, '<')
      .add(() => {
        out.classList.remove('is-active');
        gsap.set(out, { visibility: 'hidden' });
        inn.classList.add('is-active');
        gsap.set(inn, { visibility: 'visible', position: 'relative' });
        current = next;
        updateIndex();
      })
      .fromTo(inn.querySelectorAll('.w'),
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.015, ease: 'power4.out' })
      .fromTo(inn.querySelector('.review__author'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4');
  }

  // Init first slide
  const first = slides[0];
  first.classList.add('is-active');
  gsap.set(first, { visibility: 'visible' });
  updateIndex();

  if (CONFIG.reduceMotion) {
    slides.forEach((s) => {
      gsap.set(s.querySelectorAll('.w'), { yPercent: 0, opacity: 1 });
      gsap.set(s.querySelector('.review__author'), { y: 0, opacity: 1 });
    });
    document.getElementById('reviewPrev').addEventListener('click', () => go(current - 1, -1));
    document.getElementById('reviewNext').addEventListener('click', () => go(current + 1, 1));
    return;
  }

  document.getElementById('reviewPrev').addEventListener('click', () => go(current - 1, -1));
  document.getElementById('reviewNext').addEventListener('click', () => go(current + 1, 1));

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const rect = viewport.getBoundingClientRect();
    const inView = rect.top < innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowRight') go(current + 1, 1);
    if (e.key === 'ArrowLeft') go(current - 1, -1);
  });

  // Pause autoplay while hovering the stage
  const stage = document.querySelector('.reviews__stage');
  stage.addEventListener('mouseenter', stopProgress);
  stage.addEventListener('mouseleave', () => { if (!busy && AUTOPLAY) startProgress(); });

  // Entrance: first quote reveals when scrolled into view
  ScrollTrigger.create({
    trigger: viewport, start: 'top 78%', once: true,
    onEnter() {
      gsap.to(first.querySelectorAll('.w'), {
        yPercent: 0, opacity: 1, duration: 1, stagger: 0.02, ease: 'power4.out',
      });
      gsap.to(first.querySelector('.review__author'), {
        y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: 'power3.out',
      });
      if (AUTOPLAY) startProgress();
    },
  });
})();

/* ---------- Refresh triggers after images load ---------- */
window.addEventListener('load', () => ScrollTrigger.refresh());
