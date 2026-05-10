/* ============================================
   WP2026 - WordPress 教學網站 主要 JavaScript
   ============================================ */

(function () {
  "use strict";

  /* ---------- Theme Toggle (Dark/Light Mode) ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  // Initial theme: check localStorage, fallback to system preference
  const savedTheme = localStorage.getItem("wp2026-theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = root.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("wp2026-theme", newTheme);
    });
  }

  /* ---------- Mobile Menu Toggle ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reading Progress Bar ---------- */
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    function updateProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percent = docHeight > 0 ? Math.min(100, (scrolled / docHeight) * 100) : 0;
      progressBar.style.width = percent + "%";
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ---------- TOC Active Link Highlighting (scroll spy) ---------- */
  const tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length > 0) {
    const headings = Array.from(
      document.querySelectorAll(".article-body h2, .article-body h3")
    );

    function setActiveTocLink() {
      const scrollPos = window.scrollY + 120;
      let currentId = null;
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop <= scrollPos) {
          currentId = headings[i].id;
        } else {
          break;
        }
      }
      tocLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (currentId && href === "#" + currentId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    setActiveTocLink();
    window.addEventListener("scroll", setActiveTocLink, { passive: true });
  }

  /* ---------- Lesson Filter (on lessons.html) ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const moduleCards = document.querySelectorAll(".module-card[data-level]");

  if (filterButtons.length > 0 && moduleCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = btn.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        moduleCards.forEach(function (card) {
          const level = card.getAttribute("data-level");
          if (filter === "all" || level === filter) {
            card.style.display = "";
            card.classList.add("fade-in");
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Smooth scroll for in-page anchors (extra) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = link.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jumping
        history.pushState(null, "", targetId);
      }
    });
  });
})();
