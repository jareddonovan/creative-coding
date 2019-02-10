let marlon;
let tree;

function preload(){
  marlon = loadImage("data/marlon.jpg");
}

function setup(){
  createCanvas(640, 426);
  noStroke();
  background(255);
  tree = new Tree(0, 0, width, height, this);  
}

function draw(){
  background(255);
  tree.display();
  tree.processMouseMove(mouseX, mouseY, mouseIsPressed);
}

// void keyPressed(){
//   if (key == 's'){
//     save("click_divide-screenshot.png");
//   }
// }