/**
 * This sketch is a reward to you for taking the time to download the creative statement
 * template. Enjoy! (I admit - it's not the most fun game, but it's all I had time for...)
 * 
 * Jared Donovan
 * 31/5/2016
 */
 
Tortoise tortoise;
ArrayList<EggChicken> eggChickens;
int points;
 
void setup(){
  // Display the sketch full screen on display 1.
  fullScreen(1);
  
  // Setting rect mode to CENTER will make some of the drawing easier
  rectMode(CENTER);
  
  // Setting text align to CENTER will make text easier to position.
  textAlign(CENTER);
  
  noStroke();
  
  tortoise = new Tortoise(width / 2, height / 2);
  eggChickens = new ArrayList<EggChicken>();
}

void draw(){
  background(204);
  
  // Draw the 'coop' and 'free' areas
  pushMatrix();
  translate(50, height / 2);
  fill(50);
  rect(0, 0, 100, height);
  rotate(radians(-90));
  fill(255);
  textSize(48);
  text("COOP", 0, 10);
  popMatrix();
  
  pushMatrix();
  translate(width - 50, height / 2);
  fill(50);
  rect(0, 0, 100, height);
  rotate(radians(90));
  fill(255);
  textSize(48);
  text("FREE", 0, 10);
  popMatrix();
  
  // Draw the points
  fill(0);
  text(points, width / 2, 50);
  
  
  
  tortoise.update();
  tortoise.display();
  
  for (EggChicken eggChicken: eggChickens){
    eggChicken.update(tortoise);
    eggChicken.display();
  }
}

// When the mouse is clicked, drop a new egg at the specified location.
void mouseClicked(){
  eggChickens.add(new EggChicken(mouseX, mouseY));
}

// When the user presses 'w', 'a', 's', 'd' keys, change the direction of the
// tortoise.
void keyPressed(){
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
  else if (key == ' '){
    save("tortiose_chicken_herder-screenshot.png");
  }
}
