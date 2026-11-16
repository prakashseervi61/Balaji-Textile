/* ==========================================================================
   Balaji Textiles — JavaScript
   Nav drawer, shop status, catalogue filters/search/deep links, scroll reveal
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Open/Closed badge (Asia/Kolkata) ----------
  var SHOP_CONFIG = {
    OPEN_HOUR: 8,
    CLOSE_HOUR: 21,
    OPEN_LABEL: "8:00 AM",
    CLOSE_LABEL: "9:00 PM",
    TIME_ZONE: "Asia/Kolkata"
  };

  var shopStatus = document.getElementById("shop-status");
  if (shopStatus) {
    var shopStatusText = shopStatus.querySelector(".status-text");
    var shopTimeFormat = null;
    var lastOpenState = null;

    try {
      shopTimeFormat = new Intl.DateTimeFormat("en-GB", {
        timeZone: SHOP_CONFIG.TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      });
    } catch (error) {
      shopTimeFormat = null;
    }

    function istMinutesNow() {
      var now = new Date();

      if (shopTimeFormat && typeof shopTimeFormat.formatToParts === "function") {
        var hour = 0;
        var minute = 0;
        shopTimeFormat.formatToParts(now).forEach(function (part) {
          if (part.type === "hour") hour = parseInt(part.value, 10);
          if (part.type === "minute") minute = parseInt(part.value, 10);
        });
        if (!isNaN(hour) && !isNaN(minute)) {
          return hour * 60 + minute;
        }
      }

      // Fallback: IST is UTC+05:30 all year, with no daylight saving.
      var utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
      return (utcMinutes + 330) % 1440;
    }

    function updateShopStatus() {
      var minutes = istMinutesNow();
      var opens = SHOP_CONFIG.OPEN_HOUR * 60;
      var closes = SHOP_CONFIG.CLOSE_HOUR * 60;
      var isOpen = minutes >= opens && minutes < closes;

      // Only touch the DOM when the state actually flips.
      if (isOpen === lastOpenState) return;
      lastOpenState = isOpen;

      shopStatus.classList.toggle("is-open", isOpen);
      shopStatus.classList.toggle("is-closed", !isOpen);

      if (shopStatusText) {
        shopStatusText.textContent = isOpen
          ? "Open now \u00b7 until " + SHOP_CONFIG.CLOSE_LABEL
          : "Closed \u00b7 opens " + SHOP_CONFIG.OPEN_LABEL;
      }
    }

    updateShopStatus();
    window.setInterval(updateShopStatus, 60000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) updateShopStatus();
    });
  }

  // ---------- Header shadow on scroll ----------
  var header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
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
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a[href]"));
    var lastFocused = null;

    function openMenu() {
      lastFocused = document.activeElement;
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      if (overlay) overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      if (navLinks.length) navLinks[0].focus();
    }

    function closeMenu(restoreFocus) {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (overlay) overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      if (restoreFocus !== false && lastFocused && document.contains(lastFocused)) {
        lastFocused.focus();
      }
      lastFocused = null;
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu on link click
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    // Click overlay to close
    if (overlay) {
      overlay.addEventListener("click", function () {
        closeMenu();
      });
    }

    // Escape closes and Tab is trapped inside the open drawer
    document.addEventListener("keydown", function (e) {
      if (!nav.classList.contains("is-open")) return;

      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab" || navLinks.length === 0) return;

      var first = navLinks[0];
      var last = navLinks[navLinks.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // ---------- Product catalogue: tabs, search, deep links ----------
  var tabBtns = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var productCards = Array.prototype.slice.call(document.querySelectorAll(".product-card"));
  var catalogueCards = productCards.filter(function (card) {
    return !card.hasAttribute("data-cta");
  });
  var productSearch = document.getElementById("product-search");
  var searchClear = document.getElementById("search-clear");
  var resultsCount = document.getElementById("results-count");
  var emptyState = document.getElementById("products-empty");
  var emptyTitle = emptyState ? emptyState.querySelector(".products-empty-title") : null;
  var emptyLink = document.getElementById("products-empty-link");
  var copyLinkBtn = document.getElementById("copy-link");
  var copyToast = document.getElementById("copy-toast");
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

  // Deep links to a single card (#p-men-...) keep the current filter.
  function filterFromHash() {
    if (!window.location.hash) return "all";
    var hash = window.location.hash.replace("#", "");
    return VALID_FILTERS.indexOf(hash) !== -1 ? hash : null;
  }

  if (tabBtns.length > 0 && catalogueCards.length > 0) {
    // Counts are derived from the cards that actually exist, never hardcoded.
    tabBtns.forEach(function (btn) {
      var filter = btn.getAttribute("data-filter");
      var count = filter === "all"
        ? catalogueCards.length
        : catalogueCards.filter(function (card) {
            return card.getAttribute("data-category") === filter;
          }).length;
      var countEl = btn.querySelector(".count");
      if (countEl) countEl.textContent = "(" + count + ")";
    });

    function searchableText(card) {
      var nameEl = card.querySelector(".product-name");
      var categoryEl = card.querySelector(".product-category");
      return [
        nameEl ? nameEl.textContent : "",
        categoryEl ? categoryEl.textContent : ""
      ].join(" ").toLowerCase();
    }

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

      catalogueCards.forEach(function (card) {
        var categoryMatches = currentFilter === "all" ||
          card.getAttribute("data-category") === currentFilter;
        var matches = categoryMatches && (!query || searchableText(card).indexOf(query) !== -1);

        card.hidden = !matches;
        if (matches) total++;
      });

      // The enquiry tile is not a product: hide it while searching or empty.
      productCards.forEach(function (card) {
        if (card.hasAttribute("data-cta")) card.hidden = total === 0 || query !== "";
      });

      if (resultsCount) {
        if (total === 0) {
          resultsCount.textContent = "No items found";
        } else if (total === catalogueCards.length) {
          resultsCount.textContent = "Showing all " + total + " items";
        } else {
          resultsCount.textContent = "Showing " + total + " of " + catalogueCards.length + " items";
        }
      }

      if (emptyState) emptyState.hidden = total !== 0;
      if (emptyTitle) {
        emptyTitle.textContent = rawQuery
          ? "No products match \u201c" + rawQuery + "\u201d."
          : "No products found.";
      }
      setEmptyLink(rawQuery);

      if (searchClear) searchClear.hidden = rawQuery === "";
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

      // Escape clears the query, matching native search behaviour.
      productSearch.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && productSearch.value !== "") {
          event.preventDefault();
          productSearch.value = "";
          applyFilters();
        }
      });
    }

    if (searchClear && productSearch) {
      searchClear.addEventListener("click", function () {
        productSearch.value = "";
        applyFilters();
        productSearch.focus();
      });
    }

    // ---------- Copy a link to the current view ----------
    var toastTimer = null;

    function showToast(message) {
      if (!copyToast) return;
      copyToast.textContent = message;
      copyToast.hidden = false;
      if (toastTimer) window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        copyToast.hidden = true;
      }, 2500);
    }

    function legacyCopy(text) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "-1000px";
      document.body.appendChild(field);
      field.select();
      var copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        copied = false;
      }
      document.body.removeChild(field);
      return copied;
    }

    function shareUrl() {
      var base = window.location.href.split("#")[0];
      return currentFilter === "all" ? base : base + "#" + currentFilter;
    }

    if (copyLinkBtn) {
      copyLinkBtn.addEventListener("click", function () {
        var url = shareUrl();
        var fallback = function () {
          showToast(legacyCopy(url) ? "Link copied" : "Could not copy the link");
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            showToast("Link copied");
          }, fallback);
        } else {
          fallback();
        }
      });
    }

    window.addEventListener("hashchange", function () {
      var hashFilter = filterFromHash();
      if (hashFilter) setFilter(hashFilter, { updateHash: false });
    });

    if (tabStrip) {
      tabStrip.addEventListener("scroll", updateTabFades, { passive: true });
    }
    window.addEventListener("resize", updateTabFades);
    window.addEventListener("load", updateTabFades);

    var initialFilter = filterFromHash();
    setFilter(initialFilter || "all", { updateHash: false });
    updateTabFades();
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
