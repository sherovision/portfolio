document.addEventListener("DOMContentLoaded", function () {
    // Add or replace projects here. Use the same image paths as your current website.
    const projects = [
        {brand:"Rajinata Anda", image:"images/Anda.png", name:"Event Poster", category:"graphic-design", size:"vertical"},
        {brand:"Handewaka", image:"images/handewaka.png", name:"Event Poster", category:"graphic-design", size:"vertical"},
        {brand:"Cake Cuddles", image:"images/cakecuddle.png", name:"Logo Design", category:"branding", size:"wide"},
        {brand:"Dream Night", image:"images/Dream.png", name:"Event Poster", category:"graphic-design", size:"vertical"},
        {brand:"Thaala Events", image:"images/thaalaa.png", name:"Logo Design", category:"branding", size:"wide"},
        {brand:"Eminva", image:"images/eminva.png", name:"Logo Design", category:"branding", size:"wide"},
        {brand:"Rookantha", image:"images/rookantha.png", name:"Event Poster", category:"graphic-design", size:"vertical"},
        {brand:"Mystic Brew", image:"images/Brew.png", name:"Logo Design", category:"branding", size:"vertical"},
        {brand:"Lotus Glow", image:"images/Lotus.png", name:"Web Banner", category:"graphic-design", size:"wide"},
        {brand:"SB Tattoo", image:"images/mathaka.png", name:"Logo Design", category:"branding", size:"vertical"},
        {brand:"Nipuni", image:"images/nipuni.png", name:"Logo Design", category:"branding", size:"wide"}
    ];

    const categories = {
        "graphic-design": ["GRAPHIC", "DESIGN.", "Selected graphic design work including posters, campaigns, web banners and visual communication."],
        "branding": ["BRAND", "IDENTITY.", "Selected logo, identity and branding projects created for businesses and growing brands."],
        "video-editing": ["VIDEO", "EDITING.", "Selected video editing work, reels, promotional edits and visual storytelling."],
        "content-creation": ["CONTENT", "CREATION.", "Selected content created for brands, campaigns and social platforms."],
        "motion-graphics": ["MOTION", "GRAPHICS.", "Selected motion design, animated graphics and visual movement projects."],
        "social-media": ["SOCIAL", "MEDIA.", "Selected social media creatives, campaign visuals and branded content."],
        "ai-creative": ["AI", "CREATIVE.", "Selected AI-assisted creative concepts and visual experiments."],
        "digital-campaigns": ["DIGITAL", "CAMPAIGNS.", "Selected digital campaign artwork and multi-format creative work."]
    };

    const params = new URLSearchParams(window.location.search);
    let activeCategory = params.get("category") || "graphic-design";
    if (!categories[activeCategory]) activeCategory = "graphic-design";

    const grid = document.querySelector("#projects-grid");
    const filters = document.querySelector("#work-filters");
    const title = document.querySelector("#category-title");
    const description = document.querySelector("#category-description");

    function setHeading(category) {
        const data = categories[category];
        title.innerHTML = `${data[0]}<br><span>${data[1]}</span>`;
        description.textContent = data[2];
    }

    function createCard(project) {
        return `<article class="work-card ${project.size}"><img src="${project.image}" alt="${project.name}" loading="lazy"><div class="work-card-info"><div><small>${project.brand}</small><strong>${project.name}</strong></div><small>VIEW ↗</small></div></article>`;
    }

    function renderProjects(category) {
        activeCategory = category;
        setHeading(category);
        const matches = projects.filter(project => project.category === category);
        grid.innerHTML = matches.length ? matches.map(createCard).join("") : `<p style="color:#777;font-size:12px;grid-column:1/-1;padding:40px 0 120px">Projects for this service can be added in <strong>work.js</strong>.</p>`;
        document.querySelectorAll(".work-filter").forEach(button => button.classList.toggle("active", button.dataset.category === category));
        history.replaceState(null, "", `?category=${category}`);
        if (window.gsap && matches.length) gsap.fromTo(".work-card", {y:35,opacity:0}, {y:0,opacity:1,duration:.65,stagger:.06,ease:"power3.out"});
    }

    Object.keys(categories).forEach(category => {
        const button = document.createElement("button");
        button.className = "work-filter";
        button.dataset.category = category;
        button.textContent = category.replaceAll("-", " ").toUpperCase();
        button.addEventListener("click", () => renderProjects(category));
        filters.appendChild(button);
    });

    renderProjects(activeCategory);
    if (window.gsap) gsap.from(".work-heading > *", {y:50,opacity:0,duration:.8,stagger:.08,ease:"power3.out"});
});
