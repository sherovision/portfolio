/* ==========================================================================
   SHERO VISION — main script
   Sections: 0 setup · 1 preloader · 2 smooth scroll · 3 cursor · 4 nav
   5 hero · 6 selected work · 7 horizontal work · 8 services · 9 kinetic
   10 about · 11 video · 12 process · 13 marquee · 14 magnetic · 15 contact
   16 page transitions · 17 back to top
   ========================================================================== */
(() => {
  "use strict";

  /* ---------- 0. SETUP ---------------------------------------------------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const isMobile = window.innerWidth < 768;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });

  if (isTouch) document.body.classList.add("no-custom-cursor");

  /* ---------- 1. PRELOADER -------------------------------------------------
     Builds "S -> SH -> ... -> SHERO VISION", counts 00->100, then splits
     the screen and reveals the hero underneath.                            */
  function runPreloader() {
    return new Promise((resolve) => {
      const preloader = document.getElementById("preloader");
      const wordEl = document.getElementById("preloaderWord");
      const subEl = document.getElementById("preloaderSub");
      const countEl = document.getElementById("preloaderCount");
      const lineEl = preloader.querySelector(".preloader-line");
      const full = "SHERO VISION";

      document.body.style.overflow = "hidden";

      if (reduceMotion) {
        preloader.style.display = "none";
        document.body.style.overflow = "";
        resolve();
        return;
      }

      const panelL = document.getElementById("preloaderPanelL");
      const panelR = document.getElementById("preloaderPanelR");
      const inner = document.getElementById("preloaderInner");

      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          preloader.style.display = "none";
          document.body.style.overflow = "";
          resolve();
        },
      });

      // letter-by-letter buildup: S, SH, SHE, SHER, SHERO, SHERO VISION
      full.split("").forEach((_, i) => {
        tl.call(() => { wordEl.textContent = full.slice(0, i + 1); }, null, i * 0.055);
      });

      tl.to(subEl, { opacity: 1, duration: 0.5 }, "-=0.2")
        .to(counter, {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => { countEl.textContent = String(Math.floor(counter.v)).padStart(2, "0") + "%"; },
        }, "<")
        .to(lineEl, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, "<")
        // logo moves upward, screen splits vertically, hero revealed beneath
        .to(inner, { y: -40, opacity: 0, duration: 0.5, ease: "power3.inOut" }, ">-0.1")
        .to(countEl, { opacity: 0, duration: 0.3 }, "<")
        .to(panelL, { xPercent: -100, duration: 0.9, ease: "power4.inOut" }, ">-0.1")
        .to(panelR, { xPercent: 100, duration: 0.9, ease: "power4.inOut" }, "<");
    });
  }

  /* ---------- 2. SMOOTH SCROLL (Lenis) ------------------------------------ */
  let lenis;
  function initSmoothScroll() {
    if (reduceMotion || typeof Lenis === "undefined") return;
    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: isMobile ? 1 : 1.4,
      lerp: isMobile ? 0.14 : 0.1,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function scrollTo(target, opts = {}) {
    if (lenis) lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- 3. CUSTOM CURSOR -------------------------------------------- */
  function initCursor() {
    if (isTouch) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const cursorRoot = document.getElementById("cursor");
    const label = document.getElementById("cursorLabel");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };

    window.addEventListener("mousemove", (e) => {
      pos.x = e.clientX; pos.y = e.clientY;
      gsap.set(dot, { x: pos.x, y: pos.y });
    });

    gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    });

    document.querySelectorAll("[data-tilt], .work-item").forEach((el) => {
      el.addEventListener("mouseenter", () => { cursorRoot.classList.add("is-view"); label.textContent = "VIEW"; });
      el.addEventListener("mouseleave", () => cursorRoot.classList.remove("is-view"));
    });

    document.querySelectorAll(".video-frame").forEach((el) => {
      el.addEventListener("mouseenter", () => { cursorRoot.classList.add("is-view"); label.textContent = "PLAY"; });
      el.addEventListener("mouseleave", () => cursorRoot.classList.remove("is-view"));
    });

    document.querySelectorAll("a, button, .service-row").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorRoot.classList.add("is-link"));
      el.addEventListener("mouseleave", () => cursorRoot.classList.remove("is-link"));
    });

    document.addEventListener("mouseleave", () => cursorRoot.classList.add("is-hidden"));
    document.addEventListener("mouseenter", () => cursorRoot.classList.remove("is-hidden"));
  }

  /* ---------- 4. NAVIGATION ------------------------------------------------ */
  function initNav() {
    const nav = document.getElementById("siteNav");

    ScrollTrigger.create({
      start: 60,
      end: 99999,
      onUpdate: (self) => nav.classList.toggle("is-scrolled", self.scroll() > 60),
    });

    // intro slide-down, runs right after preloader
    gsap.to([".nav-logo", ".nav-links a", ".nav-burger"], {
      y: "0%",
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.06,
      delay: 0.1,
    });

    // mobile menu
    const burger = document.getElementById("navBurger");
    const menu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("mobileMenuClose");

    function openMenu() {
      menu.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    burger?.addEventListener("click", () => {
      menu.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    closeBtn?.addEventListener("click", closeMenu);
    menu.querySelectorAll("[data-mobile-link]").forEach((l) => l.addEventListener("click", closeMenu));
  }

  /* ---------- 5. HERO ------------------------------------------------------ */
  function initHero() {
    // kinetic line intro
    const lines = gsap.utils.toArray("[data-line]");
    gsap.set(lines, { yPercent: 110, opacity: 0, filter: "blur(10px)" });
    gsap.to(lines, {
      yPercent: 0, opacity: 1, filter: "blur(0px)",
      duration: 1.1, stagger: 0.12, ease: "expo.out", delay: 0.15,
    });
    gsap.from(["#heroEyebrow", "#heroScroll"], {
      opacity: 0, y: 16, duration: 0.9, stagger: 0.1, delay: 0.5, ease: "power3.out",
    });
    gsap.from(".hero-img", {
      opacity: 0, scale: 1.1, duration: 1.3, stagger: 0.1, delay: 0.3, ease: "expo.out",
    });

    // mouse-follow parallax on floating images
    if (!isTouch && !reduceMotion) {
      const imgs = gsap.utils.toArray(".hero-img");
      window.addEventListener("mousemove", (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        imgs.forEach((img, i) => {
          const strength = 18 + i * 10;
          gsap.to(img, { x: -nx * strength, y: -ny * strength, duration: 1, ease: "power2.out" });
        });
      });
    }

    // scroll transform: zoom / shift / rotate / fade, then hand off to next section
    if (!reduceMotion) {
      gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
      })
        .to(".hero-img", { scale: 1.35, xPercent: 12, rotate: 6, opacity: 0, stagger: 0.05 }, 0)
        .to(".hero-title", { yPercent: -30, scale: 0.88, opacity: 0 }, 0)
        .to(".hero-eyebrow, .hero-scroll", { opacity: 0 }, 0);
    }
  }

  /* ---------- 5b. SCROLL PARALLAX (data-speed) ----------------------------
     Any element carrying data-speed="0.2 / 0.4 / 0.6" drifts vertically at
     that fraction of scroll distance — kept subtle, never disabled outright
     on mobile, just toned down via a lower multiplier.                     */
  function initParallax() {
    if (reduceMotion) return;
    const multiplier = isMobile ? 0.4 : 1;
    gsap.utils.toArray("[data-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0.3;
      gsap.to(el, {
        yPercent: speed * 22 * multiplier,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });
  }

  /* ---------- 6. SELECTED WORK -------------------------------------------- */
  function initSelectedWork() {
    document.querySelectorAll(".work-item").forEach((item) => {
      const dir = item.dataset.reveal || "bottom";
      const media = item.querySelector(".work-media");
      const mask = item.querySelector(".work-mask");
      const meta = item.querySelectorAll(".work-meta > *");

      const originMap = { left: "left top", right: "right top", top: "center top", bottom: "center bottom" };
      gsap.set(mask, { transformOrigin: originMap[dir] || "center bottom" });
      const scaleProp = dir === "left" || dir === "right" ? "scaleX" : "scaleY";

      if (reduceMotion) { gsap.set(mask, { [scaleProp]: 0 }); return; }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: "top 85%", once: true },
      });
      tl.fromTo(mask, { [scaleProp]: 1 }, { [scaleProp]: 0, duration: 1.1, ease: "expo.inOut" })
        .fromTo(media, { scale: 1.15 }, { scale: 1, duration: 1.3, ease: "expo.out" }, 0)
        .fromTo(meta, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 }, 0.3);

      // subtle hover scale + shift (desktop)
      if (!isTouch) {
        const img = media;
        item.addEventListener("mouseenter", () => gsap.to(img, { scale: 1.08, duration: 0.7, ease: "power3.out" }));
        item.addEventListener("mouseleave", () => gsap.to(img, { scale: 1, duration: 0.7, ease: "power3.out" }));
      }
    });
  }

  /* ---------- 7. HORIZONTAL "THE WORK" ------------------------------------ */
  function initHorizontalWork() {
    const track = document.getElementById("theWorkTrack");
    const pin = document.querySelector(".the-work-pin");
    if (!track || reduceMotion || isMobile) return;

    function build() {
      const distance = track.scrollWidth - window.innerWidth + 64;
      return gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: ".the-work",
          start: "top top",
          end: () => "+=" + distance,
          scrub: 0.8,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }
    build();
  }

  /* ---------- 8. SERVICES -------------------------------------------------- */
  function initServices() {
    const list = document.getElementById("servicesList");
    const preview = document.getElementById("servicePreview");
    const rows = gsap.utils.toArray("[data-service]");

    if (isTouch) return; // touch devices skip the hover preview entirely

    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.9 });

    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        list.classList.add("is-hovering");
        preview.style.setProperty("--ph", row.style.getPropertyValue("--ph"));
        preview.style.setProperty("--ph2", row.style.getPropertyValue("--ph2"));
        gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
        gsap.to(row.querySelector(".service-name"), { x: 14, duration: 0.4 });
      });
      row.addEventListener("mouseleave", () => {
        gsap.to(row.querySelector(".service-name"), { x: 0, duration: 0.4 });
      });
    });

    list.addEventListener("mouseleave", () => {
      list.classList.remove("is-hovering");
      gsap.to(preview, { opacity: 0, scale: 0.9, duration: 0.3 });
    });

    let px = innerWidth / 2, py = innerHeight / 2;
    const previewX = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const previewY = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
    window.addEventListener("mousemove", (e) => {
      px = e.clientX; py = e.clientY;
      previewX(px); previewY(py);
    });
  }

  /* ---------- 9. KINETIC TYPOGRAPHY ---------------------------------------- */
  function initKinetic() {
    const words = gsap.utils.toArray("[data-kword]");
    if (reduceMotion) return;
    words.forEach((word, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      gsap.fromTo(word,
        { yPercent: 60, opacity: 0, rotate: dir * 6, x: dir * 30 },
        {
          yPercent: 0, opacity: 1, rotate: 0, x: 0,
          duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".kinetic", start: "top 75%", end: "top 30%", scrub: 0.6 },
        }
      );
    });
  }

  /* ---------- 10. ABOUT ----------------------------------------------------- */
  function initAbout() {
    gsap.utils.toArray("[data-about-line]").forEach((line, i) => {
      gsap.fromTo(line, { yPercent: 100, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".about", start: "top 70%" },
        delay: i * 0.08,
      });
    });

    // progressive line reveal tied to scroll
    gsap.utils.toArray("[data-about-reveal]").forEach((span, i) => {
      gsap.to(span, {
        opacity: 1,
        duration: 0.4,
        scrollTrigger: {
          trigger: span,
          start: "top 80%",
          end: "top 55%",
          scrub: 0.5,
        },
      });
    });

    // counters
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const end = parseInt(el.dataset.count, 10);
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: end, duration: 1.6, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.floor(obj.v); },
          });
        },
      });
    });
  }

  /* ---------- 11. VIDEO ------------------------------------------------------ */
  function initVideo() {
    gsap.to(".video-frame", {
      scale: 1, opacity: 1, duration: 1,
      scrollTrigger: { trigger: ".video-frame", start: "top 80%" },
    });

    const frame = document.getElementById("videoFrame");
    const play = document.getElementById("videoPlay");
    if (!isTouch) {
      frame?.addEventListener("mouseenter", () => gsap.to(frame, { scale: 1.02, duration: 0.6, ease: "power3.out" }));
      frame?.addEventListener("mouseleave", () => gsap.to(frame, { scale: 1, duration: 0.6, ease: "power3.out" }));
    }
    play?.addEventListener("click", () => {
      // placeholder: hook this up to a real <video> element / modal player
      play.classList.toggle("is-playing");
    });
  }

  /* ---------- 12. PROCESS ---------------------------------------------------- */
  function initProcess() {
    const steps = gsap.utils.toArray(".process-step");
    steps.forEach((step, i) => {
      gsap.fromTo(step, { opacity: 0, y: 24 }, {
        opacity: 0.3, y: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 90%" },
      });
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: (self) => step.classList.toggle("is-active", self.isActive),
      });
    });
  }

  /* ---------- 13. MARQUEE ----------------------------------------------------- */
  function initMarquee() {
    const track = document.getElementById("marqueeTrack");
    const wrap = document.getElementById("marquee");
    if (reduceMotion) return;

    const tween = gsap.to(track, {
      xPercent: -50, duration: 22, ease: "none", repeat: -1,
    });

    wrap.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 }));
    wrap.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.4 }));
  }

  /* ---------- 14. MAGNETIC BUTTONS -------------------------------------------- */
  function initMagnetic() {
    if (isTouch || reduceMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        xTo(relX * 0.35);
        yTo(relY * 0.5);
      });
      btn.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
  }

  /* ---------- 15. CONTACT MASK REVEAL ------------------------------------------ */
  function initContact() {
    gsap.utils.toArray("#contact .reveal-mask > span").forEach((span, i) => {
      gsap.to(span, {
        y: "0%", duration: 1, ease: "expo.out", delay: i * 0.1,
        scrollTrigger: { trigger: "#contact", start: "top 70%" },
      });
    });
  }

  /* generic reveal-masks used elsewhere (section titles) */
  function initGenericMasks() {
    gsap.utils.toArray(".reveal-mask:not(#contact .reveal-mask) > span").forEach((span) => {
      gsap.to(span, {
        y: "0%", duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: span, start: "top 85%" },
      });
    });
  }

  /* ---------- 16. PAGE / SECTION TRANSITIONS ----------------------------------- */
  function initPageTransitions() {
    const overlay = document.getElementById("pageTransition");
    const label = overlay.querySelector("span");

    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        if (reduceMotion) { scrollTo(target); return; }

        document.getElementById("mobileMenu")?.classList.remove("is-open");
        document.body.style.overflow = "";

        gsap.timeline()
          .set(overlay, { clipPath: "polygon(0 0,100% 0,100% 0,0 0)" })
          .to(overlay, { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", duration: 0.45, ease: "power4.inOut" })
          .to(label, { opacity: 1, duration: 0.2 }, "-=0.15")
          .call(() => scrollTo(target, { duration: 0.1 }))
          .to(label, { opacity: 0, duration: 0.2 }, "+=0.15")
          .to(overlay, {
            clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
            duration: 0.45, ease: "power4.inOut",
          });
      });
    });
  }

  /* ---------- 17. BACK TO TOP -------------------------------------------------- */
  function initBackToTop() {
    document.getElementById("backToTop")?.addEventListener("click", () => scrollTo(0));
  }

  /* ---------- INIT --------------------------------------------------------- */
  async function init() {
    initSmoothScroll();
    initCursor();
    initNav();
    initHero();
    initParallax();
    initSelectedWork();
    initHorizontalWork();
    initServices();
    initKinetic();
    initAbout();
    initVideo();
    initProcess();
    initMarquee();
    initMagnetic();
    initContact();
    initGenericMasks();
    initPageTransitions();
    initBackToTop();
    ScrollTrigger.refresh();
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await runPreloader();
    init();
  });

  window.addEventListener("resize", () => ScrollTrigger.refresh());
})();
