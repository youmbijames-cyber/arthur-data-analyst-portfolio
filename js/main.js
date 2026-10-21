/* Portfolio — NADJO YOUMBI Arthur Jeremie · Data Analyst */

const CONFIG = {
  email: "youmbijames@gmail.com",
  linkedin: "https://www.linkedin.com/",
};

const PROJECTS = [
  {
    id: "ucl",
    title: "UEFA Champions League Analytics",
    category: "sport",
    tag: "Sport · Time series",
    summary: "70 saisons de vainqueurs UCL (1956–2025) : titres par club et pays, tendances par décennie, dashboard KPI.",
    skills: ["COUNTIF", "MINIFS / MAXIFS", "Bar + Pie", "Dashboard"],
    year: "2025",
    link: "projects/champions-league.html",
  },
  {
    id: "worldcup",
    title: "FIFA World Cup Analytics",
    category: "sport",
    tag: "Sport · Categorical",
    summary: "Finales 1930–2022 : palmarès pays, Europe vs Amérique du Sud, ratios titres / finales.",
    skills: ["COUNTIF", "Win ratios", "Pie + Bar", "Insights"],
    year: "2025",
    link: "projects/world-cup.html",
  },
  {
    id: "olympics",
    title: "Olympic Medals Analytics",
    category: "sport",
    tag: "Sport · Ranking",
    summary: "Médailles JO 2000–2024 : score pondéré, cumul par pays, rivalité USA–Chine sur l'or.",
    skills: ["SUMIF / SUMIFS", "RANK", "Stacked + Line", "Weighted score"],
    year: "2025",
    link: "projects/olympics.html",
  },
  {
    id: "population",
    title: "World Population Analytics",
    category: "socio",
    tag: "Démographie · Growth",
    summary: "Population mondiale 1950–2024 par région : taux de croissance, parts régionales, transition démographique.",
    skills: ["Growth rates", "Shares %", "Line charts", "Time series"],
    year: "2025",
    link: "projects/population.html",
  },
  {
    id: "renewables",
    title: "Renewable Energy Transition",
    category: "socio",
    tag: "Énergie · Comparison",
    summary: "Part des renouvelables dans l'électricité (2000–2023) : gains en points, classements, écarts vs monde.",
    skills: ["VLOOKUP logic", "Gap analysis", "Line + Bar", "Ranking"],
    year: "2025",
    link: "projects/renewables.html",
  },
];

const SKILLS = {
  "Analyse & Excel": [
    "COUNTIF / COUNTIFS",
    "SUMIF / SUMIFS",
    "VLOOKUP / XLOOKUP",
    "MINIFS / MAXIFS / RANK",
    "Taux de croissance & %",
    "Tableaux croisés (logique)",
  ],
  "Visualisation": [
    "Graphiques Excel",
    "Chart.js (web)",
    "KPI dashboards",
    "Bar / Line / Pie / Stacked",
    "Conditional formatting",
  ],
  "Data storytelling": [
    "Insights actionnables",
    "Synthèse exécutive",
    "Méthode Ask → Act",
    "Documentation claire",
  ],
  "Livrables clients": [
    "Classeurs Excel pro",
    "Dashboards web statiques",
    "Portfolio Upwork",
    "HTML / CSS / JS",
  ],
};

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  grid.innerHTML = list
    .map(
      (p) => `
    <article class="project-card">
      <span class="tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <div class="skills-row">${p.skills.map((s) => `<span>${s}</span>`).join("")}</div>
      <div class="foot">
        <span class="year">${p.year}</span>
        <a class="link" href="${p.link}" target="_blank" rel="noopener">Ouvrir le dashboard →</a>
      </div>
    </article>`
    )
    .join("");
}

function renderSkills() {
  const el = document.getElementById("skillsGrid");
  if (!el) return;
  el.innerHTML = Object.entries(SKILLS)
    .map(
      ([title, items]) => `
    <div class="skill-group reveal">
      <h3>${title}</h3>
      <div class="skill-tags">${items.map((i) => `<span>${i}</span>`).join("")}</div>
    </div>`
    )
    .join("");
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });
}

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
  toggle?.addEventListener("click", () => links.classList.toggle("open"));
  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  const sections = document.querySelectorAll("section[id]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links?.querySelectorAll("a").forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((s) => obs.observe(s));
}

function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

function initContact() {
  const mailLink = document.getElementById("mailLink");
  const mailLabel = document.getElementById("mailLabel");
  const linkedin = document.getElementById("linkedinLink");
  if (mailLink) mailLink.href = "mailto:" + CONFIG.email;
  if (mailLabel) mailLabel.textContent = CONFIG.email;
  if (linkedin) linkedin.href = CONFIG.linkedin;

  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Contact portfolio — ${name}`);
    const body = encodeURIComponent(`De: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  initFilters();
  initNav();
  initContact();
  setTimeout(initReveal, 40);
});
