const animated = document.querySelectorAll("[data-animate]");
document.body.classList.add("motion-ready");

if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  animated.forEach((element) => reveal.observe(element));
} else {
  animated.forEach((element) => element.classList.add("is-visible"));
}

const depthImage = document.querySelector("[data-depth] img");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking || !depthImage || reducedMotion.matches) return;

    ticking = true;
    requestAnimationFrame(() => {
      const offset = Math.min(window.scrollY * 0.06, 34);
      depthImage.style.transform = `translateY(${offset}px) scale(1)`;
      ticking = false;
    });
  },
  { passive: true }
);
