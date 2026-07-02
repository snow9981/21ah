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
    const savedContent = loadSavedContent();
    if (savedContent) {
      window.SITE_CONTENT = savedContent;
      return window.SITE_CONTENT;
    }

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

  function loadSavedContent() {
    try {
      const savedContent = window.localStorage.getItem("SITE_CONTENT_DRAFT");
      if (!savedContent) return null;
      return JSON.parse(savedContent);
    } catch (error) {
      console.warn("Saved SITE_CONTENT loading failed", error);
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

    applyPageMetadata();

    applyEditableStyles();

    const versionTarget = document.querySelector("[data-content-version]");
    if (versionTarget && window.SITE_CONTENT.contentVersion) {
      versionTarget.textContent = "문구 버전: " + window.SITE_CONTENT.contentVersion;
    }

    document.documentElement.classList.remove("content-loading");
    return true;
  }

  function applyPageMetadata() {
    const page = document.body.dataset.page;
    const pageTitles = {
      home: "인사말 | 스물하나 동물병원",
      team: "의료진 소개 | 스물하나 동물병원",
      facilities: "병원시설 및 장비 소개 | 스물하나 동물병원",
      directions: "진료시간 및 오시는 길 | 스물하나 동물병원",
      price: "주요 진료비용 안내 | 스물하나 동물병원"
    };

    if (page && pageTitles[page]) {
      document.title = pageTitles[page];
    }
  }

  function applyTextStyle(target, selector, property, value) {
    if (!target || !value) return;

    target.querySelectorAll(selector).forEach(function (element) {
      element.style[property] = value;
    });
  }

  function applySectionStyle(section, config) {
    const target = document.querySelector(config.selector);
    const style = window.SITE_CONTENT.styles && window.SITE_CONTENT.styles[section];

    if (!target || !style) return;

    if (style.fontFamily) {
      target.style.fontFamily = style.fontFamily;
    }

    applyTextStyle(target, config.titleSelector, "fontSize", style.titleSize);
    applyTextStyle(target, config.titleSelector, "fontWeight", style.titleWeight);
    applyTextStyle(target, config.titleSelector, "color", style.titleColor);
    applyTextStyle(target, config.bodySelector, "fontSize", style.bodySize);
    applyTextStyle(target, config.bodySelector, "fontWeight", style.bodyWeight);
    applyTextStyle(target, config.bodySelector, "color", style.bodyColor);
  }

  function applyEditableStyles() {
    if (!window.SITE_CONTENT || !window.SITE_CONTENT.styles) return;

    const styleSections = {
      header: {
        selector: ".site-header",
        titleSelector: ".brand-name strong",
        bodySelector: ".desktop-nav a, .header-text-link, .mobile-nav a"
      },
      hero: {
        selector: ".hero",
        titleSelector: "h1, .hero-subtitle",
        bodySelector: ".hero-description, .hero-points li, .hero-footer-line"
      },
      quick: {
        selector: ".quick-actions",
        titleSelector: "strong",
        bodySelector: "small"
      },
      story: {
        selector: "#story",
        titleSelector: "h2, .section-kicker",
        bodySelector: "p"
      },
      philosophy: {
        selector: "#philosophy",
        titleSelector: "h2, .section-kicker",
        bodySelector: "p, blockquote"
      },
      collaboration: {
        selector: "#collaboration",
        titleSelector: "h2, h3, .section-kicker, .doctor-label",
        bodySelector: "p, li"
      },
      focus: {
        selector: "#focus",
        titleSelector: "h2, h3, .section-kicker, .card-icon",
        bodySelector: "p"
      },
      trust: {
        selector: "#trust",
        titleSelector: "h2, .section-kicker",
        bodySelector: "p, li, .trust-points span"
      },
      gallery: {
        selector: ".clinic-gallery-section",
        titleSelector: "h2, .section-kicker",
        bodySelector: "p"
      },
      finalCta: {
        selector: ".final-cta-section",
        titleSelector: "h2, .section-kicker",
        bodySelector: "p, a"
      },
      price: {
        selector: ".price-notice, .price-page-section",
        titleSelector: "h2",
        bodySelector: "p, a"
      },
      footer: {
        selector: ".site-footer",
        titleSelector: ".footer-brand p",
        bodySelector: "p, dt, dd, a"
      }
    };

    Object.keys(styleSections).forEach(function (section) {
      applySectionStyle(section, styleSections[section]);
    });
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
