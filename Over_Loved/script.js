const bar = document.getElementById("bar");
const crack = document.getElementById("crack");
const fill = document.getElementById("fill");
const text = document.getElementById("text");

let progress = 0;
let broken = false;
let fillLevel = 0;

const loadInterval = setInterval(() => {
  if (progress < 95) {
    progress += 1;
    bar.style.width = progress + "%";
  } else if (!broken) {
    broken = true;
    crack.style.background = "#e63946";
    startOverflow();
    clearInterval(loadInterval);
  }
}, 40);

function startOverflow() {
  const heartInterval = setInterval(() => {
    spawnHeart();
    fillLevel += 2;
    fill.style.height = fillLevel + "%";

    if (fillLevel >= 100) {
      fill.style.height = "100%";

      // lock final state
      document.getElementById("loader").style.display = "none";
      document.getElementById("hearts").style.display = "none";
      document.getElementById("textInner").style.display = "inline-block";
      clearInterval(heartInterval);
    }
  }, 120);
}

const heartsContainer = document.getElementById("hearts");

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * window.innerWidth + "px";
  const sizeVW = 1.5 + Math.random() * 2.5;
  heart.style.fontSize = `clamp(16px, ${sizeVW}vw, 40px)`;
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 3500);
}
