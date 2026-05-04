const animated = document.querySelectorAll("[data-animate]");
document.body.classList.add("motion-ready");

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

const setMenuOpen = (isOpen) => {
  siteHeader?.classList.toggle("is-menu-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!siteHeader?.classList.contains("is-menu-open"));
});

primaryNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!siteHeader?.classList.contains("is-menu-open") || !(event.target instanceof Node)) return;
  if (!siteHeader.contains(event.target)) setMenuOpen(false);
});

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
    { threshold: 0.16 }
  );

  animated.forEach((element) => reveal.observe(element));
} else {
  animated.forEach((element) => element.classList.add("is-visible"));
}

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (finePointer.matches) {
  const cardStates = new WeakMap();
  const cards = document.querySelectorAll(".bento-card");

  const getState = (card) => {
    let state = cardStates.get(card);

    if (!state) {
      state = { frame: 0, rect: null, x: 0, y: 0 };
      cardStates.set(card, state);
    }

    return state;
  };

  const measureCard = (card) => {
    const rect = card.getBoundingClientRect();
    const state = getState(card);
    state.rect = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    };
  };

  const invalidateCard = (card) => {
    getState(card).rect = null;
  };

  cards.forEach((card) => {
    card.addEventListener("pointerenter", () => measureCard(card));
    card.addEventListener("pointermove", (event) => {
      const state = getState(card);
      state.x = event.clientX;
      state.y = event.clientY;

      if (state.frame) return;

      state.frame = requestAnimationFrame(() => {
        if (!state.rect) measureCard(card);

        const x = ((state.x - state.rect.left) / state.rect.width) * 100;
        const y = ((state.y - state.rect.top) / state.rect.height) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
        state.frame = 0;
      });
    });
  });

  if ("ResizeObserver" in window) {
    const resizeCards = new ResizeObserver((entries) => {
      entries.forEach((entry) => invalidateCard(entry.target));
    });

    cards.forEach((card) => resizeCards.observe(card));
  } else {
    window.addEventListener("resize", () => cards.forEach(invalidateCard), { passive: true });
  }
}

const parallax = document.querySelector("[data-parallax] img");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking || !parallax || reducedMotion.matches) return;
    ticking = true;
    requestAnimationFrame(() => {
      const offset = Math.min(window.scrollY * 0.08, 42);
      parallax.style.transform = `translateY(${offset}px) scale(1)`;
      ticking = false;
    });
  },
  { passive: true }
);

const bookingForm = document.querySelector(".booking-form");

bookingForm?.addEventListener("submit", (event) => {
  if (window.location.protocol !== "file:") return;

  event.preventDefault();
  const data = new FormData(bookingForm);
  const subject = encodeURIComponent(`Booking request from ${data.get("name") || "website"}`);
  const lines = [
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Organization: ${data.get("organization") || ""}`,
    `Event date: ${data.get("event_date") || ""}`,
    `Location: ${data.get("location") || ""}`,
    `Nearest airport: ${data.get("airport") || ""}`,
    "",
    `Event details: ${data.get("details") || ""}`
  ];
  window.location.href = `mailto:evangelist@tyshoneroland.com?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
});
