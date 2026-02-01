const picker = document.getElementById("picker");
const items = Array.from(picker.children);

const pickerContainer = document.querySelector(".picker-container");
let selectedIndex = 0; let isThrottled = false;

function updateActive() {
  items.forEach((item, i) => item.classList.remove("active"));
  const activeItem = items[selectedIndex];
  activeItem.classList.add("active");

  const containerHeight = pickerContainer.offsetHeight;
  const activeRect = activeItem.getBoundingClientRect();

  const offset = (containerHeight / 2) - (activeRect.height / 2) - (activeItem.offsetTop);
  picker.style.transform = `translateY(${offset}px)`;
}

function changeIndex(delta) {
  if (isThrottled) return;
  
  const newIndex = selectedIndex + delta;
  if (newIndex >= 0 && newIndex < items.length) {
    selectedIndex = newIndex; updateActive();
    // Throttle: prevents one flick of the wrist from scrolling 20 items
    isThrottled = true;
    setTimeout(() => isThrottled = false, 150); 
  }
}

// 1. Mouse Wheel & Trackpad
let isScrolling = false;
pickerContainer.addEventListener("wheel", (e) => { e.preventDefault();
  // 1. Ignore tiny movements (noise)
  if (Math.abs(e.deltaY) < 10) return;

  // 2. Cooldown timer (prevents "hyper-scrolling")
  if (!isScrolling) {
    isScrolling = true;
    
    const delta = e.deltaY > 0 ? 1 : -1; changeIndex(delta);
    setTimeout(() => isScrolling = false, 200); 
  }
}, { passive: false });

// 2. Touch Support (Mobile)
let touchStart = 0;
pickerContainer.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0].clientY;
});

pickerContainer.addEventListener("touchmove", (e) => { e.preventDefault();
  const touchEnd = e.touches[0].clientY;
  const diff = touchStart - touchEnd;

  if (Math.abs(diff) > 30) {
    changeIndex(diff > 0 ? 1 : -1);
    touchStart = touchEnd;
  }
}, { passive: false });

// 3. Keyboard (Arrow Keys)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") changeIndex(1);
  if (e.key === "ArrowUp") changeIndex(-1);
});

// 4. Clicks
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    selectedIndex = i; updateActive();
  });
});

updateActive();