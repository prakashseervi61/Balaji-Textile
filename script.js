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

    // Keep sticky offsets aligned with the real rendered header height.
    function syncHeaderHeight() {
      document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");
    }
    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
    window.addEventListener("load", syncHeaderHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncHeaderHeight);
    }
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

  // ---------- Product catalogue: tabs, search, deep links ----------
  var tabBtns = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var productGroups = Array.prototype.slice.call(document.querySelectorAll(".product-group"));
  var productSearch = document.getElementById("product-search");
  var resultsCount = document.getElementById("results-count");
  var emptyState = document.getElementById("products-empty");
  var emptyLink = document.getElementById("products-empty-link");
  var tabStrip = document.getElementById("product-tabs");
  var tabsWrap = tabStrip ? tabStrip.parentElement : null;
  var currentFilter = "all";
  var VALID_FILTERS = ["all", "men", "women", "kids", "tailoring"];

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function updateTabFades() {
    if (!tabStrip || !tabsWrap) return;
    var maxScroll = tabStrip.scrollWidth - tabStrip.clientWidth;
    tabsWrap.classList.toggle("is-scrollable-left", tabStrip.scrollLeft > 2);
    tabsWrap.classList.toggle("is-scrollable-right", tabStrip.scrollLeft < maxScroll - 2);
  }

  if (tabBtns.length > 0) {
    // Counts are derived from the pills that actually exist, never hardcoded.
    tabBtns.forEach(function (btn) {
      var filter = btn.getAttribute("data-filter");
      var count;

      if (filter === "all") {
        count = document.querySelectorAll(".pill").length;
      } else {
        var group = document.querySelector('.product-group[data-category="' + filter + '"]');
        count = group ? group.querySelectorAll(".pill").length : 0;
      }

      var countEl = btn.querySelector(".count");
      if (countEl) countEl.textContent = "(" + count + ")";
    });

    function setEmptyLink(query) {
      if (!emptyLink) return;
      var message = query
        ? "Hi Balaji Textiles, I'm looking for: " + query
        : "Hello Balaji Textiles, I would like to know more about your collections.";
      emptyLink.href = "https://wa.me/919894535066?text=" + encodeURIComponent(message);
    }

    function applyFilters() {
      var rawQuery = productSearch ? productSearch.value.trim() : "";
      var query = rawQuery.toLowerCase();
      var total = 0;

      productGroups.forEach(function (group) {
        var category = group.getAttribute("data-category");
        var categoryMatches = currentFilter === "all" || category === currentFilter;
        var visibleInGroup = 0;

        group.querySelectorAll(".pill").forEach(function (pill) {
          var matches = categoryMatches &&
            (!query || pill.textContent.toLowerCase().indexOf(query) !== -1);
          pill.hidden = !matches;
          if (matches) visibleInGroup++;
        });

        var groupCount = group.querySelector(".group-count");
        if (groupCount) {
          groupCount.textContent = visibleInGroup + (visibleInGroup === 1 ? " item" : " items");
        }

        group.hidden = visibleInGroup === 0;
        total += visibleInGroup;
      });

      if (resultsCount) {
        resultsCount.textContent = total === 1 ? "Showing 1 item" : "Showing " + total + " items";
      }

      if (emptyState) emptyState.hidden = total !== 0;
      setEmptyLink(rawQuery);
    }

    function centerTab(btn) {
      if (!tabStrip || !btn) return;

      var stripRect = tabStrip.getBoundingClientRect();
      var btnRect = btn.getBoundingClientRect();
      var left = tabStrip.scrollLeft + (btnRect.left - stripRect.left) -
        (tabStrip.clientWidth - btnRect.width) / 2;
      var behavior = prefersReducedMotion() ? "auto" : "smooth";

      if (typeof tabStrip.scrollTo === "function") {
        tabStrip.scrollTo({ left: Math.max(0, left), behavior: behavior });
      } else {
        tabStrip.scrollLeft = Math.max(0, left);
      }
    }

    function setFilter(filter, options) {
      var settings = options || {};
      if (VALID_FILTERS.indexOf(filter) === -1) filter = "all";

      currentFilter = filter;
      var activeBtn = null;

      tabBtns.forEach(function (btn) {
        var isActive = btn.getAttribute("data-filter") === filter;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        if (isActive) activeBtn = btn;
      });

      if (settings.updateHash) {
        var hash = "#" + filter;
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", hash);
        } else {
          window.location.hash = hash;
        }
      }

      applyFilters();

      if (activeBtn) centerTab(activeBtn);
    }

    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setFilter(btn.getAttribute("data-filter"), { updateHash: true });
      });
    });

    if (productSearch) {
      productSearch.addEventListener("input", applyFilters);
    }

    function filterFromHash() {
      var hash = window.location.hash.replace("#", "");
      return VALID_FILTERS.indexOf(hash) !== -1 ? hash : "all";
    }

    window.addEventListener("hashchange", function () {
      setFilter(filterFromHash(), { updateHash: false });
    });

    if (tabStrip) {
      tabStrip.addEventListener("scroll", updateTabFades, { passive: true });
    }
    window.addEventListener("resize", updateTabFades);
    window.addEventListener("load", updateTabFades);

    setFilter(filterFromHash(), { updateHash: false });
    updateTabFades();
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
