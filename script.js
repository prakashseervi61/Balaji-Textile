/* ==========================================================================
   Balaji Textiles — JavaScript
   Classic 2018–2020 style
   ========================================================================== */

(function () {
  "use strict";

  // ---------- CONFIG ----------
  var CONFIG = {
    OPEN_HOUR: 8,
    CLOSE_HOUR: 21,
    TZ: 'Asia/Kolkata'
  };

  // ---------- Open/Closed Badge ----------
  function getISTTime() {
    var now = new Date();
    var formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: CONFIG.TZ,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    var parts = formatter.formatToParts(now);
    var hour = 0, minute = 0;
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === 'hour') hour = parseInt(parts[i].value);
      if (parts[i].type === 'minute') minute = parseInt(parts[i].value);
    }
    return { hour: hour, minute: minute };
  }

  function isOpenNow() {
    var t = getISTTime();
    var currentMinutes = t.hour * 60 + t.minute;
    var openMinutes = CONFIG.OPEN_HOUR * 60;
    var closeMinutes = CONFIG.CLOSE_HOUR * 60;
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  function updateStatusBadge() {
    var open = isOpenNow();
    var badge = document.getElementById('status-badge');
    var contactStatus = document.getElementById('contact-status');
    var contactHours = document.getElementById('contact-hours');

    var badgeText = open
      ? 'Open now \u00B7 closes 9:00 PM'
      : 'Closed \u00B7 opens 8:00 AM';

    var badgeClass = open ? 'status-badge open' : 'status-badge closed';

    if (badge) {
      badge.textContent = badgeText;
      badge.className = badgeClass;
    }
    if (contactStatus) {
      contactStatus.textContent = badgeText;
    }
    if (contactHours) {
      contactHours.textContent = '8:00 AM \u2013 9:00 PM daily';
    }
  }

  // Update on load and every 60 seconds
  updateStatusBadge();
  setInterval(updateStatusBadge, 60000);

  // ---------- Header shadow on scroll ----------
  var header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // ---------- Mobile navigation toggle ----------
  var nav = document.getElementById("main-nav");
  var toggle = document.getElementById("nav-toggle");

  if (nav && toggle) {
    var overlay = document.querySelector(".nav-overlay");

    function openMenu() {
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      if (overlay) overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (overlay) overlay.classList.remove("is-open");
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

    // Click overlay to close
    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    // Escape key closes menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // ---------- Product filter tabs ----------
  var tabBtns = document.querySelectorAll(".tab-btn");
  var productGroups = document.querySelectorAll(".product-group");

  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      // Update active tab
      tabBtns.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      // Show/hide groups
      productGroups.forEach(function (group) {
        var cat = group.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          group.style.display = "";
        } else {
          group.style.display = "none";
        }
      });
    });
  });

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
