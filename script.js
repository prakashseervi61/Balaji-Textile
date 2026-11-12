/* ==========================================================================
   Balaji Textiles — JavaScript
   Classic 2018–2020 style
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Global error handler ----------
  window.addEventListener("error", function (event) {
    // Log errors for debugging (remove in production if needed)
    if (event.error) {
      console.error("Error:", event.error.message);
    }
  });

  window.addEventListener("unhandledrejection", function (event) {
    console.error("Unhandled promise rejection:", event.reason);
  });

  // ---------- Open/Closed Badge ----------
  // Static display - no dynamic badge
  var contactHours = document.getElementById('contact-hours');
  if (contactHours) {
    contactHours.textContent = '8:00 AM \u2013 9:00 PM daily';
  }

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

  // ---------- Lightbox ----------
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var galleryItems = document.querySelectorAll(".gallery-item img");
  var galleryImages = [];
  var currentImageIndex = 0;
  var previousFocus = null;

  galleryItems.forEach(function (img, index) {
    galleryImages.push({ src: img.src, alt: img.alt });
    img.parentElement.addEventListener("click", function () {
      openLightbox(index);
    });
    img.parentElement.setAttribute("tabindex", "0");
    img.parentElement.setAttribute("role", "button");
    img.parentElement.setAttribute("aria-label", "View image: " + img.alt);
    img.parentElement.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    previousFocus = document.activeElement;
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute("hidden", "");
    document.body.style.overflow = "";
    if (previousFocus) previousFocus.focus();
  }

  function showPrevImage() {
    if (galleryImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  function showNextImage() {
    if (galleryImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPrevImage);
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", showNextImage);
  }

  if (lightbox) {
    document.addEventListener("keydown", function (e) {
      if (lightbox.hasAttribute("hidden")) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
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
