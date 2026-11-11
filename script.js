/* ==========================================================================
   Balaji Textiles — Simple behaviour (classic 2018–2020 style)
   ========================================================================== */

(function () {
  "use strict";

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Simple mobile navigation toggle (kept minimal for classic style)
  var nav = document.querySelector(".main-nav");
  if (nav) {
    var toggle = document.createElement("button");
    toggle.textContent = "\u2630"; // hamburger
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation");
    toggle.setAttribute("aria-expanded", "false");

    var header = document.querySelector(".site-header");
    if (header) {
      header.appendChild(toggle);

      var open = false;
      toggle.addEventListener("click", function () {
        open = !open;
        toggle.setAttribute("aria-expanded", open);
        nav.style.display = open ? "block" : "";
      });

      // Hide toggle on desktop via CSS media query handles it; keep simple
    }
  }
})();
