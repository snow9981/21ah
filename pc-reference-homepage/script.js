(function () {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const ctaLinks = document.querySelectorAll("[data-cta]");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      console.log("Menu clicked");
    });
  }

  ctaLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      console.log("CTA clicked:", link.dataset.cta, link.getAttribute("href"));
    });
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();
