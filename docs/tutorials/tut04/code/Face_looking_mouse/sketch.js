/**
 * This sketch displays a series of images of a face that follows the mouse
 * around on the screen as it moves. 
 *
 * Jared Donovan - 2018.
 */
 
// We use a two-dimensional array to store the images.
let faces;

// Rows and cols will set the size of the array.
// Change these to adjust the number of rows and columns, 
// but make sure that there are corresponding images in your data folder.
let rows = 3;
let cols = 5;

// Row height and column width will be calculated at run time.
let rowHeight;
let colWidth;

function preload(){
  // Initialise 2-dimensional array with defined number of rows & cols.
  faces = new Array(rows);
  
  // Iterate over the array and populate it with images from the data folder.
  for (let r = 0; r < rows; r++){
    faces[r] = new Array(cols);
    for (let c = 0; c < cols; c++){
      let imgNum = r * cols + c;      
      faces[r][c] = loadImage("data/" + imgNum + ".png");      
    }
  }
}

function setup(){
  createCanvas(480, 480);
  
  // Calculate rowHeight and colWidth based on size of canvas.
  rowHeight = height / rows;
  colWidth = width / cols;
  
}

function draw(){
  // Calculate which row / col the mouse is over.
  // We take advantage of the fact that integer division throws away 
  // the decimal part, meaning that we can use the returned number as 
  // an index on the array.
  let mouseRow = floor(mouseY / rowHeight); 
  let mouseCol = floor(mouseX / colWidth);
  
  // Draw the image to the array. Use the row/col number to select the right one.
  image(faces[mouseRow][mouseCol], 0, 0);

  // Uncomment the following line if you want to show debug information.
  //displayInfo(mouseRow, mouseCol);
}

// A helper function to draw some useful debug information
// to the screen. Useful to help understand how the program
// is working. 
function displayInfo(mouseRow, mouseCol){
  displayGrid();  
  fill(0);
  text("mX: " + mouseX + ", mY: " + mouseY, 10, 20);
  text("mC: " + mouseCol + ", mR; " + mouseRow, 10, 40);
}


// A helper function to draw the grid of rows and cols
// to the screen. Only used to help show how the program works.
function displayGrid(){
  for (let r = 1; r < rows; r++){
    line(0, r * rowHeight, width, r * rowHeight);
  }
  for (let c = 1; c < cols; c++){
    line(c * colWidth, 0, c * colWidth, height);
  }
}