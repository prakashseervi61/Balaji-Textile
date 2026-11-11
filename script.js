/* ==========================================================================
   Balaji Textiles — JavaScript
   Classic 2018–2020 style
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Header shadow on scroll ----------
  var header = document.getElementById("site-header");
  if (header) {
    var lastScroll = 0;
    window.addEventListener("scroll", function () {
      var scrollY = window.scrollY;
      if (scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ---------- Mobile navigation toggle (slide from right) ----------
  var nav = document.getElementById("main-nav");
  var toggle = document.getElementById("nav-toggle");

  if (nav && toggle) {
    function openMenu() {
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu on link click
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    // Close menu via close button inside nav
    var closeBtn = nav.querySelector(".nav-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    // Escape key closes menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // ---------- Scroll reveal ----------
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ---------- Respect reduced motion ----------
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
