/* ==========================================================================
   Balaji Textiles — Navigation & Smooth Scrolling
   Classic 2018–2020 style
   ========================================================================== */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".main-nav");
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  var sections = [];

  // Collect sections for active highlighting
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var section = document.querySelector(id);
      if (section) sections.push({ link: link, section: section, id: id });
    }
  });

  // -------- Smooth scrolling for anchor links --------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");
      if (targetId && targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // -------- Active navigation highlighting on scroll --------
  function updateActiveLink() {
    var scrollY = window.scrollY + 120;
    var current = null;
    sections.forEach(function (item) {
      if (item.section.offsetTop <= scrollY) {
        current = item;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });
    if (current) {
      current.link.classList.add("active");
      current.link.setAttribute("aria-current", "true");
    }
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  // -------- Mobile navigation toggle (hamburger) --------
  if (header && nav) {
    var toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "main-nav");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.innerHTML = "\u2630"; // hamburger icon

    header.appendChild(toggle);

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      toggle.setAttribute("aria-expanded", "true");
      nav.style.display = "block";
      // Focus first link
      var firstLink = nav.querySelector("a");
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      isOpen = false;
      toggle.setAttribute("aria-expanded", "false");
      if (window.innerWidth <= 767.98) {
        nav.style.display = "none";
      } else {
        nav.style.display = "";
      }
    }

    toggle.addEventListener("click", function () {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Keyboard: Enter/Space to toggle
    toggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isOpen) closeMenu(); else openMenu();
      }
    });

    // Close mobile menu when a nav link is clicked
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 767.98) {
          closeMenu();
        }
      });
    });

    // Escape key closes menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
        toggle.focus();
      }
    });

    // Re-open desktop nav on resize if window becomes large
    window.addEventListener("resize", function () {
      if (window.innerWidth > 767.98) {
        nav.style.display = "";
        toggle.style.display = "none";
        isOpen = false;
        toggle.setAttribute("aria-expanded", "false");
      } else {
        toggle.style.display = "inline-block";
        if (!isOpen) {
          nav.style.display = "none";
        }
      }
    });

    // Initialize correct state on load
    if (window.innerWidth > 767.98) {
      toggle.style.display = "none";
      nav.style.display = "";
    } else {
      toggle.style.display = "inline-block";
      nav.style.display = "none";
    }
  }
})();
