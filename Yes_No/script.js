const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const main = document.getElementById("main");
const message = document.getElementById("message");

let yesWidth = 120;
let yesHeight = 52;
let yesText = 18;

noBtn.addEventListener("click", () => {
  yesWidth *= 1.7;
  yesHeight *= 1.7;
  yesText *= 1.5;

  yesBtn.style.width = yesWidth + "px";
  yesBtn.style.height = yesHeight + "px";
  yesBtn.style.fontSize = yesText + "px";
});

yesBtn.addEventListener("click", () => {
  main.style.display = "none";
  message.style.display = "block";
});