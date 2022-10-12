const container = document.querySelector(".container");

function setLayout() {
  const title = document.createElement("div");
  createSketchPad(16);
}

function createSketchPad(dimension) {
  const sketchPad = document.createElement("div");
  sketchPad.style.width = dimension * 25;
  sketchPad.style.height = dimension * 25;
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

function destroySketchPad() { }

function colorCell() {
  this.style.backgroundColor = "black";
}


setLayout();