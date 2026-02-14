/**
 * Component Initializer - Lightweight initialization for static components
 * Handles: Theme switching, Mobile menu, Back-to-top, Active nav, Footer year
 * Optimized for performance and accessibility
 */

(function () {
  "use strict";

  /**
   * Initialize components that are already in the DOM
   * Runs after DOM is fully loaded
   */
  function initializeComponents() {
    // Set current year dynamically in footer
    if (
      window.updateCurrentYear &&
      typeof window.updateCurrentYear === "function"
    ) {
      window.updateCurrentYear();
    }

    // Setup header offset for scroll calculations
    if (
      window.setHeaderOffsetCssVar &&
      typeof window.setHeaderOffsetCssVar === "function"
    ) {
      window.setHeaderOffsetCssVar();
    }

    // Initialize loading indicator
    if (window.initLoader && typeof window.initLoader === "function") {
      window.initLoader();
    }

    // Initialize navigation active state tracking
    if (window.initActiveNav && typeof window.initActiveNav === "function") {
      window.initActiveNav();
    }

    // Initialize mobile menu
    if (window.initMobileMenu && typeof window.initMobileMenu === "function") {
      window.initMobileMenu();
    }

    // Initialize back-to-top button
    if (window.initBackToTop && typeof window.initBackToTop === "function") {
      window.initBackToTop();
    }

    // Initialize form validation
    if (
      window.initFormValidation &&
      typeof window.initFormValidation === "function"
    ) {
      window.initFormValidation();
    }

    // Mark app as loaded and hide loading indicator
    document.documentElement.setAttribute("data-app-loaded", "true");
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeComponents);
  } else {
    // DOM already loaded (e.g., deferred script execution)
    initializeComponents();
  }
})();
