const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isHomePage = currentPage === "index.html";

const pageHref = (anchor) => (isHomePage ? `#${anchor}` : `index.html#${anchor}`);

const renderLayout = () => {
  const headerSlot = document.querySelector("[data-site-header]");
  const footerSlot = document.querySelector("[data-site-footer]");

  if (headerSlot) {
    headerSlot.outerHTML = `
      <header class="site-header">
        <a class="brand" href="${pageHref("home")}" aria-label="Nattakan portfolio home">
          <span class="brand-mark">N</span>
          <span>Nattakan</span>
        </a>
        <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="nav-links" aria-label="Main navigation">
          <a class="${isHomePage ? "active" : ""}" href="${pageHref("home")}">Home</a>
          <a class="${isHomePage ? "" : "active"}" href="${pageHref("case-studies")}">Case Studies</a>
          <a href="${pageHref("about")}">About Me</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
    `;
  }

  if (footerSlot) {
    footerSlot.outerHTML = `
      <footer id="contact" class="footer">
        <div class="footer-grid">
          <section class="footer-intro">
            <a class="brand" href="${pageHref("home")}">
              <span class="brand-mark">N</span>
              <span>Nattakan</span>
            </a>
            <h2>Have A Project In Mind?<br>Let’s Talk.</h2>
            <p>I’m open to new opportunities and collaborations - feel free to reach out and let’s build something meaningful together.</p>
            <div class="social-links" aria-label="Social links">
              <a class="whatsapp" href="tel:+66940481475" aria-label="Call Nattakan">
                <span class="iconify" data-icon="mingcute:phone-call-fill" aria-hidden="true"></span>
              </a>
              <a class="linkedin" href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
              <a class="mail" href="mailto:nattakan.uoou@gmail.com" aria-label="Email">m</a>
            </div>
          </section>

          <section>
            <h3>Navigation</h3>
            <a href="${pageHref("home")}">Home</a>
            <a href="${pageHref("case-studies")}">Case Studies</a>
            <a href="#contact">Contact</a>
          </section>

          <section>
            <h3>Our address</h3>
            <p><a href="tel:+66940481475">+66 94 048 1475</a></p>
            <p><a href="mailto:nattakan.uoou@gmail.com">nattakan.uoou@gmail.com</a></p>
            <address>97/166 S9 Condominium<br>Soi Pa Mai Uthit, Rattanathibet Road<br>Bang Rak Yai Subdistrict, Bang Bua Thong District<br>Nonthaburi 11110, Thailand</address>
          </section>
        </div>
        <p class="copyright">Copyright 2026 Nattakan Noichalad. All rights reserved.</p>
      </footer>
    `;
  }
};

renderLayout();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("main section[id], footer[id]")];
const caseCards = [...document.querySelectorAll(".case-card")];
const caseDots = [...document.querySelectorAll(".carousel-dots .dot")];
const casesPerPage = 3;

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
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

if (isHomePage) {
  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();
}

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
