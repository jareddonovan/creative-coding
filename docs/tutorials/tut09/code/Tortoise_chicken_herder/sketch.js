/**
 * This sketch is a reward to you for taking the time to download the creative statement
 * template. Enjoy! (I admit - it's not the most fun game, but it's all I had time for...)
 * 
 * Jared Donovan
 * 31/5/2016
 */
 
let tortoise;
eggChickens = [];
let points = 0;
 
function setup(){
  // Display the sketch full screen
  createCanvas(windowWidth, windowHeight);
  
  // Setting rect mode to CENTER will make some of the drawing easier
  rectMode(CENTER);
  
  // Setting text align to CENTER will make text easier to position.
  textAlign(CENTER);
  
  noStroke();
  
  tortoise = new Tortoise(width / 2, height / 2);
  
  for (let i = 0; i < 10; i++){
  	eggChickens.push(new EggChicken(random(100, width - 100), random(100, height - 100)));
  }
}

function draw(){
  background(204);
  
  // Draw the 'coop' and 'free' areas
  push();
  translate(50, height / 2);
  fill(50);
  rect(0, 0, 100, height);
  rotate(radians(-90));
  fill(255);
  textSize(48);
  text("COOP", 0, 10);
  pop();
  
  push();
  translate(width - 50, height / 2);
  fill(50);
  rect(0, 0, 100, height);
  rotate(radians(90));
  fill(255);
  textSize(48);
  text("FREE", 0, 10);
  pop();
  
  for (let eggChicken of eggChickens){
    eggChicken.update(tortoise);
    eggChicken.display();
  }

  // Draw the tortoise
	tortoise.update();
  tortoise.display();
  
  // Draw the points
  fill(0);
  textSize(24);
  text("POINTS: " + points, width / 2, 50);
  
}

// When the mouse is clicked, drop a new egg at the specified location.
function mouseClicked(){
  // eggChickens.push(new EggChicken(mouseX, mouseY));
}

// When the user presses 'w', 'a', 's', 'd' keys, change the direction of the
// tortoise.
function keyPressed(){
  if (key == 'w'){
    tortoise.up();
  }
  else if (key == 'a'){
    tortoise.left();
  }
  else if (key == 's'){
    tortoise.down();
  }
  else if (key == 'd'){
    tortoise.right();
  }
}
