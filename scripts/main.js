(function () {
  if ("IntersectionObserver" in globalThis) {
    const lazyImages = document.querySelectorAll(".lazy-image[data-src]");
    if (lazyImages.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const src = img.getAttribute("data-src");
              if (src) {
                img.src = src;
                img.removeAttribute("data-src");
                img.classList.add("lazy-loaded");
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: "50px", threshold: 0.01 },
      );
      lazyImages.forEach((img) => observer.observe(img));
    }
  } else {
    const fallbackImages = document.querySelectorAll(".lazy-image[data-src]");
    fallbackImages.forEach((img) => {
      if (img.getAttribute("data-src")) {
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      }
    });
  }
})();
(function () {
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", (event) => {
      const target = document.querySelector(skipLink.getAttribute("href"));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
      }
    });
  }
})();
(function () {
  const root = document.documentElement;
  const storageKey = "preferred-theme";
  const accentStorageKey = "preferred-accent";
  const themes = ["light", "dark", "system"];
  const accents = ["orange", "neon"];
  let fadeTimer = 0;

  // Export for component loader
  window.initThemeSwitcher = function initThemeSwitcher() {
    function runFade() {
      const prefersReduced = globalThis.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      )?.matches;
      if (prefersReduced) return;
      if (fadeTimer) globalThis.clearTimeout(fadeTimer);
      root.dataset.themeFade = "1";
      globalThis.requestAnimationFrame(() => {
        root.dataset.themeFade = "2";
        fadeTimer = globalThis.setTimeout(() => {
          delete root.dataset.themeFade;
          fadeTimer = 0;
        }, 220);
      });
    }
    function getStoredTheme() {
      return localStorage.getItem(storageKey) || "system";
    }
    function setTheme(theme) {
      if (!themes.includes(theme)) return;
      if (root.dataset.theme === theme) return;
      root.dataset.theme = theme;
      document.querySelectorAll("[data-theme-option]").forEach((btn) => {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-theme-option") === theme ? "true" : "false",
        );
      });
      localStorage.setItem(storageKey, theme);
      runFade();
    }
    function getStoredAccent() {
      return (
        localStorage.getItem(accentStorageKey) ||
        root.dataset.accent ||
        "orange"
      );
    }
    function setAccent(accent) {
      if (!accents.includes(accent)) return;
      if (root.dataset.accent === accent) return;
      root.dataset.accent = accent;
      document.querySelectorAll("[data-accent-option]").forEach((btn) => {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-accent-option") === accent ? "true" : "false",
        );
      });
      localStorage.setItem(accentStorageKey, accent);
      runFade();
    }
    setTheme(getStoredTheme());
    setAccent(getStoredAccent());
    document.addEventListener("click", (event) => {
      const themeBtn = event.target.closest("[data-theme-option]");
      if (themeBtn) {
        setTheme(themeBtn.getAttribute("data-theme-option"));
        return;
      }
      const accentBtn = event.target.closest("[data-accent-option]");
      if (accentBtn) {
        setAccent(accentBtn.getAttribute("data-accent-option"));
      }
    });
  };

  // Auto-initialize if theme buttons exist on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.querySelector("[data-theme-option]")) {
        window.initThemeSwitcher();
      }
    });
  } else {
    if (document.querySelector("[data-theme-option]")) {
      window.initThemeSwitcher();
    }
  }
})();
(function () {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const statusEl = form.querySelector("[data-form-status]");
  const submitBtn = form.querySelector('button[type="submit"]');
  const publicKey = "8mGUhqGd1FiBHRw-g";
  const serviceId = "service_ac324gx";
  const templateId = "template_pl3hp25";
  function setStatus(message) {
    if (!statusEl) return;
    statusEl.textContent = message;
  }
  function setBusy(isBusy) {
    if (submitBtn) submitBtn.disabled = isBusy;
  }
  if (!window.emailjs) {
    setStatus("Email service failed to load. Please try again later.");
    return;
  }
  window.emailjs.init({ publicKey });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setBusy(true);
    setStatus("Sending…");
    try {
      await window.emailjs.sendForm(serviceId, templateId, form);
      setStatus("Message sent successfully.");
      window.alert("Thanks — your message has been sent.");
      form.reset();
    } catch (err) {
      setStatus("Failed to send. Please try again.");
      window.alert("Sorry — your message could not be sent. Please try again.");
    } finally {
      setBusy(false);
    }
  });
})();
window.updateCurrentYear = function updateCurrentYear() {
  const yearEl = document.getElementById("currentyear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
};
window.setHeaderOffsetCssVar = function setHeaderOffsetCssVar() {
  const header = document.querySelector(".site-header");
  if (!header) return 0;
  const height = Math.ceil(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--header-offset", `${height}px`);
  return height;
};
window.initLoader = function initLoader() {
  const browser = globalThis;
  const hide = () => {
    document.documentElement.dataset.appLoaded = "true";
    const loader = document.querySelector("[data-app-loader]");
    if (loader) loader.remove();
  };
  if (document.readyState === "complete") {
    hide();
    return;
  }
  browser.addEventListener(
    "load",
    () => {
      hide();
    },
    { once: true },
  );
};
window.initActiveNav = function initActiveNav() {
  const browser = globalThis;
  const normalizePath = (path) =>
    path.endsWith("/") ? `${path}index.html` : path;
  const isSamePage = (url) =>
    normalizePath(url.pathname) === normalizePath(browser.location.pathname);
  const isHomePage =
    normalizePath(browser.location.pathname) === normalizePath("/index.html");
  const isBlogPage =
    browser.location.pathname.includes("/blog/") ||
    normalizePath(browser.location.pathname) === normalizePath("/blog.html");
  const adjustHashLinksForPage = () => {
    const basePath = browser.location.pathname.includes("/blog/")
      ? "../"
      : "./";
    const indexPrefix = `${basePath}index.html`;
    document
      .querySelectorAll('.site-nav a[href^="#"], .mobile-menu-link[href^="#"]')
      .forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        link.setAttribute("href", isHomePage ? href : `${indexPrefix}${href}`);
      });
  };
  const setBlogActive = () => {
    const blogLink = document.querySelector(
      '.site-nav a[href*="blog.html"], .site-nav a[href*="/blog/"]',
    );
    if (blogLink && isBlogPage) {
      blogLink.setAttribute("aria-current", "page");
    }
  };
  const getHashId = (href) => {
    if (!href) return null;
    try {
      const url = new URL(href, browser.location.href);
      if (!isSamePage(url) || !url.hash) return null;
      return decodeURIComponent(url.hash.slice(1));
    } catch {
      if (!href.startsWith("#")) return null;
      return decodeURIComponent(href.slice(1));
    }
  };
  adjustHashLinksForPage();
  setBlogActive();
  const navLinks = Array.from(
    document.querySelectorAll('.site-nav a[href*="#"]'),
  );
  if (navLinks.length === 0) return;
  const idToLink = new Map();
  const sections = [];
  for (const link of navLinks) {
    const href = link.getAttribute("href");
    const id = getHashId(href);
    if (!id) continue;
    const section = document.getElementById(id);
    if (!section) continue;
    idToLink.set(id, link);
    sections.push(section);
  }
  sections.sort((a, b) => a.offsetTop - b.offsetTop);
  let rafId = 0;
  let pendingId = null;
  let pendingUntil = 0;
  let settleTimer = 0;
  const getHeaderOffset = () =>
    Number.parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--header-offset")
        .trim(),
      10,
    ) || 0;
  const isPendingTargetReached = () => {
    if (!pendingId) return true;
    const headerOffset = getHeaderOffset();
    const target = document.getElementById(pendingId);
    if (!target) return true;
    const top = target.getBoundingClientRect().top;
    return top <= headerOffset + 2;
  };
  const setPending = (id) => {
    pendingId = id;
    pendingUntil = Date.now() + 4000;
    window.setHeaderOffsetCssVar();
    setActive(id);
    schedulePick();
  };
  const schedulePick = () => {
    if (rafId) return;
    rafId = browser.requestAnimationFrame(() => {
      rafId = 0;
      pickByScrollPosition();
    });
  };
  const setActive = (activeId) => {
    for (const [id, link] of idToLink.entries()) {
      if (id === activeId) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
  };
  const pickByScrollPosition = () => {
    const headerOffset = getHeaderOffset();
    const y = browser.scrollY + headerOffset + 1;
    if (pendingId && Date.now() < pendingUntil) {
      if (!isPendingTargetReached()) {
        setActive(pendingId);
        return;
      }
      pendingId = null;
    } else {
      pendingId = null;
    }
    let currentId = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= y) currentId = section.id;
      else break;
    }
    if (currentId) setActive(currentId);
  };
  const initialHash = browser.location.hash?.slice(1);
  if (initialHash && idToLink.has(initialHash)) {
    setPending(initialHash);
  } else {
    pickByScrollPosition();
  }
  const fonts = document.fonts;
  if (fonts && typeof fonts.ready?.then === "function") {
    fonts.ready
      .then(() => {
        window.setHeaderOffsetCssVar();
        schedulePick();
      })
      .catch(() => {});
  }
  browser.addEventListener(
    "resize",
    () => {
      window.setHeaderOffsetCssVar();
      schedulePick();
    },
    { passive: true },
  );
  browser.addEventListener(
    "scroll",
    () => {
      schedulePick();
      if (pendingId) {
        if (settleTimer) browser.clearTimeout(settleTimer);
        settleTimer = browser.setTimeout(() => {
          if (isPendingTargetReached()) pendingId = null;
          schedulePick();
        }, 140);
      }
    },
    { passive: true },
  );
  browser.addEventListener(
    "hashchange",
    () => {
      const id = browser.location.hash?.slice(1);
      if (id && idToLink.has(id)) setPending(id);
      else schedulePick();
    },
    { passive: true },
  );
  for (const [id, link] of idToLink.entries()) {
    link.addEventListener(
      "click",
      () => {
        setPending(id);
      },
      { passive: true },
    );
  }
};
window.initMobileMenu = function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  const body = document.body;
  const normalizePath = (path) =>
    path.endsWith("/") ? `${path}index.html` : path;
  const isSamePage = (url) =>
    normalizePath(url.pathname) === normalizePath(window.location.pathname);
  const getSamePageHash = (href) => {
    if (!href) return null;
    try {
      const url = new URL(href, window.location.href);
      if (!isSamePage(url) || !url.hash) return null;
      return url.hash;
    } catch {
      if (!href.startsWith("#")) return null;
      return href;
    }
  };

  if (!mobileMenuBtn || !mobileMenuOverlay) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    mobileMenuOverlay.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
    updateActiveLink();
  }

  function closeMenu() {
    isOpen = false;
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuOverlay.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }

  function updateActiveLink() {
    const currentSection = document.querySelector(
      '.site-nav a[aria-current="page"]',
    );
    if (!currentSection) return;

    const currentHref = currentSection.getAttribute("href");
    mobileMenuLinks.forEach((link) => {
      if (link.getAttribute("href") === currentHref) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  mobileMenuBtn.addEventListener("click", () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button in mobile menu
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMenu);
  }

  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMenu();
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const samePageHash = getSamePageHash(href);

      // If it's not a same-page hash, let it navigate normally
      if (!samePageHash) {
        return;
      }

      e.preventDefault();
      closeMenu();

      // Smooth scroll to section
      const targetId = samePageHash.slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update URL hash
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, samePageHash);
          } else {
            window.location.hash = samePageHash;
          }
        }, 100);
      }
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
    }
  });

  // Update active link when scrolling
  window.addEventListener(
    "scroll",
    () => {
      if (isOpen) {
        updateActiveLink();
      }
    },
    { passive: true },
  );
};
(function () {
  const emailSenderId = "service_default";
  const templateId = "template_default";
  const userId = "user_default";
  let emailJsReady = false;
  if (typeof emailjs !== "undefined") {
    emailjs.init(userId);
    emailJsReady = true;
  }
  function displayError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`${inputId}-error`);
    if (!input || !errorSpan) return;
    if (message) {
      input.classList.add("is-invalid");
      errorSpan.textContent = message;
      errorSpan.setAttribute("aria-live", "polite");
    } else {
      input.classList.remove("is-invalid");
      errorSpan.textContent = "";
    }
  }
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return re.test(email);
  }
  function validateField(fieldId, value, type) {
    if (!value?.trim()) {
      displayError(fieldId, "This field is required");
      return false;
    }
    if (type === "email" && !validateEmail(value)) {
      displayError(fieldId, "Please enter a valid email address");
      return false;
    }
    if (type === "text" && value.length < 2) {
      displayError(fieldId, "Please enter at least 2 characters");
      return false;
    }
    if (type === "textarea" && value.trim().length < 10) {
      displayError(
        fieldId,
        "Please enter at least 10 characters in your message",
      );
      return false;
    }
    displayError(fieldId, "");
    return true;
  }
  function addFieldValidation(fieldId, type) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    input.addEventListener("blur", () => {
      validateField(fieldId, input.value, type);
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) {
        validateField(fieldId, input.value, type);
      }
    });
  }
  window.initFormValidation = function () {
    addFieldValidation("contact-name", "text");
    addFieldValidation("contact-email", "email");
    addFieldValidation("contact-message", "textarea");
  };
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const messageInput = document.getElementById("contact-message");
      const honeypotInput = contactForm.querySelector('input[name="website"]');
      const statusOutput = document.querySelector("[data-form-status]");
      if (!nameInput || !emailInput || !messageInput || !statusOutput) return;
      const isNameValid = validateField(
        "contact-name",
        nameInput.value,
        "text",
      );
      const isEmailValid = validateField(
        "contact-email",
        emailInput.value,
        "email",
      );
      const isMessageValid = validateField(
        "contact-message",
        messageInput.value,
        "textarea",
      );
      if (!isNameValid || !isEmailValid || !isMessageValid) {
        statusOutput.textContent = "Please fix the errors above";
        statusOutput.style.color = "var(--color-red-500, #dc2626)";
        return;
      }
      if (honeypotInput?.value?.trim()) {
        statusOutput.textContent = "Form submission blocked. Please try again.";
        contactForm.reset();
        return;
      }
      statusOutput.textContent = "Sending...";
      statusOutput.style.color = "var(--color-text-muted)";
      if (!emailJsReady) {
        statusOutput.textContent =
          "Email service not configured. Please contact directly.";
        statusOutput.style.color = "var(--color-orange-500, #ff8c42)";
        return;
      }
      try {
        await emailjs.send(
          emailSenderId,
          templateId,
          {
            from_name: nameInput.value,
            reply_to: emailInput.value,
            message: messageInput.value,
            to_email: "suprabhatkumar02@gmail.com",
          },
          userId,
        );
        statusOutput.textContent =
          "✓ Message sent successfully! I'll get back to you soon.";
        statusOutput.style.color = "var(--color-green-500, #16a34a)";
        contactForm.reset();
        const inputs = contactForm.querySelectorAll(
          'input[type="text"], input[type="email"], textarea',
        );
        inputs.forEach((input) => {
          input.classList.remove("is-invalid");
          const errorSpan = document.getElementById(`${input.id}-error`);
          if (errorSpan) errorSpan.textContent = "";
        });
        setTimeout(() => {
          statusOutput.textContent = "";
        }, 5000);
      } catch (error) {
        console.error("EmailJS error:", error);
        statusOutput.textContent = "✗ Failed to send message. Try again.";
        statusOutput.style.color = "var(--color-red-500, #dc2626)";
      }
    });
  }
})();

// Back-to-top initialization - export for component loader
window.initBackToTop = function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (!backToTopBtn) return;
  function handleScroll() {
    if (window.scrollY > 50) {
      backToTopBtn.hidden = false;
    } else {
      backToTopBtn.hidden = true;
    }
  }
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
};
