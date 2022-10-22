const container = document.querySelector(".container");
const SKETCHPAD_SIZE = 450;
let sketchMode = "default"

function setLayout() {
  setControls();
  createSketchPad(30);
}

function setControls() {
  const controls = document.createElement("div");
  controls.classList.add("controls");
  const defaultMode = document.createElement("button");
  const rainbowMode = document.createElement("button");
  const eraseMode = document.createElement("button");
  const clear = document.createElement("button");
  const sliderContainer = document.createElement("div");
  const sizeControl = document.createElement("input");
  const sizeDisplay = document.createElement("p");
  defaultMode.setAttribute("id", "default");
  defaultMode.classList.add("active");
  rainbowMode.setAttribute("id", "rainbow");
  eraseMode.setAttribute("id", "erase");
  sliderContainer.classList.add("slider");
  sizeControl.setAttribute("type","range");
  sizeControl.setAttribute("id","pad-size");
  sizeControl.setAttribute("min",10);
  sizeControl.setAttribute("max",100);
  sizeControl.setAttribute("value",30);
  defaultMode.textContent = "Default Mode"
  rainbowMode.textContent = "Rainbow Mode"
  eraseMode.textContent = "Erase Mode";
  clear.textContent = "Clear";
  controls.appendChild(defaultMode);
  controls.appendChild(rainbowMode);
  controls.appendChild(eraseMode);
  controls.appendChild(clear);
  sliderContainer.appendChild(sizeControl);
  sliderContainer.appendChild(sizeDisplay);
  controls.appendChild(sliderContainer);
  sizeDisplay.innerHTML = sizeControl.getAttribute("value") + " x " + sizeControl.getAttribute("value");
  container.appendChild(controls);
  defaultMode.addEventListener("click", setMode);
  rainbowMode.addEventListener("click", setMode);
  eraseMode.addEventListener("click", setMode);
  clear.addEventListener("click", clearSketchPad);
  sizeControl.oninput = function() {
    sizeDisplay.innerHTML = this.value + " x " + this.value;
    resizeSketchPad(this.value);
  }
}

function createSketchPad(dimension) {
  const cellSize = SKETCHPAD_SIZE / dimension;
  const sketchPad = document.createElement("div");
  sketchPad.classList.add("pad");
  for (let i = 1; i <= dimension; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `${cellSize}px`;
    for (let j = 1; j <= dimension; j++) {
      const cell = document.createElement("div");
      cell.style.height = `${cellSize}px`;
      cell.style.width = `${cellSize}px`;
      cell.classList.add("cell");
      cell.addEventListener("mouseover", colorCell);
      row.appendChild(cell);
    }
    sketchPad.appendChild(row);
  }
  container.appendChild(sketchPad);
}

function destroySketchPad() {
  const sketchPad = document.querySelector(".pad");
  container.removeChild(sketchPad);
}

function resizeSketchPad(size) {
  destroySketchPad();
  createSketchPad(size);
}

function clearSketchPad() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.backgroundColor = "white";
  });
}

function setMode() {
  const buttons = document.querySelectorAll("button");
  sketchMode = this.getAttribute("id");
  buttons.forEach(button => {
    if (button.getAttribute("id") == sketchMode) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

}

function colorCell() {
  switch (sketchMode) {
    case "default":
      this.style.backgroundColor = "black";
      break;
    case "rainbow":
      this.style.backgroundColor = getRandomColor();
      break;
    case "erase":
      this.style.backgroundColor = "white";
      break;
  }
}

function getRandomColor() {
  const rColor = Math.floor(Math.random() * 255);
  const gColor = Math.floor(Math.random() * 255);
  const bColor = Math.floor(Math.random() * 255);
  return `rgb(${rColor}, ${gColor}, ${bColor})`;
}

setLayout();