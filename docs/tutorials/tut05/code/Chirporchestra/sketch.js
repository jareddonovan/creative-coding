// Bluejay sample from: http://soundbible.com/1842-Bluejay-Call.html
// License: Attribution 3.0 | Recorded by Mike Koenig
// 
// Percussion samples from SonicPi project http://sonic-pi.net/ 

let grid = [];

let chirps = [];
let numBanks = 3;
let currentBank = 0;

let rows = 12;
let cols = 16;
let rowHeight;
let colWidth;
let margin = 3;
let outerMargin = 20;
let bottomMargin = 80;
let currentCol = 0;
let timePerTick = 200;
let lastTickAt = 0;
let isPaused = false;

function preload() {
  chirps = new Array(rows);
  for (let i = 0; i < rows; i++) {
    chirps[i] = new Array(numBanks);
  }

  // Initialise sample bank
  for (let r = 0; r < rows; r++) {
    for (let b = 0; b < numBanks; b++) {
      chirps[r][b] = loadSound("data/" + b + "-" + nf(r, 2, 0) + ".wav");
    }
  }

}

function setup() {
  createCanvas(620, 540);


  // Initialise rows and cols
  grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  rowHeight = (height - outerMargin - bottomMargin) / rows;
  colWidth = (width - 2 * outerMargin) / cols;
}

function draw() {
  background(0);

  let elapsedTime = millis() - lastTickAt;
  if (!isPaused && elapsedTime > timePerTick) {
    lastTickAt = millis();
    currentCol = (currentCol + 1) % cols;
    triggerCol(currentCol);
  }

  drawGrid();

  fill(255);
  text("BANK: " + currentBank, outerMargin, height - outerMargin - 50);
  text("SPEED: " + timePerTick, outerMargin, height - outerMargin - 30);
  if (isPaused) {
    text("PAUSED", outerMargin, height - outerMargin - 10);
  } else {
    text("RUNNING", outerMargin, height - outerMargin - 10);
  }
}

// Trigger all the samples in the specified collumn
function triggerCol(col) {
  col = floor(col);

  for (let r = 0; r < rows; r++) {
    if (grid[r][col]) {
      chirps[r][currentBank].play();
    }
  }
}

function drawGrid() {
  let w = colWidth - margin * 2;
  let h = rowHeight - margin * 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = outerMargin + c * colWidth + margin;
      let y = outerMargin + r * rowHeight + margin;

      if (grid[r][c]) {
        stroke(240);
        fill(255);
      } else {
        stroke(75);
        fill(50);
      }

      if (c == currentCol) {
        stroke(75, 75, 150);
        if (!grid[r][c]) {
          fill(50, 50, 100);
        }
      }

      rect(x, y, w, h);
    }
  }
}

function mouseReleased() {
  // Figure out which square was clicked on.
  if (!withinOuterMargin(mouseX, mouseY)) {
    return;
  }

  // Use integer division to figure out which row / col it is
  let r = floor((mouseY - outerMargin) / rowHeight);
  let c = floor((mouseX - outerMargin) / colWidth);

  grid[r][c] = !grid[r][c];
}

function clearGrid() {
  grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }
}

function togglePause() {
  isPaused = !isPaused;

  // If we have just un-paused, then reset the timer.
  if (!isPaused) {
    lastTickAt = millis();
  }
}

function withinOuterMargin(x, y) {
  return x > outerMargin && x < width - outerMargin &&
    y > outerMargin && y < height - bottomMargin;
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    currentBank = (currentBank + 1) % numBanks;
  } else if (keyCode == LEFT_ARROW) {
    currentBank = (currentBank + (numBanks - 1)) % numBanks;
  } else if (keyCode == UP_ARROW) {
    timePerTick = max(10, timePerTick - 1);
  } else if (keyCode == DOWN_ARROW) {
    timePerTick = min(2000, timePerTick + 1);
  } else if (key == 'c') {
    clearGrid();
  } else if (key == ' ') {
    togglePause();
  } else if (key == 's') {
    saveCanvas("chirporchestra-screenshot.png");
  }

}