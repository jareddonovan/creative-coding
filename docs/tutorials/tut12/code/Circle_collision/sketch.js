/**
 * Based on Circle Collision with Swapping Velocities by Ira Greenberg. 
 * (which is based on Keith Peter's Solution in Foundation Actionscript
 *  Animation: Making Things Move!)
 * https://processing.org/examples/circlecollision.html
 * 
 * Ported to p5js by Jared Donovan. 2019.
 */

let balls =  [];

function setup() {
  createCanvas(640, 360);
  
  balls.push(new Ball(100, 400, 20));
  balls.push(new Ball(700, 400, 80));
}

function draw() {
  background(51);

  for (let b of balls) {
    b.update();
    b.display();
    b.checkBoundaryCollision();
  }
  
  balls[0].checkCollision(balls[1]);
}