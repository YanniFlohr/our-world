/* =========================
   🌍 STATE SYSTEM
========================= */

let windInterval = null;
let windEnabled = true;

/* =========================
   🎬 ENTER WORLD
========================= */

function enterWorld() {
  const landing = document.querySelector(".landing");
  const world = document.querySelector(".world");
  const music = document.getElementById("bgmusic");
  const transition = document.getElementById("transition");

  if (!landing || !world || !transition) return;

  // 🌑 fade to black
  transition.classList.add("active");

  // stop petals during transition (clean feel)
  windEnabled = false;
  stopWind();

  setTimeout(() => {
    // switch scenes
    landing.style.display = "none";
    world.classList.add("show");

    window.scrollTo({ top: 0 });

    // 🌸 restart wind in world
    windEnabled = true;
    startWind();

    // 🌑 fade back in
    transition.classList.remove("active");

    // 🎵 music
    if (music) {
      music.volume = 0;

      music.play().catch(() => {
        console.log("Music blocked until user click.");
      });

      let v = 0;
      const fade = setInterval(() => {
        if (v < 0.6) {
          v += 0.02;
          music.volume = v;
        } else {
          clearInterval(fade);
        }
      }, 80);
    }

  }, 1800);
}

/* =========================
   🌸 PETAL SYSTEM
========================= */

function spawnPetal() {
  if (!windEnabled) return;

  const container = document.getElementById("petal-container");
  if (!container) return;

  const petal = document.createElement("div");
  petal.className = "petal";

  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.top = "-20px";

  const size = 6 + Math.random() * 6;
  petal.style.width = size + "px";
  petal.style.height = size + "px";

  petal.style.animationDuration = (5 + Math.random() * 5) + "s";

  container.appendChild(petal);

  setTimeout(() => petal.remove(), 10000);
}

/* =========================
   🌬 WIND CONTROL
========================= */

function startWind() {
  if (windInterval) return;

  windInterval = setInterval(() => {
    spawnPetal();
    spawnPetal();
  }, 700);
}

function stopWind() {
  clearInterval(windInterval);
  windInterval = null;
}

/* =========================
   🚀 INIT
========================= */

window.addEventListener("load", () => {
  windEnabled = true;
  startWind();
});

/* =========================
   👁 MEMORY ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

window.addEventListener("load", () => {
  document.querySelectorAll(".memory").forEach(el => {
    observer.observe(el);
  });
});