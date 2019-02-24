// Draws a sort of a star shape with curveVertex.

size(600, 400);

beginShape();
curveVertex(300, 100);
curveVertex(320, 180);
curveVertex(400, 200);
curveVertex(320, 220);
curveVertex(300, 300);
curveVertex(280, 220);
curveVertex(200, 200);
curveVertex(280, 180);
// Add the first, second, and third vertices at the end.
curveVertex(300, 100);
curveVertex(320, 180);
curveVertex(400, 200);
endShape(CLOSE);
