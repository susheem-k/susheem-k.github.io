(function () {
  const root = document.documentElement;

  function theme() {
    return root.getAttribute("data-theme") || "light";
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (_) {}
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    setTheme(theme() === "dark" ? "light" : "dark");
  });

  setTheme(theme());

  document.querySelectorAll("img[data-cover]").forEach((img) => {
    img.addEventListener("error", () => {
      img.parentElement.classList.add("fallback");
    });
  });
})();
