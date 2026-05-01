const animated = document.querySelectorAll("[data-animate]");
document.body.classList.add("motion-ready");

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

document.querySelectorAll(".bento-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });
});

const parallax = document.querySelector("[data-parallax] img");

window.addEventListener(
  "scroll",
  () => {
    if (!parallax || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const offset = Math.min(window.scrollY * 0.08, 42);
    parallax.style.transform = `translateY(${offset}px) scale(1)`;
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
