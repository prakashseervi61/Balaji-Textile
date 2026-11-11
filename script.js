/* ==========================================================================
   Balaji Textiles — Simple behaviour (classic 2018–2020 style)
   Responsive mobile navigation + smooth scrolling
   ========================================================================== */

(function () {
  "use strict";

  // -------- Smooth scrolling for anchor links --------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");
      if (targetId && targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // -------- Mobile navigation toggle (hamburger) --------
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".main-nav");

  if (header && nav) {
    // Create toggle button
    var toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "\u2630"; // hamburger icon

    header.appendChild(toggle);

    var isOpen = false;

    function closeMenu() {
      isOpen = false;
      toggle.setAttribute("aria-expanded", "false");
      nav.style.display = "";
    }

    toggle.addEventListener("click", function () {
      isOpen = !isOpen;
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      nav.style.display = isOpen ? "block" : "";
    });

    // Close mobile menu when a nav link is clicked
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Re-open desktop nav on resize if window becomes large
    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) {
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
    if (window.innerWidth > 767) {
      toggle.style.display = "none";
      nav.style.display = "";
    } else {
      toggle.style.display = "inline-block";
      nav.style.display = "none";
    }
  }
})();
