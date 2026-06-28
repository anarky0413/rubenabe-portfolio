/* =========================================
   ARTWORK PROTECTION
   Blocks casual right-click, drag, selection, long-press,
   and common print/save-as-PDF shortcuts on artwork pages.
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const artworkPage = document.body.classList.contains("artwork-page");

  if (!artworkPage) return;

  const protectedSelectors = [
    ".artwork-image-button-clean",
    ".artwork-image-button-clean img",
    ".artwork-lightbox",
    ".artwork-lightbox img"
  ];

  function isProtectedElement(target) {
    return protectedSelectors.some((selector) => target.closest(selector));
  }

  /* Add print warning message */
  function addPrintWarning() {
    if (document.querySelector(".artwork-print-warning")) return;

    const warning = document.createElement("div");
    warning.className = "artwork-print-warning";
    warning.innerHTML = `
      <h1>Artwork protected</h1>
      <p>
        Artwork on this page is shown for portfolio viewing only.
        Please do not download, print, repost, or reuse without permission.
      </p>
    `;

    document.body.prepend(warning);
  }

  addPrintWarning();

  /* Block right-click on artwork */
  document.addEventListener("contextmenu", (event) => {
    if (isProtectedElement(event.target)) {
      event.preventDefault();
    }
  });

  /* Block image dragging */
  document.addEventListener("dragstart", (event) => {
    if (isProtectedElement(event.target)) {
      event.preventDefault();
    }
  });

  /* Block selection on artwork areas */
  document.addEventListener("selectstart", (event) => {
    if (isProtectedElement(event.target)) {
      event.preventDefault();
    }
  });

  /* Reduce mobile long-press save behavior */
  let touchTimer;

  document.addEventListener("touchstart", (event) => {
    if (!isProtectedElement(event.target)) return;

    touchTimer = setTimeout(() => {
      event.preventDefault();
    }, 350);
  }, { passive: false });

  document.addEventListener("touchend", () => {
    clearTimeout(touchTimer);
  });

  document.addEventListener("touchmove", () => {
    clearTimeout(touchTimer);
  });

  /* Block keyboard print shortcuts: Ctrl+P / Cmd+P */
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const isPrintShortcut = (event.ctrlKey || event.metaKey) && key === "p";

    if (isPrintShortcut) {
      event.preventDefault();
      addPrintWarning();
      alert("Printing or saving artwork pages as PDF is disabled. Artwork is for portfolio viewing only.");
    }
  });

  /* Browser menu print cannot be fully blocked, so print CSS hides artwork */
  window.addEventListener("beforeprint", () => {
    addPrintWarning();
    document.body.classList.add("artwork-print-mode");
  });

  window.addEventListener("afterprint", () => {
    document.body.classList.remove("artwork-print-mode");
  });
});