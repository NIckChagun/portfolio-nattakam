const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("main section[id], footer[id]")];
const caseCards = [...document.querySelectorAll(".case-card")];
const caseDots = [...document.querySelectorAll(".carousel-dots .dot")];
const casesPerPage = 3;

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const setActiveNav = () => {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 120)
    .at(-1);

  if (!current) return;

  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

const showCasePage = (pageIndex) => {
  const start = pageIndex * casesPerPage;
  const end = start + casesPerPage;

  caseCards.forEach((card, index) => {
    card.classList.toggle("is-hidden", index < start || index >= end);
  });

  caseDots.forEach((dot, index) => {
    const isActive = index === pageIndex;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
};

if (caseCards.length && caseDots.length) {
  caseDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showCasePage(index));
  });

  showCasePage(0);
}
