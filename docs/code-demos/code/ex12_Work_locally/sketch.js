// Sky photo by pexels user Elia
// https://www.pexels.com/photo/photo-of-blue-sky-912110/

let bg;

function preload () {
  bg = loadImage('sky.jpg');
}

function setup () {
  createCanvas(600, 400);
  image(bg, 0, 0);
  fill(0);
  textSize(70);
  text('TEXT\nEDITOR', 10, 200);
}

function draw () {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 10);
  }
}
