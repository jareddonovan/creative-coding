// Lolipop photo CC: BY, Flickr user verchmarco
// https://www.flickr.com/photos/160866001@N07/45958565335/sizes/l

let src;
let outputGraphic;
let out;

function preload(){
	src = loadImage("data/lollipops.jpg");
}

function setup() { 
  createCanvas(640,640);
  // selectInput("Select an image to process:", "inputSelect");
  //noLoop();
  //interrupt();
	background(255);
  textAlign(CENTER, CENTER);
  text("Processing (will take a while)", width / 2, height / 2);
}

// function interrupt() {
//   while (src == null) {
//     delay(200);
//   }
//   loop();
// }

function draw() {
  let CANVAS_SIZE = 640; //DYLAN: CHANGE THIS TO ANY POWER OF 2 LESS THAN 640
  let PALETTE = getPallette("goldfish");     //DYLAN: CHANGE THIS TO ANY OF THE PALETTES LISTED IN THE PALETTES TAB
  
  limitSize(src, CANVAS_SIZE);
  outputGraphic = createGraphics(src.width, src.height);
  outputGraphic.background(255,255,255);
  console.log("starting the drawdraw");
  ditherQuantize(src, PALETTE);
  console.log("drawdraw fin");
  
  //TODO: check and fix basicScale in this context.
  out = createGraphics(
    outputGraphic.width * (CANVAS_SIZE / width),
    outputGraphic.height * (CANVAS_SIZE / height));
  out = basicScale(outputGraphic, width / CANVAS_SIZE);
  image(out,0,0);
  noLoop();
}

// function inputSelect(selection) {
//   if (selection == null) {
//     println("Window was closed or the user hit cancel.");
//     exit();
//   } else {
//     println("User selected " + selection.getAbsolutePath());
//     src = loadImage(selection.getAbsolutePath());
//   } 
// }

// function outputSelected(selection) {
//   if (selection == null) {
//     println("Window was closed or the user hit cancel.");
//   } else {
//     println("User selected " + selection.getAbsolutePath());
//     out.save(selection.getAbsolutePath()+".png");
//   }
// }