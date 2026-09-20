/* =========================================================
   SHEROVISION
   Main JavaScript
========================================================= */


/* =========================================================
   01. WAIT UNTIL THE PAGE IS READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       02. GSAP SETUP
    ====================================================== */

    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       03. CHECK REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       04. LENIS SMOOTH SCROLL
    ====================================================== */

    let smoothScroll = null;

    if (!prefersReducedMotion && window.Lenis) {

        smoothScroll = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            lerp: 0.075
        });


        smoothScroll.on("scroll", function () {

            ScrollTrigger.update();

        });


        gsap.ticker.add(function (time) {

            smoothScroll.raf(time * 1000);

        });


        gsap.ticker.lagSmoothing(0);

    }


    /* =====================================================
       05. PORTFOLIO PROJECT DATA

       Replace these image URLs with your real
       SheroVision project images.

       Format:

       [
           "CATEGORY",
           "IMAGE URL",
           "PROJECT NAME"
       ]
    ====================================================== */

    const portfolioProjects = [

        [
            "Event Poster",
            "images/Anda.png",
            "Event Poster"
        ],

        [
            "Campaign",
            "images/Cake.png",
            "Logo Design"
        ],

        [
            "Digital",
            "images/arachchi.png",
            "Tution Poster"
        ],

        [
            "Content",
            "images/thaala.png",
            "Logo Design"
        ],

        [
            "Motion",
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=88",
            "FRAME"
        ],

        [
            "Social Media",
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=88",
            "SOCIAL LAB"
        ],

        [
            "Poster Design",
            "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=88",
            "AFTER DARK"
        ],

        [
            "Branding",
            "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1000&q=88",
            "STUDIO 08"
        ],

        [
            "AI Creative",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=88",
            "DIGITAL FUTURE"
        ],

        [
            "Campaign",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=88",
            "ORBIT"
        ]

    ];


    /* =====================================================
       06. CREATE A PORTFOLIO CARD

       This function creates one portfolio card
       from the project information above.
    ====================================================== */

    function createProjectCard(project) {

        const category = project[0];
        const image = project[1];
        const projectName = project[2];


        return `
            <a href="#contact" class="project-card">

                <img
                    src="${image}"
                    alt="${projectName}"
                    loading="lazy"
                >

                <div class="project-information">

                    <div>

                        <small>
                            ${category}
                        </small>

                        <strong>
                            ${projectName}
                        </strong>

                    </div>

                    <small>
                        VIEW ↗
                    </small>

                </div>

            </a>
        `;

    }


    /* =====================================================
       07. GET THE TWO PORTFOLIO ROWS
    ====================================================== */

    const topProjectRow = document.querySelector(
        "#top-project-row"
    );

    const bottomProjectRow = document.querySelector(
        "#bottom-project-row"
    );


    /* =====================================================
       08. CREATE TOP ROW

       We duplicate the projects.

       Duplication allows the animation to loop
       without showing an empty gap.
    ====================================================== */

    const topProjects = portfolioProjects
        .map(createProjectCard)
        .join("");


    topProjectRow.innerHTML =
        topProjects + topProjects;


    /* =====================================================
       09. CREATE BOTTOM ROW

       Reverse the projects so the two rows feel
       visually different.
    ====================================================== */

    const reversedProjects = [...portfolioProjects]
        .reverse();


    const bottomProjects = reversedProjects
        .map(createProjectCard)
        .join("");


    bottomProjectRow.innerHTML =
        bottomProjects + bottomProjects;


    /* =====================================================
       10. CONTINUOUS PORTFOLIO ANIMATION

       TOP ROW:
       LEFT → RIGHT

       BOTTOM ROW:
       RIGHT → LEFT
    ====================================================== */

    if (!prefersReducedMotion) {


        /*
            The top row starts slightly to the left
            and continuously moves toward the right.
        */

        gsap.fromTo(
            topProjectRow,

            {
                xPercent: -50
            },

            {
                xPercent: 0,

                duration: 34,

                repeat: -1,

                ease: "none"
            }
        );


        /*
            The bottom row starts on the left side
            and continuously moves toward the left.

            This creates the opposite direction.
        */

        gsap.fromTo(
            bottomProjectRow,

            {
                xPercent: 0
            },

            {
                xPercent: -50,

                duration: 38,

                repeat: -1,

                ease: "none"
            }
        );

    }


    /* =====================================================
       11. PORTFOLIO HOVER SPEED

       When the mouse enters the gallery, slow the
       movement slightly so users can inspect work.
    ====================================================== */

    const showcaseRows = document.querySelectorAll(
        ".showcase-row"
    );


    showcaseRows.forEach(function (row) {

        row.addEventListener("mouseenter", function () {

            if (!prefersReducedMotion) {

                gsap.globalTimeline.timeScale(0.35);

            }

        });


        row.addEventListener("mouseleave", function () {

            if (!prefersReducedMotion) {

                gsap.globalTimeline.timeScale(1);

            }

        });

    });


    /* =====================================================
       12. PAGE LOADER
    ====================================================== */

    const pageLoader = document.querySelector(
        ".page-loader"
    );

    const loaderProgress = document.querySelector(
        ".loader-progress span"
    );

    const loaderPercentage = document.querySelector(
        ".loader-percentage"
    );


    const loadingNumber = {
        value: 0
    };


    gsap.to(
        loadingNumber,
        {
            value: 100,

            duration: 1.7,

            ease: "power2.inOut",

            onUpdate: function () {

                const number = Math.round(
                    loadingNumber.value
                );

                loaderPercentage.textContent =
                    String(number).padStart(2, "0") + "%";

            }
        }
    );


    gsap.to(
        loaderProgress,
        {
            width: "100%",

            duration: 1.7,

            ease: "power2.inOut"
        }
    );


    gsap.to(
        pageLoader,
        {
            yPercent: -100,

            delay: 1.9,

            duration: 0.9,

            ease: "power4.inOut",

            onComplete: function () {

                pageLoader.remove();

            }
        }
    );


    /* =====================================================
       13. HERO TEXT ANIMATION
    ====================================================== */

    gsap.from(
        ".hero-title span",
        {
            y: 100,

            opacity: 0,

            filter: "blur(8px)",

            duration: 1,

            delay: 2.05,

            stagger: 0.1,

            ease: "power4.out"
        }
    );


    gsap.from(
        ".hero-top-line, .hero-description, .hero-button",
        {
            y: 25,

            opacity: 0,

            duration: 0.7,

            delay: 2.4,

            stagger: 0.08,

            ease: "power3.out"
        }
    );


    /* =====================================================
       14. HERO PARALLAX
    ====================================================== */

    if (!prefersReducedMotion) {


        gsap.to(
            ".hero-content",
            {
                y: -120,

                scale: 0.82,

                opacity: 0.25,

                scrollTrigger: {

                    trigger: ".hero-section",

                    start: "top top",

                    end: "bottom top",

                    scrub: 1

                }
            }
        );


        gsap.to(
    ".hero-eye",
    {
        x: -100,

        y: 120,

        scale: 1.15,

        scrollTrigger: {

            trigger: ".hero-section",

            start: "top top",

            end: "bottom top",

            scrub: 1

        }
    }
);
       
}

/* =====================================================
   3D HERO EYE MOVEMENT
===================================================== */

/*
    Get all parts of the eye.
*/

const heroEye = document.querySelector(".hero-eye");

const eyeBall = document.querySelector(".eye-ball");

const eyeIris = document.querySelector(".eye-iris");


/*
    Only run the animation if the eye exists.
*/

if (
    heroEye &&
    eyeBall &&
    eyeIris &&
    !prefersReducedMotion
) {

    /*
        Listen for mouse movement.
    */

    window.addEventListener(
        "mousemove",
        function (event) {

            /*
                Convert the horizontal mouse position
                to a value between -0.5 and 0.5.
            */

            const mouseX =
                event.clientX /
                window.innerWidth -
                0.5;


            /*
                Convert the vertical mouse position
                to a value between -0.5 and 0.5.
            */

            const mouseY =
                event.clientY /
                window.innerHeight -
                0.5;


            /*
                Slightly rotate the whole eyeball
                toward the mouse.
            */

            gsap.to(
                eyeBall,
                {
                    rotateY: mouseX * 18,

                    rotateX: mouseY * -18,

                    duration: 1,

                    ease: "power3.out",

                    overwrite: "auto"
                }
            );


            /*
                Move the iris toward the cursor.
            */

            gsap.to(
                eyeIris,
                {
                    x: mouseX * 70,

                    y: mouseY * 70,

                    duration: 0.8,

                    ease: "power3.out",

                    overwrite: "auto"
                }
            );

        }
    );

}
   
    /* =====================================================
       15. SCROLL REVEAL ANIMATIONS
    ====================================================== */

    const revealSections = document.querySelectorAll(
        ".intro-section, .showcase-header, .featured-layout, .services-layout, .reviews-header, .about-layout"
    );


    revealSections.forEach(function (section) {

        gsap.from(
            section,
            {
                y: 55,

                opacity: 0,

                duration: 0.9,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: section,

                    start: "top 86%",

                    once: true

                }
            }
        );

    });


    /* =====================================================
       16. NUMBER COUNTERS
    ====================================================== */

    const counterElements = document.querySelectorAll(
        "[data-count]"
    );


    counterElements.forEach(function (element) {

        const targetNumber = Number(
            element.dataset.count
        );


        const counter = {
            value: 0
        };


        ScrollTrigger.create({

            trigger: element,

            start: "top 88%",

            once: true,

            onEnter: function () {

                gsap.to(
                    counter,
                    {
                        value: targetNumber,

                        duration: 1.5,

                        ease: "power2.out",

                        onUpdate: function () {

                            element.textContent =
                                Math.round(counter.value);

                        }
                    }
                );

            }

        });

    });


    /* =====================================================
       17. CLIENT REVIEWS

       Replace the sample names and text with your
       real recent client reviews.
    ====================================================== */

    const clientReviews = [

        {
            rating: "★★★★★",

            text:
                "The team understood our direction immediately and delivered visuals that felt premium, fresh and completely on-brand.",

            client:
                "Client Name",

            company:
                "Brand / Company"
        },


        {
            rating: "★★★★★",

            text:
                "Fast communication, strong ideas and excellent execution. The final creative gave our campaign a much stronger presence.",

            client:
                "Client Name",

            company:
                "Business / Company"
        },


        {
            rating: "★★★★★",

            text:
                "SheroVision turned a simple idea into a visual identity we are proud to put everywhere.",

            client:
                "Client Name",

            company:
                "Brand / Company"
        },


        {
            rating: "★★★★★",

            text:
                "The editing, motion and social creatives all worked together as one clear visual language.",

            client:
                "Client Name",

            company:
                "Project / Company"
        },


        {
            rating: "★★★★★",

            text:
                "Professional from concept to delivery. We would happily work with SheroVision again.",

            client:
                "Client Name",

            company:
                "Company"
        }

    ];


    /* =====================================================
       18. CREATE REVIEW CARDS
    ====================================================== */

    const reviewsTrack = document.querySelector(
        "#reviews-track"
    );


    clientReviews.forEach(function (review) {

        const reviewCard = document.createElement(
            "article"
        );


        reviewCard.className = "review-card";


        reviewCard.innerHTML = `

            <div class="review-stars">
                ${review.rating}
            </div>

            <blockquote>
                “${review.text}”
            </blockquote>

            <cite>
                ${review.client}
            </cite>

            <small>
                ${review.company}
            </small>

        `;


        reviewsTrack.appendChild(reviewCard);

    });


    /* =====================================================
       19. REVIEW SLIDER
    ====================================================== */

    let currentReview = 0;


    const reviewCounter = document.querySelector(
        "#review-counter"
    );


    const previousReviewButton = document.querySelector(
        "#review-previous"
    );


    const nextReviewButton = document.querySelector(
        "#review-next"
    );


    function getVisibleReviewCount() {

        if (window.innerWidth < 900) {

            return 1;

        }

        return 3;

    }


    function updateReviewSlider() {

        const firstCard =
            reviewsTrack.querySelector(
                ".review-card"
            );


        if (!firstCard) {

            return;

        }


        const cardWidth =
            firstCard.offsetWidth;


        const gap = 12;


        const visibleReviews =
            getVisibleReviewCount();


        const maximumIndex =
            Math.max(
                0,
                clientReviews.length - visibleReviews
            );


        /*
            Prevent the slider from moving beyond
            the final review.
        */

        currentReview =
            Math.max(
                0,
                Math.min(
                    currentReview,
                    maximumIndex
                )
            );


        const distance =
            currentReview *
            (cardWidth + gap);


        reviewsTrack.style.transform =
            `translateX(-${distance}px)`;


        reviewCounter.textContent =
            String(currentReview + 1).padStart(2, "0")
            + " / "
            + String(clientReviews.length).padStart(2, "0");

    }


    nextReviewButton.addEventListener(
        "click",
        function () {

            currentReview++;

            updateReviewSlider();

        }
    );


    previousReviewButton.addEventListener(
        "click",
        function () {

            currentReview--;

            updateReviewSlider();

        }
    );


    window.addEventListener(
        "resize",
        updateReviewSlider
    );


    updateReviewSlider();


    /* =====================================================
       20. MOBILE MENU
    ====================================================== */

    const mobileMenuButton =
        document.querySelector(
            ".mobile-menu-button"
        );


    const mobileNavigation =
        document.querySelector(
            ".mobile-navigation"
        );


    let mobileMenuOpen = false;


    mobileMenuButton.addEventListener(
        "click",
        function () {

            mobileMenuOpen =
                !mobileMenuOpen;


            gsap.to(
                mobileNavigation,
                {
                    yPercent:
                        mobileMenuOpen ? 0 : -100,

                    autoAlpha:
                        mobileMenuOpen ? 1 : 0,

                    duration: 0.6,

                    ease: "power4.inOut"
                }
            );


            if (mobileMenuOpen) {

                gsap.fromTo(
                    ".mobile-navigation a",

                    {
                        y: 60,
                        opacity: 0
                    },

                    {
                        y: 0,
                        opacity: 1,

                        duration: 0.55,

                        stagger: 0.08,

                        delay: 0.1,

                        ease: "power4.out"
                    }
                );

            }

        }
    );


    /* Close mobile navigation after clicking a link */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-navigation a"
        );


    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                mobileMenuOpen = false;


                gsap.to(
                    mobileNavigation,
                    {
                        yPercent: -100,

                        autoAlpha: 0,

                        duration: 0.45,

                        ease: "power4.inOut"
                    }
                );

            }
        );

    });


    /* =====================================================
       21. SMOOTH ANCHOR LINKS
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                const targetElement =
                    document.querySelector(
                        targetId
                    );


                if (!targetElement) {

                    return;

                }


                event.preventDefault();


                if (smoothScroll) {

                    smoothScroll.scrollTo(
                        targetElement,
                        {
                            offset: -30
                        }
                    );

                } else {

                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =====================================================
       22. BACK TO TOP
    ====================================================== */

    const backToTopButton =
        document.querySelector(
            "#back-to-top"
        );


    backToTopButton.addEventListener(
        "click",
        function () {

            if (smoothScroll) {

                smoothScroll.scrollTo(0);

            } else {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    /* =====================================================
       23. REFRESH SCROLLTRIGGER
    ====================================================== */

    window.addEventListener(
        "load",
        function () {

            setTimeout(
                function () {

                    ScrollTrigger.refresh();

                },
                200
            );

        }
    );


});
