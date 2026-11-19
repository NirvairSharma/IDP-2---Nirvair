const slide = document.getElementById("slide");
const track = document.getElementById("track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let current = 0;
let busy = false;

// Build the row of era buttons
ERAS.forEach((era, i) => {
  const li = document.createElement("li");
  const b = document.createElement("button");
  b.innerHTML = "<span>" + era.short + "</span>";
  b.setAttribute("aria-label", era.title);
  b.addEventListener("click", () => goTo(i));
  li.appendChild(b);
  track.appendChild(li);
});

function render() {
  const era = ERAS[current];
  slide.innerHTML =
    '<img src="images/' + era.image + '" alt="' + era.alt + '">' +
    "<div>" +
      '<p class="years">' + era.years + "</p>" +
      "<h2>" + era.title + "</h2>" +
      "<p>" + era.text + "</p>" +
      '<p class="fact">' + era.fact + "</p>" +
    "</div>";

  track.querySelectorAll("button").forEach((b, i) => {
    if (i === current) b.setAttribute("aria-current", "true");
    else b.removeAttribute("aria-current");
  });
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === ERAS.length - 1;
}

async function goTo(index) {
  if (busy || index === current || index < 0 || index >= ERAS.length) return;
  busy = true;
  const dir = index > current ? 1 : -1;
  const time = reduceMotion ? 0 : 1;

  await slide.animate(
    [{ opacity: 1, transform: "translateX(0)" },
     { opacity: 0, transform: "translateX(" + -50 * dir + "px)" }],
    { duration: 260 * time, easing: "ease-in", fill: "forwards" }
  ).finished;

  current = index;
  render();

  await slide.animate(
    [{ opacity: 0, transform: "translateX(" + 50 * dir + "px)" },
     { opacity: 1, transform: "translateX(0)" }],
    { duration: 380 * time, easing: "ease-out", fill: "forwards" }
  ).finished;

  slide.getAnimations().forEach(a => a.cancel());
  busy = false;
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goTo(current + 1);
  if (e.key === "ArrowLeft") goTo(current - 1);
});

// Swipe on phones
let startX = null;
slide.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
slide.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) goTo(diff < 0 ? current + 1 : current - 1);
  startX = null;
});

render();
