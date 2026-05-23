(function () {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const ctaLinks = document.querySelectorAll("[data-cta]");

  document.querySelectorAll(".mobile-sticky-cta [data-cta*='reservation']").forEach(function (element) {
    element.href = "{{NAVER_PLACE_URL}}";
    element.dataset.cta = "sticky-place";
    element.setAttribute("aria-label", "네이버 플레이스로 이동");
    element.textContent = "네이버 플레이스";
  });

  document.querySelectorAll("[data-cta*='reservation'], .reserve-pill").forEach(function (element) {
    element.remove();
  });

  function getContentValue(path) {
    return path.split(".").reduce(function (value, key) {
      if (value === undefined || value === null) return undefined;
      return value[key];
    }, window.SITE_CONTENT);
  }

  function resolveSiteContent() {
    if (window.SITE_CONTENT) return window.SITE_CONTENT;

    const encodedContent = document.documentElement.dataset.siteContent;
    if (!encodedContent) return null;

    try {
      window.SITE_CONTENT = JSON.parse(encodedContent);
      return window.SITE_CONTENT;
    } catch (error) {
      console.warn("SITE_CONTENT parsing failed", error);
      return null;
    }
  }

  function applyEditableContent() {
    if (!resolveSiteContent()) return false;

    document.querySelectorAll("[data-content]").forEach(function (element) {
      const value = getContentValue(element.dataset.content);
      if (value === undefined || value === null) return;
      element.textContent = value;
    });

    document.querySelectorAll("[data-content-src]").forEach(function (element) {
      const value = getContentValue(element.dataset.contentSrc);
      if (!value) return;
      element.setAttribute("src", value);
    });

    document.querySelectorAll("[data-content-alt]").forEach(function (element) {
      const value = getContentValue(element.dataset.contentAlt);
      if (!value) return;
      element.setAttribute("alt", value);
    });

    if (window.SITE_CONTENT.seo) {
      if (window.SITE_CONTENT.seo.title) {
        document.title = window.SITE_CONTENT.seo.title;
      }

      const description = document.querySelector('meta[name="description"]');
      if (description && window.SITE_CONTENT.seo.description) {
        description.setAttribute("content", window.SITE_CONTENT.seo.description);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && window.SITE_CONTENT.seo.title) {
        ogTitle.setAttribute("content", window.SITE_CONTENT.seo.title);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription && window.SITE_CONTENT.seo.description) {
        ogDescription.setAttribute("content", window.SITE_CONTENT.seo.description);
      }

      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle && window.SITE_CONTENT.seo.title) {
        twitterTitle.setAttribute("content", window.SITE_CONTENT.seo.title);
      }

      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription && window.SITE_CONTENT.seo.description) {
        twitterDescription.setAttribute("content", window.SITE_CONTENT.seo.description);
      }
    }

    const versionTarget = document.querySelector("[data-content-version]");
    if (versionTarget && window.SITE_CONTENT.contentVersion) {
      versionTarget.textContent = "문구 버전: " + window.SITE_CONTENT.contentVersion;
    }

    document.documentElement.classList.remove("content-loading");
    return true;
  }

  function applyEditableContentWhenReady(tryCount) {
    if (applyEditableContent()) return;
    if (tryCount >= 80) {
      document.documentElement.classList.remove("content-loading");
      return;
    }

    window.setTimeout(function () {
      applyEditableContentWhenReady(tryCount + 1);
    }, 50);
  }

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function closeMenu() {
    if (!menuToggle || !nav) return;
    document.body.classList.remove("menu-open");
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });
  }

  ctaLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      console.log("CTA clicked:", link.dataset.cta, link.getAttribute("href"));
    });
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  applyEditableContentWhenReady(0);
  setHeaderState();
})();
