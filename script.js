document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Smooth scrolling
  let lenis;
  if (!reduced && typeof Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.085 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const loader = document.querySelector(".loader");
  const loaderCount = document.querySelector("#loaderCount");
  const loaderLine = document.querySelector(".loader-line");
  document.body.classList.add("loading");

  let count = { value: 0 };
  gsap.to(count, {
    value: 100, duration: reduced ? .2 : 1.8, ease: "power2.inOut",
    onUpdate: () => loaderCount.textContent = String(Math.round(count.value)).padStart(2, "0")
  });
  gsap.to(loaderLine, { width: "calc(100% - 60px)", duration: reduced ? .2 : 1.8, ease: "power2.inOut" });

  const introTimeline = gsap.timeline({ delay: reduced ? .2 : 2 });
  introTimeline
    .to(loader, { yPercent: -100, duration: reduced ? .2 : 1, ease: "power4.inOut",
      onComplete: () => { loader.style.display = "none"; document.body.classList.remove("loading"); }})
    .to(".hero-reveal", { opacity: 1, y: 0, duration: .5 }, "-=.45")
    .to(".hero h1 .line>span", { y: 0, duration: .95, stagger: .12, ease: "power4.out" }, "-=.35")
    .from(".hero-meta", { opacity: 0, y: 30, duration: .7, ease: "power3.out" }, "-=.5")
    .from(".hero-image", { opacity: 0, scale: .85, y: 60, rotate: 0, duration: 1.2, stagger: .12, ease: "expo.out" }, "-=.9");

  // Cursor
  const cursor = document.querySelector(".cursor");
  if (window.matchMedia("(pointer:fine)").matches && !reduced) {
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    gsap.ticker.add(() => {
      cx += (mx - cx) * .18; cy += (my - cy) * .18;
      gsap.set(cursor, { x: cx, y: cy });
    });
    document.querySelectorAll(".magnetic-area").forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("view"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("view"));
    });
  }

  // Mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  let menuOpen = false;
  menuBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    gsap.to(mobileMenu, { yPercent: menuOpen ? 0 : -100, autoAlpha: menuOpen ? 1 : 0, duration: .7, ease: "power4.inOut" });
    gsap.fromTo(".mobile-menu a", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .08, ease: "power4.out", delay: menuOpen ? .2 : 0 });
  });
  document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
    menuOpen = false;
    gsap.to(mobileMenu, { yPercent: -100, autoAlpha: 0, duration: .6, ease: "power4.inOut" });
  }));

  // Hero mouse parallax
  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", e => {
      const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
      gsap.to(".hero-image-a", { x: x * -35, y: y * -25, duration: 1.2, overwrite: "auto" });
      gsap.to(".hero-image-b", { x: x * 45, y: y * 35, duration: 1.2, overwrite: "auto" });
    });
  }

  // Generic reveal animations
  gsap.utils.toArray(".reveal-image").forEach((img, i) => {
    gsap.to(img, {
      clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "power4.inOut",
      scrollTrigger: { trigger: img, start: "top 82%", once: true }
    });
    gsap.to(img.querySelector("img"), {
      scale: 1, duration: 1.5, ease: "power4.out",
      scrollTrigger: { trigger: img, start: "top 82%", once: true }
    });
  });

  gsap.utils.toArray(".reveal-text").forEach(el => {
    gsap.from(el, { y: 90, opacity: 0, duration: 1, ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 80%", once: true }});
  });

  // Hero scroll transformation
  if (!reduced) {
    gsap.timeline({
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
    }).to(".hero-copy", { y: -120, scale: .78, opacity: .15 }, 0)
      .to(".hero-image-a", { scale: 1.35, x: -80, rotation: -4, opacity: .5 }, 0)
      .to(".hero-image-b", { scale: 1.3, x: 100, rotation: 5, opacity: 0 }, 0)
      .to(".hero-grid", { opacity: 0 }, 0);
  }

  // Horizontal scroll on desktop
  if (innerWidth > 900 && !reduced) {
    const section = document.querySelector(".horizontal-wrap");
    const track = document.querySelector(".horizontal-track");
    const distance = () => track.scrollWidth - innerWidth;
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: { trigger: section, pin: true, scrub: 1, end: () => "+=" + distance(), invalidateOnRefresh: true }
    });
  }

  // Service image hover
  const serviceImage = document.querySelector(".service-hover-image img");
  const serviceBox = document.querySelector(".service-hover-image");
  document.querySelectorAll(".service").forEach(item => {
    item.addEventListener("mouseenter", () => {
      if (innerWidth <= 900) return;
      serviceImage.src = item.dataset.image;
      gsap.to(serviceBox, { opacity: 1, scale: 1, duration: .5, ease: "power3.out" });
      gsap.fromTo(serviceImage, { scale: 1.15 }, { scale: 1, duration: .8, ease: "power3.out" });
    });
    item.addEventListener("mouseleave", () => gsap.to(serviceBox, { opacity: 0, scale: .92, duration: .35 }));
  });

  // Kinetic statement
  if (!reduced) {
    gsap.utils.toArray(".statement-words div").forEach((el, i) => {
      gsap.fromTo(el, { x: i % 2 ? 100 : -100, opacity: .15 }, {
        x: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".statement", start: "top 75%", end: "bottom 55%", scrub: 1 }
      });
    });
  }

  // About / process reveals
  gsap.utils.toArray(".about-grid, .process-item, .stats>div").forEach(el => {
    gsap.from(el, { y: 50, opacity: 0, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }});
  });

  // Count-up stats
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = Number(el.dataset.count);
    let obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => gsap.to(obj, { v: target, duration: 1.5, ease: "power2.out",
        onUpdate: () => el.textContent = Math.round(obj.v) })
    });
  });

  // Marquee
  if (!reduced) {
    gsap.to(".marquee-track", { xPercent: -25, duration: 18, repeat: -1, ease: "none" });
  }

  // Magnetic buttons
  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * .18, y: y * .18, duration: .35, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: .7, ease: "elastic.out(1, .4)" }));
    });
  }

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -30 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelector("#topBtn").addEventListener("click", () => {
    if (lenis) lenis.scrollTo(0); else window.scrollTo({top:0, behavior:"smooth"});
  });

  window.addEventListener("load", () => setTimeout(() => ScrollTrigger.refresh(), 100));
});
