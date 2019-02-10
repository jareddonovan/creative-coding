// Holds the source image. A picture of a butterfly.
let butterfly;

function preload(){
  butterfly = loadImage("data/butterfly.jpg");
}

function setup(){
  createCanvas(butterfly.width * 2, butterfly.height * 2);
}

function draw(){
  let tmpAry = [];
  
  image(butterfly, 0, 0, width, height);
  loadPixels();

  for (let i = 0; i < pixels.length; i+= 4){
  	tmpAry.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
  }
  
  tmpAry.sort((a, b) => {
    return (a[0]) - (b[0]);
  });
  
  for (let i = 0; i < pixels.length; i+= 4){
    for (let j = 0; j < 4; j++){
	  	pixels[i + j] = tmpAry[i / 4][j];
    }  
  }

  updatePixels();
  
  noLoop();
}