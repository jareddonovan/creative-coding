/**
 * This sketch allows the user to design a curve and then generate the 
 * p5.js code that would draw that curve. It is a very rough and
 * ready sketch, but you may find it useful if you need to figure out 
 * the code for a complex shape. 
 *
 * This sketch uses advanced programming concepts that we have not covered
 * yet in the class. Don't worry if you don't understand the code. It is
 * provided purely as a useful tool to help with designing curves. 
 *
 * Instructions. 
 *
 * - Click anywhere on the canvas to add a point for the curve. 
 * - You will need to add at least two points before the curve will display.
 * - Keep clicking points to extend the curve. 
 * - Click and drag an existing point to move it.
 * - When you are happy with the curve. Click the 'copy code' button. 
 * - Open a new sketch and paste the code in.
 *
 * - Keyboard controls
 *     't' = change type of point (vertex, or curveVertex). 
 *     '-' = delete the selected point.
 *     '[' = insert a new point before the selected point.
 *     ']' = insert a new point after the selected point.
 *     'SPACE' = clear the points.
 *
 * - Change the size of the canvas if you need.
 *
 * Jared Donovan 2018.
 */

let points = [];
let copyButton;
let _selectedPoint;
let pointType = 0;
let cancelDrag = false;

function setup() {
  createCanvas(800, 600);
  fill(0);

  copyButton = createButton("Copy Code");
}

function draw() {
  //setEndPoints();

  background(204);
  textAlign(LEFT, TOP);
  textSize(18);

  fill(180);
  noStroke();
  text("Click anywhere to add points for a curve." +
    "\nClick a point to select it." +
    "\nClick and drag to move." +
    "\nClick 'Copy Code' button to copy code to clipboard" +
    "\n\nKeyboard controls" +
    "\n  't' = change type of point (vertex, or curveVertex)." +
    "\n  '-' = delete the selected point." +
    // "\n  'c' = copy code for curve to clipboard." +
    "\n  '[' = insert a new point before the selected point." +
    "\n  ']' = insert a new point after the selected point." +
    "\n  'SPACE' = clear the points.",
    20, 20, width - 40, height - 40);

  if (points.length > 1) {
    fill(255, 100);
    stroke(0);

    beginShape();

    for (let p of points) {
      console.log("p:" + p);
      p.display();
    }

    endShape(OPEN);
  }

  // Draw the control points
  for (let p of points) {
    p.displayPoint();
  }
}

function setSelectedPoint(p) {
  if (p === _selectedPoint) {
    return;
  }

  if (_selectedPoint != null) {
    _selectedPoint.setSelected(false);
  }
  _selectedPoint = p;
  if (_selectedPoint != null) {
    _selectedPoint.setSelected(true);
    pointType = p.type;
  }
}

function getSelectedPoint() {
  return _selectedPoint;
}

function getPointType() {
  if (pointType == 0) {
    return "spline";
  } else if (pointType == 1) {
    return "vertex";
  }
  return "";
}

function setPointType(pt) {
  pointType = pt;
  let sp = getSelectedPoint();
  if (sp != null) {
    sp.type = pt;
  }
}

function clearPoints() {
  points = [];
}

function deleteSelectedPoint() {
  let sp = getSelectedPoint();

  if (sp == null) {
    return;
  }

  // Re-link the list around the removed point
  if (sp.prev != null) {
    sp.prev.next = sp.next;
  }
  if (sp.next != null) {
    sp.next.prev = sp.prev;
  }

  // TODO: This won't work with JS arrays.
  let i = points.indexOf(sp);
  points.remove(i);

  setSelectedPoint(points.get(max(0, i - 1)));
}

// Adds a point at the specified x, y position
function addPointAt(x, y) {

  console.log("apa");

  setSelectedPoint(null);
  let prevEndP = null;

  if (points.length > 0) {
    prevEndP = points[points.length - 1];
  }
  points.push(new CurvePoint(pointType, x, y, prevEndP));
  points[points.length - 1].setSelected(true);

  console.log("apb");
}

function insertPointBefore() {
  if (points.length < 2) {
    return;
  }

  let sp = getSelectedPoint();

  if (sp == null) {
    return;
  }

  if (sp.prev == null) {
    return;
  }
  // Get the index of the selectedPoint and insert before that
  let i = points.indexOf(sp);
  points.add(i, new CurvePoint(pointType, (sp.x + sp.prev.x) / 2, (sp.y + sp.prev.y) / 2, sp.prev));
  setSelectedPoint(points[i]);
}

function insertPointAfter() {
  if (points.length < 2) {
    return;
  }

  let sp = getSelectedPoint();

  if (sp == null) {
    return;
  }

  if (sp.next == null) {
    return;
  }

  // Get the index of the selectedPoint and insert after that.
  let i = points.indexOf(sp);
  points.add(i + 1, new CurvePoint(pointType, (sp.x + sp.next.x) / 2, (sp.y + sp.next.y) / 2, sp));
  setSelectedPoint(points.get(i + 1));
}

function mousePressed() {
  // Check for a click on a control point.
  // If we find one, return without doing any more.
  for (let p of points) {
    if (p.checkMousePressed(mouseX, mouseY)) {
      return;
    }
  }

  // Otherwise, add a new point where the mouse was clicked.
  addPointAt(mouseX, mouseY);
}

function mouseDragged() {
  if (getSelectedPoint() !== null && !cancelDrag) {
    getSelectedPoint().x = mouseX;
    getSelectedPoint().y = mouseY;
  }
}

function mouseReleased() {
  cancelDrag = false;
}

// Copy code to generate the curve to the clipboard.
function copyCodeToClipboard() {
  let code;

  if (points.length < 2) {
    code = "// Need at least two points to draw a curve.";
  } else {
    code = "createCanvas(" + width + ", " + height + ");\n";
    code += "beginShape();\n";
    for (let p of points) {
      code += p.toCode();
    }
    code += "endShape();\n";
    code += "// NOTE: You may need to add some extra points to make a smooth closed shape\n";
    code += "//   See the following forum question:\n";
    code += "//     https://forum.processing.org/one/topic/sharp-corners-in-beginshape-with-curvevertex.html\n";
  }

  // Copy to the clipboard using the GClip class.
  //GClip.copy(code);
  //println("Code for curve copied to clipboard");
  console.log(code);
}

function keyPressed() {
  if (key == 'c') {
    copyCodeToClipboard();
  } else if (key == 't') {
    if (pointType == 1) {
      setPointType(0);
    } else {
      setPointType(1);
    }
  } else if (key == '-') {
    deleteSelectedPoint();
  } else if (key == '[') {
    insertPointBefore();
  } else if (key == ']') {
    insertPointAfter();
  } else if (key == ' ') {
    clearPoints();
  } else {
    //save("curve_explorer-screenshot.png");
  }
}