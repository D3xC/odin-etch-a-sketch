const container = document.querySelector(".container");
let sketchMode = "default"

function setLayout() {
  const titleDiv = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = "Etch-A-Sketch";
  titleDiv.appendChild(title);
  titleDiv.classList.add("title");
  container.appendChild(titleDiv);
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
  defaultMode.setAttribute("id", "default");
  rainbowMode.setAttribute("id", "rainbow");
  eraseMode.setAttribute("id", "erase");
  defaultMode.textContent = "Default Mode"
  rainbowMode.textContent = "Rainbow Mode"
  eraseMode.textContent = "Erase Mode";
  clear.textContent = "Clear";
  controls.appendChild(defaultMode);
  controls.appendChild(rainbowMode);
  controls.appendChild(eraseMode);
  controls.appendChild(clear);
  container.appendChild(controls);
  defaultMode.addEventListener("click", setMode);
  rainbowMode.addEventListener("click", setMode);
  eraseMode.addEventListener("click", setMode);
  clear.addEventListener("click", clearSketchPad);


}

function createSketchPad(dimension) {
  const sketchPad = document.createElement("div");
  sketchPad.style.width = dimension * 15;
  sketchPad.style.height = dimension * 15;
  sketchPad.classList.add("pad");
  for (let i = 1; i <= dimension; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 1; j <= dimension; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("mouseover", colorCell);
      row.appendChild(cell);
    }
    sketchPad.appendChild(row);
  }
  container.appendChild(sketchPad);
}

function clearSketchPad() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.backgroundColor = "white";
  });
}

function setMode() {
  sketchMode = this.getAttribute("id");
}

function colorCell() {
  switch (sketchMode) {
    case "default":
      this.style.backgroundColor = "black";
      break;
    case "rainbow":
      this.style.backgroundColor = randomColor();
      break;
    case "erase":
      this.style.backgroundColor = "white";
      break;
  }
}

function randomColor() {
  const rColor = Math.floor(Math.random() * 255);
  const gColor = Math.floor(Math.random() * 255);
  const bColor = Math.floor(Math.random() * 255);
  return `rgb(${rColor}, ${gColor}, ${bColor})`;
}

setLayout();