(function () {
  const header = document.querySelector("[data-header]");
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
      facilities: "병원시설 | 스물하나 동물병원",
      equipment: "병원장비 | 스물하나 동물병원",
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
        bodySelector: ".desktop-nav a, .mobile-nav a"
      },
      hero: {
        selector: ".hero",
        titleSelector: "h1, .hero-subtitle",
        bodySelector: ".hero-description"
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

  function initExteriorSlideshow() {
    if (document.body.dataset.page !== "home") return;

    const wrap = document.querySelector(".clinic-photo-wrap");
    if (!wrap || wrap.dataset.slideshowReady === "true") return;

    const originalImage = wrap.querySelector("img");
    const fallbackAlt = originalImage ? originalImage.getAttribute("alt") : "스물하나 동물병원 외관 사진";
    const slides = [
      {
        image: "assets/images/exterior-slide-1.png",
        title: "스무 살의 바램에\n한 살을 더합니다.",
        description: "정확한 진단과 충분한 설명, 보호자와 함께하는 꾸준한 관리로 아이의 시간을 더 오래 지키고 싶습니다."
      },
      {
        image: "assets/images/exterior-slide-2.png",
        title: "스무 살을 넘어,\n스물하나까지.",
        description: "오래 사는 것만이 아니라, 아이가 보호자 곁에서 더 건강한 하루를 보낼 수 있도록 돕겠습니다."
      },
      {
        image: "assets/images/exterior-slide-3.png",
        title: "정확한 진단과\n충분한 설명.",
        description: "무엇을 확인하려는지, 왜 필요한지부터 보호자가 이해할 수 있도록 차분하게 설명하겠습니다."
      },
      {
        image: "assets/images/exterior-slide-4.png",
        title: "아이에게 필요한 만큼,\n납득할 수 있도록.",
        description: "한 가지 결과로 서둘러 결론 내리지 않고, 아이의 상태와 보호자의 이야기를 함께 살피겠습니다."
      }
    ];

    wrap.classList.add("clinic-slideshow");
    wrap.dataset.slideshowReady = "true";
    wrap.innerHTML = "";

    const hero = wrap.closest(".home-hero");
    const heroCopy = hero ? hero.querySelector(".hero-copy") : null;
    const heroTitle = heroCopy ? heroCopy.querySelector("h1") : null;
    const heroDescription = heroCopy ? heroCopy.querySelector(".hero-description") : null;
    const dotList = hero ? hero.querySelector(".hero-slide-dots") : null;

    slides.forEach(function (slide, index) {
      const figure = document.createElement("figure");
      const image = document.createElement("img");

      figure.className = "clinic-photo-slide" + (index === 0 ? " is-active" : "");
      image.src = slide.image;
      image.alt = fallbackAlt;
      image.loading = index === 0 ? "eager" : "lazy";
      figure.setAttribute("aria-hidden", index === 0 ? "false" : "true");

      figure.append(image);
      wrap.appendChild(figure);

      if (dotList) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-slide-dot" + (index === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", String(index + 1) + "번째 사진 보기");
        dot.setAttribute("aria-pressed", index === 0 ? "true" : "false");
        dot.dataset.slideIndex = String(index);
        dotList.appendChild(dot);
      }
    });

    let activeIndex = 0;
    const slideElements = wrap.querySelectorAll(".clinic-photo-slide");
    const dots = dotList ? dotList.querySelectorAll(".hero-slide-dot") : [];
    let timer = null;
    let copyChangeTimer = null;

    function updateHeroCopy(slide) {
      if (heroTitle) heroTitle.textContent = slide.title;
      if (heroDescription) heroDescription.textContent = slide.description;
    }

    function showSlide(nextIndex) {
      slideElements[activeIndex].classList.remove("is-active");
      slideElements[activeIndex].setAttribute("aria-hidden", "true");
      if (dots[activeIndex]) {
        dots[activeIndex].classList.remove("is-active");
        dots[activeIndex].setAttribute("aria-pressed", "false");
      }

      activeIndex = nextIndex;
      slideElements[activeIndex].classList.add("is-active");
      slideElements[activeIndex].setAttribute("aria-hidden", "false");
      if (dots[activeIndex]) {
        dots[activeIndex].classList.add("is-active");
        dots[activeIndex].setAttribute("aria-pressed", "true");
      }

      if (heroCopy) {
        window.clearTimeout(copyChangeTimer);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          updateHeroCopy(slides[activeIndex]);
        } else {
          heroCopy.classList.add("is-changing");
          copyChangeTimer = window.setTimeout(function () {
            updateHeroCopy(slides[activeIndex]);
            heroCopy.classList.remove("is-changing");
          }, 220);
        }
      }
    }

    function startTimer() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        showSlide((activeIndex + 1) % slideElements.length);
      }, 5500);
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        showSlide(Number(dot.dataset.slideIndex));
        startTimer();
      });
    });

    startTimer();
  }

  function initFacilityCarousel() {
    const carousel = document.querySelector("[data-facility-carousel]");
    if (!carousel || carousel.dataset.carouselReady === "true") return;

    const slides = Array.from(carousel.querySelectorAll("[data-facility-slide]"));
    const previousButton = carousel.querySelector("[data-facility-prev]");
    const nextButton = carousel.querySelector("[data-facility-next]");
    const currentNumber = carousel.querySelector("[data-facility-current]");
    const dotList = carousel.querySelector("[data-facility-dots]");

    if (!slides.length || !previousButton || !nextButton || !currentNumber || !dotList) return;

    carousel.dataset.carouselReady = "true";
    let activeIndex = 0;
    let touchStartX = null;

    const dots = slides.map(function (_, index) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "facility-carousel-dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", String(index + 1) + "번째 시설 보기");
      dot.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      dot.addEventListener("click", function () {
        showSlide(index);
      });
      dotList.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      const nextIndex = (index + slides.length) % slides.length;
      if (nextIndex === activeIndex) return;

      slides[activeIndex].classList.remove("is-active");
      slides[activeIndex].setAttribute("aria-hidden", "true");
      dots[activeIndex].classList.remove("is-active");
      dots[activeIndex].setAttribute("aria-pressed", "false");

      activeIndex = nextIndex;
      slides[activeIndex].classList.add("is-active");
      slides[activeIndex].setAttribute("aria-hidden", "false");
      dots[activeIndex].classList.add("is-active");
      dots[activeIndex].setAttribute("aria-pressed", "true");
      currentNumber.textContent = String(activeIndex + 1).padStart(2, "0");
    }

    previousButton.addEventListener("click", function () {
      showSlide(activeIndex - 1);
    });

    nextButton.addEventListener("click", function () {
      showSlide(activeIndex + 1);
    });

    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(activeIndex + 1);
      }
    });

    carousel.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", function (event) {
      if (touchStartX === null) return;

      const distance = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 50) return;

      showSlide(activeIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });
  }

  ctaLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      console.log("CTA clicked:", link.dataset.cta, link.getAttribute("href"));
    });
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  applyEditableContentWhenReady(0);
  initExteriorSlideshow();
  initFacilityCarousel();
  setHeaderState();
})();
