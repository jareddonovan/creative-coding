/**
 * Stores information about a curve point.
 * Can be either curveVertex, or vertex type.
 */
class CurvePoint {
  
  constructor(type, x, y, prev) {
    // TODO: For now, I'm just going to add curveVertices
    this.type = type;
    this.x = x;
    this.y = y;
    this.cx = 0;
    this.cy = 0;
    this.d = 15;
    this.isSelected = false;
    this.prev = prev;

    if (prev != null) {
      this.next = prev.next;
      prev.next = this;
    } 

    if (this.next != null) {
      this.next.prev = this;
    }
  }

  isEndPoint() {
    return (this.prev == null || this.next == null);
  }

  isTransitionFromPrev() {
    return (this.prev != null && this.prev.type != this.type);
  }

  isTransitionToNext() {
    return (this.next != null && this.next.type != this.type);
  }

  display() {
    if (this.type == 0) {
      
      if (this.isTransitionFromPrev()) {
        // Add a 'control point' at the previous point
        curveVertex(this.prev.x, this.prev.y);
        curveVertex(this.prev.x, this.prev.y);
     }
      
       if (this.isEndPoint()) {
         // Add an extra control point for the start/end of the curve.
         curveVertex(this.x, this.y);
       }
      
       // Add the vertex
       curveVertex(this.x, this.y);
      
       if (this.isTransitionToNext()) {
         // Add a 'control point' at the next point
         curveVertex(this.next.x, this.next.y);
         curveVertex(this.next.x, this.next.y);
       }
     } else if (this.type == 1) {
       vertex(this.x, this.y);
     }
  }

  displayPoint() {
    push();
    textAlign(CENTER, CENTER);
    textSize(12);
    
    if (this.type == 0) {
      fill(100, 255, 100);
    } else {
      fill(100, 255, 255);
    }
    
    translate(this.x, this.y);

    stroke(0);
    if (this.isSelected) {
      stroke(255, 0, 0);
    } 

    if (this.isEndPoint()){
      rect(-this.d / 2, -this.d / 2, this.d, this.d);
    }
    else {
      ellipse(0, 0, this.d, this.d);  
    }
  
    fill(0);
    if (this.type == 0) {
      text('c', 0, -2);
    } else {
      text('v', 0, -2);
    }

    pop();
  }

  toCode() {
    let code = "";

    // Curve Vertex type
    if (this.type == 0) {
      if (this.isTransitionFromPrev()) {
        code += this.commentCode("Add a 'control point' to transition between vertex types");
        code += this.curveVertexCode(this.prev.x, this.prev.y);
        code += this.curveVertexCode(this.prev.x, this.prev.y);
      }
      if (this.isEndPoint()) {
        if (this.prev == null){
          code += this.commentCode("Add an extra 'control point' at start of curve");
        }
        code += this.curveVertexCode(this.x, this.y);
        if (this.next == null){
          code += this.commentCode("Add an extra 'control point' at end of curve");        
        }
      }
      code += this.curveVertexCode(this.x, this.y);
      if (this.isTransitionToNext()) {
        code += this.commentCode("Add an extra 'control point' to transition between vertex types");
        code += this.curveVertexCode(this.next.x, this.next.y);
        code += this.curveVertexCode(this.next.x, this.next.y);
      }
    } 
    // Vertex type
    else if (this.type == 1) {
      code += this.vertexCode(this.x, this.y);
    }
    return code;
  }

  setSelected(doSelect) {
    this.isSelected = doSelect;
    if (doSelect) {
      setSelectedPoint(this);
    }
  }

  curveVertexCode(x, y) {
    return "curveVertex(" + x + ", " + y + ");\n";
  }

  vertexCode(x, y) {
    return "vertex(" + x + ", " + y + ");\n";
  }

  commentCode(comment) {
    return "// " + comment + "\n";
  }

  checkMousePressed(mx, my) {
    this.isSelected = (dist(mx, my, this.x, this.y) < this.d / 2.0);
    this.setSelected(this.isSelected);
    return this.isSelected;
  }
}