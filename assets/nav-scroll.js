/* Auto-hide navbar on project subpages only */

const projectNav = document.querySelector(".project-nav");

if (projectNav) {
  let lastScrollY = window.scrollY;
  const scrollThreshold = 6;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;
    const difference = currentScrollY - lastScrollY;

    if (currentScrollY < 70) {
      projectNav.classList.remove("nav-hidden");
    } else if (difference > scrollThreshold) {
      projectNav.classList.add("nav-hidden");
    } else if (difference < -scrollThreshold) {
      projectNav.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
  });
}