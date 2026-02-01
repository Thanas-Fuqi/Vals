const bar = document.getElementById("bar");
const fill = document.getElementById("fill");
const loader = document.getElementById("loader");
const textInner = document.getElementById("textInner");
const statusText = document.getElementById("statusText");
const heartsContainer = document.getElementById("hearts");
const heartbeatSound = document.getElementById("heartbeatSound");

let progress = 0;
let fillLevel = 0;
let started = false;

window.addEventListener("click", () => {
  if (started) return; started = true;
  statusText.textContent = "Loading!";
  startLoading();
}, { once: true });

function startLoading() {
  const loadInterval = setInterval(() => {
    if (progress === 35) {
      statusText.textContent = "Loading!...";
    } else if (progress === 60) {
      statusText.textContent = "Almost there!";
    }
    
    if (progress < 100) {
      progress++;
      bar.style.width = progress + "%";
    } else {
      clearInterval(loadInterval);
      statusText.textContent = "FINISHED!";
      startOverflow();
    }
  }, 40);
}

function startOverflow() {
  const heartInterval = setInterval(() => {
    spawnHeart();
    fillLevel += 2;
    fill.style.height = fillLevel + "%";

    if (fillLevel >= 100) {
      fill.style.height = "100%";
      loader.style.display = "none";
      heartsContainer.style.display = "none";

      textInner.style.display = "inline-block";
      heartbeatSound.currentTime = 0;
      heartbeatSound.play();

      clearInterval(heartInterval);
    }
  }, 120);
}

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";

  const sizeVW = 1.5 + Math.random() * 2.5;
  heart.style.fontSize = `clamp(16px, ${sizeVW}vw, 40px)`;
  heart.style.left = Math.random() * window.innerWidth + "px";

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 3500);
}