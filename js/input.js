/* ------------------ settings -------------- */
buttonReset.addEventListener("click", () => {
   world = new World(CVS_WIDTH, CVS_HEIGHT, SCALE_SIZE, threshold);
})

buttonRandomColor.addEventListener("click", () => {
   buttonRandomColor.classList.toggle("active");

});

inputThreshold.addEventListener("change", (e) => {
   const value = Number(e.target.value);
   valueThreshold.innerText = threshold = value;
   world.setTouchArea(threshold);
});

inputSize.addEventListener("change", (e) => {
   const value = Number(e.target.value);
   valueSize.innerText = SCALE_SIZE = value;
   CVS_WIDTH = Math.floor(WIN_W / SCALE_SIZE);
   CVS_HEIGHT = Math.floor(WIN_H / SCALE_SIZE);
   world = new World(CVS_WIDTH, CVS_HEIGHT, SCALE_SIZE, threshold);
});

inputSpeed.addEventListener("change", (e) => {
   const value = Number(e.target.value);
   valueSpeed.innerText = FPS = value;
   ani.updateFPS(FPS);
});

inputThreshold.addEventListener("input", (e) => {
   valueThreshold.innerText = Number(e.target.value);
});

inputSize.addEventListener("input", (e) => {
   valueSize.innerText = Number(e.target.value);
});

inputSpeed.addEventListener("input", (e) => {
   valueSpeed.innerText = Number(e.target.value);
});

const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00", "#ff4500", "#800080", "#008080", "#ff8c00", "#ffffff", "#222222"];
let colorI = 0
let isRabdomColor = true;

buttonRandomColor.addEventListener("click", () => {
   isRabdomColor = !isRabdomColor;
   buttonRandomColor.classList.toggle("active", isRabdomColor);
   allColors.classList.toggle("active", !isRabdomColor);
   if (!isRabdomColor) {
      world.color = colors[colorI];
      world.blockRandomColor = true;
   } else {
      world.blockRandomColor = false;
   }
});

const allColorPlates = document.querySelectorAll(".color");
allColorPlates[colorI].classList.add("active");

allColorPlates.forEach((cp, i) => {
   cp.style.background = colors[i];
   cp.addEventListener("click", () => {
      allColorPlates.forEach(e => e.classList.remove("active"));
      cp.classList.add("active");
      colorI = i;
      world.color = colors[i];
   });
})


document.addEventListener("click", (e) => {
   if (e.target == openSettings || e.target.closest("#settings")) {
      settings.classList.add("active");
      world.blockEvents = true;
   } else {
      settings.classList.remove("active");
      world.blockEvents = false;
   }
})