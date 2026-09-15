/* =====================================================
   SHERO VISION — style.css
   Dark / editorial / futuristic creative agency aesthetic
   ===================================================== */

:root {
  --bg: #080808;
  --text: #f2f2ee;
  --muted: rgba(242, 242, 238, 0.55);
  --accent: #2f6bff;
  --accent-bright: #4d82ff;
  --line: rgba(242, 242, 238, 0.12);
  --font: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { background: var(--bg); }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

img, video { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
button { font-family: inherit; background: none; border: none; color: inherit; cursor: pointer; }

::selection { background: var(--accent); color: var(--bg); }

/* ---------- Section titles ---------- */
.section-title {
  font-size: clamp(2.4rem, 7vw, 7rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  padding: 0 5vw;
  margin-bottom: 8vh;
}
.section-title em { font-style: normal; color: var(--accent); }

/* =====================================================
   PRELOADER
   ===================================================== */
.preloader {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  pointer-events: all;
}
.preloader__panel {
  position: absolute; top: 0; bottom: 0; width: 50.5%;
  background: #050505;
}
.preloader__panel--left { left: 0; }
.preloader__panel--right { right: 0; }
.preloader__inner { position: relative; z-index: 2; text-align: center; }
.preloader__logo {
  font-size: clamp(2.2rem, 7vw, 6rem);
  font-weight: 700; letter-spacing: -0.02em; line-height: 1;
  min-height: 1.1em;
}
.preloader__word { display: inline-block; }
.preloader__sub {
  margin-top: 1.4rem; font-size: 0.8rem; letter-spacing: 0.5em;
  color: var(--muted); opacity: 0;
}
.preloader__counter {
  position: fixed; bottom: 4vh; right: 5vw;
  font-size: clamp(2rem, 5vw, 4rem); font-weight: 300; color: var(--muted);
  font-variant-numeric: tabular-nums;
}

/* =====================================================
   PAGE TRANSITION
   ===================================================== */
.transition {
  position: fixed; inset: 0; z-index: 900; pointer-events: none;
  visibility: hidden;
}
.transition__panel {
  position: absolute; inset: 0;
  background: #050505;
  transform: translateY(100%) skewY(-6deg);
  transform-origin: left top;
}
.transition__word {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-size: clamp(2rem, 6vw, 5rem); font-weight: 700; letter-spacing: -0.02em;
  opacity: 0;
}

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
.cursor { position: fixed; inset: 0; z-index: 950; pointer-events: none; }
.cursor__dot {
  position: absolute; top: 0; left: 0; width: 10px; height: 10px;
  background: #fff; border-radius: 50%;
}
.cursor__ring {
  position: absolute; top: 0; left: 0; width: 44px; height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: width 0.35s var(--ease-out), height 0.35s var(--ease-out),
              background-color 0.35s var(--ease-out), border-color 0.35s var(--ease-out);
}
.cursor__label {
  font-size: 0.7rem; letter-spacing: 0.2em; font-weight: 600;
  opacity: 0; transition: opacity 0.3s;
  color: var(--bg);
}
.cursor--link .cursor__ring { width: 64px; height: 64px; }
.cursor--view .cursor__ring {
  width: 110px; height: 110px; background: var(--text);
  border-color: var(--text);
}
.cursor--view .cursor__label { opacity: 1; }
.cursor--hidden .cursor__dot, .cursor--hidden .cursor__ring { opacity: 0; }
@media (hover: none), (max-width: 1023px) { .cursor { display: none; } }

body.has-cursor, body.has-cursor a, body.has-cursor button { cursor: none; }

/* =====================================================
   NAVIGATION
   ===================================================== */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 800;
  display: flex; align-items: center; justify-content: space-between;
  padding: 2rem 5vw;
  transition: padding 0.5s var(--ease-out), background-color 0.5s, backdrop-filter 0.5s;
}
.nav--scrolled {
  padding: 1rem 5vw;
  background: rgba(8, 8, 8, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}
.nav__logo {
  font-weight: 700; letter-spacing: 0.04em; font-size: 1.05rem;
  transition: transform 0.5s var(--ease-out);
  display: inline-block;
}
.nav--scrolled .nav__logo { transform: scale(0.85); transform-origin: left center; }
.nav__links { display: flex; gap: 3rem; }
.nav__link {
  font-size: 0.78rem; letter-spacing: 0.25em; overflow: hidden; display: inline-block;
}
.nav__link span { display: inline-block; transition: color 0.3s; }
.nav__link::after {
  content: ''; display: block; height: 1px; background: var(--accent);
  transform: scaleX(0); transform-origin: left; transition: transform 0.45s var(--ease-out);
}
.nav__link:hover span { color: var(--accent-bright); }
.nav__link:hover::after { transform: scaleX(1); }

.nav__burger { display: none; flex-direction: column; gap: 7px; padding: 8px; z-index: 860; }
.nav__burger span { display: block; width: 30px; height: 2px; background: var(--text); transition: transform 0.4s var(--ease-out); }
.nav__burger.is-open span:first-child { transform: translateY(4.5px) rotate(45deg); }
.nav__burger.is-open span:last-child { transform: translateY(-4.5px) rotate(-45deg); }

@media (max-width: 1023px) {
  .nav__links { display: none; }
  .nav__burger { display: flex; }
}

/* ---------- Mobile menu ---------- */
.menu {
  position: fixed; inset: 0; z-index: 850; background: #050505;
  display: flex; flex-direction: column; justify-content: center; padding: 0 8vw;
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
}
.menu__close {
  position: absolute; top: 2rem; right: 5vw; font-size: 0.75rem;
  letter-spacing: 0.3em; color: var(--muted);
}
.menu__links { display: flex; flex-direction: column; gap: 1.2vh; }
.menu__link {
  font-size: clamp(2.6rem, 11vw, 5rem); font-weight: 700; line-height: 1.1;
  letter-spacing: -0.02em; overflow: hidden; display: inline-block;
  transform: translateY(120%);
}
.menu__foot {
  position: absolute; bottom: 3rem; left: 8vw; right: 8vw;
  font-size: 0.7rem; letter-spacing: 0.3em; color: var(--muted);
}

/* =====================================================
   HERO
   ===================================================== */
.hero {
  position: relative; min-height: 100vh; min-height: 100svh;
  display: flex; flex-direction: column; justify-content: center;
  overflow: hidden;
}
.hero__media { position: absolute; inset: 0; z-index: 1; }
.hero__img { position: absolute; overflow: hidden; will-change: transform; }
.hero__img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.75; }
.hero__img--1 { top: 8%; right: 6%; width: 26vw; min-width: 220px; aspect-ratio: 7/9; }
.hero__img--2 { bottom: 6%; left: 4%; width: 20vw; min-width: 170px; aspect-ratio: 6/8; }
.hero__img--3 { top: 38%; right: 30%; width: 16vw; min-width: 140px; aspect-ratio: 6/8; }
@media (max-width: 1023px) {
  .hero__img--1 { width: 44vw; top: 12%; }
  .hero__img--2 { width: 36vw; }
  .hero__img--3 { display: none; }
}

.hero__content { position: relative; z-index: 2; padding: 0 5vw; will-change: transform; }
.hero__line {
  font-size: clamp(2.6rem, 9vw, 9.5rem);
  font-weight: 700; line-height: 1.02; letter-spacing: -0.03em;
  text-transform: uppercase;
  overflow: hidden;
}
.hero__line--indent { padding-left: 9vw; }
.hero__word { display: inline-block; will-change: transform, opacity, filter; }
.hero__meta {
  position: absolute; z-index: 2; bottom: 4vh;
  font-size: 0.7rem; letter-spacing: 0.35em; color: var(--muted);
}
.hero__meta--left { left: 5vw; }
.hero__meta--right { right: 5vw; display: flex; align-items: center; gap: 0.6rem; }
.hero__arrow { display: inline-block; animation: bob 2s var(--ease-out) infinite; }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

/* =====================================================
   SELECTED WORK
   ===================================================== */
.work { padding: 16vh 0 8vh; }
.project {
  position: relative; padding: 0 5vw; margin-bottom: 16vh;
  display: grid; grid-template-columns: 1fr; gap: 1.4rem;
}
.project--large { width: min(88vw, 1500px); }
.project--small { width: min(56vw, 700px); margin-left: auto; margin-right: 5vw; margin-top: -8vh; }
.project--offset { margin-left: 5vw; margin-right: auto; margin-top: 4vh; }
.project--offset2 { margin-left: auto; margin-right: 8vw; }
@media (max-width: 1023px) {
  .project, .project--large, .project--small,
  .project--offset, .project--offset2 { width: 90vw; margin: 0 auto 10vh; }
}

.project__media { position: relative; overflow: hidden; display: block; }
.project__mask { overflow: hidden; }
.project__mask img {
  width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.15); opacity: 0; will-change: transform, opacity;
  transition: transform 1s var(--ease-out);
}
.project__media:hover .project__mask img { transform: scale(1.08) translate(1.5%, -1%); }
.project__overlay {
  position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,8,0.65), transparent 55%);
  opacity: 0; transition: opacity 0.6s var(--ease-out);
}
.project__media:hover .project__overlay { opacity: 1; }

.project__info {
  display: flex; align-items: baseline; gap: 1.6rem; border-top: 1px solid var(--line);
  padding-top: 1.1rem;
}
.project__num { font-size: 0.8rem; color: var(--accent); font-weight: 600; letter-spacing: 0.15em; }
.project__meta { flex: 1; }
.project__title {
  font-size: clamp(1.6rem, 3.4vw, 3rem); font-weight: 700; letter-spacing: -0.02em;
  transition: transform 0.5s var(--ease-out);
}
.project__media:hover ~ .project__info .project__title { transform: translateX(10px); }
.project__cat {
  font-size: 0.72rem; letter-spacing: 0.3em; color: var(--muted);
  opacity: 0; transform: translateY(6px);
  transition: opacity 0.5s var(--ease-out) 0.05s, transform 0.5s var(--ease-out) 0.05s;
}
.project__media:hover ~ .project__info .project__cat { opacity: 1; transform: translateY(0); }
.project__year { font-size: 0.78rem; color: var(--muted); }

/* =====================================================
   HORIZONTAL SCROLL
   ===================================================== */
.hscroll { position: relative; }
.hscroll__pin {
  height: 100vh; height: 100svh; overflow: hidden;
  display: flex; flex-direction: column; justify-content: center;
}
.hscroll__head {
  display: flex; align-items: baseline; justify-content: space-between;
  padding: 0 5vw; margin-bottom: 4vh;
}
.hscroll__head .section-title { padding: 0; margin: 0; }
.hscroll__hint { font-size: 0.72rem; letter-spacing: 0.35em; color: var(--muted); }
.hscroll__track {
  display: flex; gap: 5vw; padding: 0 5vw;
  width: max-content; will-change: transform;
}
.hpanel { width: 72vw; flex-shrink: 0; }
.hpanel__num { font-size: 0.72rem; letter-spacing: 0.3em; color: var(--accent); display: block; margin-bottom: 0.8rem; }
.hpanel__media { overflow: hidden; }
.hpanel__media img {
  width: 100%; aspect-ratio: 14/8.5; object-fit: cover;
  transition: transform 1s var(--ease-out);
}
.hpanel:hover .hpanel__media img { transform: scale(1.06); }
.hpanel__meta { display: flex; align-items: baseline; justify-content: space-between; margin-top: 1rem; border-top: 1px solid var(--line); padding-top: 0.9rem; }
.hpanel__meta h3 { font-size: clamp(1.4rem, 2.6vw, 2.4rem); letter-spacing: -0.02em; }
.hpanel__meta p { font-size: 0.72rem; letter-spacing: 0.3em; color: var(--muted); }

@media (max-width: 1023px) {
  .hscroll__pin { height: auto; padding: 10vh 0; }
  .hscroll__track {
    flex-direction: column; width: 100%; gap: 8vh;
  }
  .hpanel { width: 90vw; margin: 0 auto; }
}

/* =====================================================
   SERVICES
   ===================================================== */
.services { padding: 16vh 0; position: relative; }
.services__list { border-top: 1px solid var(--line); }
.service {
  display: flex; align-items: baseline; gap: 2.5vw;
  padding: 2.2vh 5vw; border-bottom: 1px solid var(--line);
  transition: opacity 0.4s var(--ease-out);
  cursor: default;
}
.service__num { font-size: 0.8rem; color: var(--accent); font-weight: 600; }
.service__name {
  font-size: clamp(1.8rem, 5.2vw, 4.6rem); font-weight: 700; letter-spacing: -0.03em;
  line-height: 1.05; text-transform: uppercase;
  transition: transform 0.5s var(--ease-out), color 0.4s;
}
.services__list:hover .service { opacity: 0.25; }
.services__list .service:hover { opacity: 1; }
.services__list .service:hover .service__name { transform: translateX(2vw) scale(1.03); color: var(--accent-bright); }

.services__hover {
  position: fixed; top: 0; left: 0; z-index: 5; pointer-events: none;
  width: min(30vw, 460px); aspect-ratio: 3/2; overflow: hidden;
  opacity: 0; visibility: hidden;
  will-change: transform, opacity;
}
.services__hover img { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 1023px) { .services__hover { display: none; } }

/* =====================================================
   KINETIC TYPOGRAPHY
   ===================================================== */
.kinetic {
  padding: 22vh 5vw; overflow: hidden;
  display: flex; flex-direction: column;
}
.kinetic__word {
  font-size: clamp(3.4rem, 13vw, 13rem); font-weight: 700;
  line-height: 0.95; letter-spacing: -0.04em; text-transform: uppercase;
  will-change: transform, opacity;
}
.kinetic__word--right { align-self: flex-end; color: var(--accent); }
.kinetic__word:last-child { align-self: center; }

/* =====================================================
   ABOUT
   ===================================================== */
.about {
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 6vw;
  padding: 16vh 5vw; border-top: 1px solid var(--line);
}
@media (max-width: 1023px) { .about { grid-template-columns: 1fr; } }
.about__title { font-size: clamp(2.4rem, 6vw, 5.6rem); line-height: 1; letter-spacing: -0.03em; font-weight: 700; }
.about__title em { font-style: normal; color: var(--accent); }
.about__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-top: 8vh; }
.stat__num {
  display: block; font-size: clamp(2.4rem, 5vw, 4.6rem); font-weight: 700; line-height: 1;
  font-variant-numeric: tabular-nums;
}
.stat__label { font-size: 0.72rem; letter-spacing: 0.3em; color: var(--muted); display: block; margin-top: 0.5rem; }
.about__right { display: flex; align-items: center; }
.about__text { font-size: clamp(1.15rem, 2vw, 1.7rem); line-height: 1.55; font-weight: 300; color: var(--muted); }
.about__text .line { display: block; overflow: hidden; }
.about__text .line > span { display: inline-block; will-change: transform; }

/* =====================================================
   VIDEO
   ===================================================== */
.video { padding: 8vh 5vw 16vh; }
.video__wrap {
  position: relative; overflow: hidden; cursor: pointer;
  will-change: transform, opacity;
}
.video__wrap video { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.video__overlay {
  position: absolute; inset: 0; background: rgba(5, 5, 5, 0.45);
  transition: opacity 0.5s;
}
.video__wrap:hover .video__overlay { opacity: 0.25; }
.video__wrap:hover { transform: scale(1.01); }
.video__play {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 110px; height: 110px; border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.7);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.5s var(--ease-out), background-color 0.4s, color 0.4s;
  color: var(--text);
}
.video__playIcon { font-size: 1.4rem; margin-left: 4px; }
.video__wrap:hover .video__play { transform: translate(-50%, -50%) scale(1.18); background: var(--text); color: var(--bg); }

/* =====================================================
   PROCESS
   ===================================================== */
.process { padding: 8vh 5vw 16vh; }
.process__list { border-top: 1px solid var(--line); }
.pstep {
  display: grid; grid-template-columns: 8rem 1fr 1.2fr; gap: 3vw; align-items: baseline;
  padding: 4vh 0; border-bottom: 1px solid var(--line);
  opacity: 0.18; transition: opacity 0.6s var(--ease-out);
}
.pstep.is-active { opacity: 1; }
.pstep__num { font-size: 0.85rem; color: var(--accent); font-weight: 600; letter-spacing: 0.15em; }
.pstep__name { font-size: clamp(1.8rem, 4.4vw, 4rem); font-weight: 700; letter-spacing: -0.02em; }
.pstep__desc { font-size: 0.95rem; line-height: 1.6; color: var(--muted); max-width: 34ch; }
@media (max-width: 1023px) {
  .pstep { grid-template-columns: 4rem 1fr; }
  .pstep__desc { grid-column: 2; }
}

/* =====================================================
   MARQUEE
   ===================================================== */
.marquee { overflow: hidden; padding: 8vh 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.marquee__track {
  display: flex; gap: 6vw; width: max-content; will-change: transform;
  animation: marquee 22s linear infinite;
}
.marquee:hover .marquee__track { animation-play-state: paused; }
.marquee__track span {
  font-size: clamp(1.6rem, 4vw, 3.4rem); font-weight: 700; letter-spacing: -0.02em;
  color: transparent; -webkit-text-stroke: 1px rgba(242, 242, 238, 0.4);
  white-space: nowrap; transition: color 0.4s;
}
.marquee__track span:hover { color: var(--accent); -webkit-text-stroke-color: var(--accent); }
@keyframes marquee { to { transform: translateX(-50%); } }

/* =====================================================
   CONTACT
   ===================================================== */
.contact {
  min-height: 100vh; min-height: 100svh;
  display: flex; flex-direction: column; justify-content: center;
  padding: 16vh 5vw 8vh; text-align: center;
}
.contact__title { line-height: 0.98; letter-spacing: -0.03em; text-transform: uppercase; font-weight: 700; }
.contact__mask { display: block; overflow: hidden; }
.contact__line { display: block; font-size: clamp(2.6rem, 10vw, 10rem); will-change: transform; }
.contact__line--accent { color: var(--accent); }
.contact__cta { margin: 7vh 0 9vh; }
.contact__links {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 2.2rem 3rem;
}
.contact__links a {
  font-size: 0.75rem; letter-spacing: 0.3em; color: var(--muted);
  position: relative; transition: color 0.3s;
}
.contact__links a::after {
  content: ''; position: absolute; left: 0; bottom: -6px; width: 100%; height: 1px;
  background: var(--accent); transform: scaleX(0); transform-origin: left;
  transition: transform 0.45s var(--ease-out);
}
.contact__links a:hover { color: var(--text); }
.contact__links a:hover::after { transform: scaleX(1); }

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex; align-items: center; gap: 1rem;
  padding: 1.3rem 3rem; border: 1px solid var(--text); border-radius: 999px;
  font-size: 0.85rem; letter-spacing: 0.25em; font-weight: 600;
  transition: background-color 0.4s, color 0.4s, border-color 0.4s;
  will-change: transform;
}
.btn:hover { background: var(--text); color: var(--bg); }
.btn__arrow { display: inline-block; transition: transform 0.4s var(--ease-out); }
.btn:hover .btn__arrow { transform: translateX(8px); }

/* =====================================================
   FOOTER
   ===================================================== */
.footer { padding: 6vh 5vw 4vh; border-top: 1px solid var(--line); }
.footer__brand { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; }
.footer__logo { font-weight: 700; letter-spacing: 0.04em; font-size: 1.2rem; }
.footer__tag { font-size: 0.7rem; letter-spacing: 0.35em; color: var(--muted); }
.footer__links { display: flex; gap: 2.5rem; margin: 5vh 0; flex-wrap: wrap; }
.footer__links a { font-size: 0.75rem; letter-spacing: 0.25em; color: var(--muted); transition: color 0.3s; }
.footer__links a:hover { color: var(--accent-bright); }
.footer__bottom {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
  font-size: 0.72rem; letter-spacing: 0.2em; color: var(--muted);
}
.footer__top { letter-spacing: 0.2em; font-size: 0.72rem; color: var(--muted); transition: color 0.3s; }
.footer__top:hover { color: var(--text); }

/* =====================================================
   MISC / MOTION PREFS
   ===================================================== */
[data-reveal] { opacity: 0; transform: translateY(60px); will-change: transform, opacity; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  [data-reveal], .project__mask img { opacity: 1 !important; transform: none !important; }
}
