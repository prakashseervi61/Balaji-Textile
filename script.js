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
    // Create overlay backdrop
    var overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    function openMenu() {
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-open");
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
    overlay.addEventListener("click", closeMenu);

    // Escape key closes menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // ---------- Active nav highlighting (scroll-spy) ----------
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  var sections = [];

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      var section = document.querySelector(href);
      if (section) sections.push({ link: link, section: section });
    }
  });

  var scrollSpyTicking = false;
  function updateActiveLink() {
    var scrollY = window.scrollY + (header ? header.offsetHeight + 20 : 120);
    var current = sections.length ? sections[0] : null;
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
    scrollSpyTicking = false;
  }

  window.addEventListener("scroll", function () {
    if (!scrollSpyTicking) {
      requestAnimationFrame(updateActiveLink);
      scrollSpyTicking = true;
    }
  }, { passive: true });
  updateActiveLink();

  // ---------- Back to top button ----------
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

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
    // Keyboard support
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

  // Focus trap for lightbox
  if (lightbox) {
    lightbox.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = lightbox.querySelectorAll("button, img");
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
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

  // Lightbox keyboard navigation (document-level for reliability)
  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.hasAttribute("hidden")) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  });

    // Click outside image to close
    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

  // ---------- Image error fallback ----------
  document.querySelectorAll(".product-img-wrap img").forEach(function (img) {
    img.addEventListener("error", function () {
      this.classList.add("img-error");
      var fallback = this.parentElement.querySelector(".img-fallback");
      if (fallback) {
        fallback.style.display = "flex";
      }
    });
    // Check if already broken (cached)
    if (img.complete && img.naturalWidth === 0) {
      img.classList.add("img-error");
      var fallback = img.parentElement.querySelector(".img-fallback");
      if (fallback) {
        fallback.style.display = "flex";
      }
    }
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
    // Fallback: show all content
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
