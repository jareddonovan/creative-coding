let points = [];

function setup() {
  createCanvas(400, 400);
  
  // Use HSB color mode, which is easier to control colour output in.
  colorMode(HSB, 360, 100, 100, 100);
  
  background(0);
  
  // Set the fill colour to a fairly transparent black.
  fill(0, 10);
}

function draw() {
	// Draw a transparent rectangle on the background to make old lines fade.
  noStroke();
  rect(0, 0, width, height);
  
  if (mouseIsPressed) {
    points.push(createVector(mouseX, mouseY));
  }

  // Loop over the array of points (we will learn more about this in T03)
  for (let i = 1; i < points.length; i++) {    
    // Get the point before, so we can draw a continuous line
    let p1 = points[i - 1];
    p1.x += randomGaussian();
    p1.y += randomGaussian();
    
	  // Set the hue depending on how far through the line it is
    let h = map(i, 0, points.length, 0, 360);
  	stroke(h, 80, 100, 80);

    let p2 = points[i];
    line(p1.x, p1.y, p2.x, p2.y);
  }
}