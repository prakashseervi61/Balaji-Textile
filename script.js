/* ==========================================================================
   Balaji Textiles — Frontend behaviour
   ========================================================================== */

(function () {
  "use strict";

  // -------- Set current year in footer --------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -------- Mobile menu toggle --------
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileBtn && mobileMenu) {
    let isOpen = false;

    mobileBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      mobileBtn.setAttribute("aria-expanded", isOpen);
      mobileMenu.classList.toggle("open");
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        isOpen = false;
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // -------- Smooth scrolling for anchor links --------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // -------- Lazy load placeholder images with fade-in --------
  const images = document.querySelectorAll("img[loading='lazy']");
  const observerOptions = { root: null, rootMargin: "200px 0px", threshold: 0.01 };

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  }, observerOptions);

  images.forEach((img) => imageObserver.observe(img));

  // -------- Header scroll effect (subtle) --------
  const header = document.getElementById("site-header");
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = "0 4px 20px rgba(114, 47, 55, 0.1)";
      } else {
        header.style.boxShadow = "none";
      }
    },
    { passive: true }
  );
})();
