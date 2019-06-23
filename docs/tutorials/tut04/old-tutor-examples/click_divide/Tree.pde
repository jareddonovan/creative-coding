class Tree {
  boolean isVertical;
  boolean hasChildren;
  int left;
  int top;
  int right;
  int bottom;
  int w;
  int h;
  int area;
  int forceThreshold;
  color fill;

  Tree treeA;
  Tree treeB;

  Tree(int left, int top, int right, int bottom) {
    this.hasChildren = false;
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;

    this.w = right - left;
    this.h = bottom - top;
    this.area = w * h;
    this.forceThreshold = 400;
    this.isVertical = w < h;

    this.fill = calcFill();
  }

  // Calculate an average fill color from the source image based 
  // on the extent of this part of the tree.
  color calcFill() {
    PImage imagePiece = marlon.get(left, top, right - left, bottom - top);
    imagePiece.loadPixels();

    int r = 0, g = 0, b = 0;

    for (int i = 0; i < imagePiece.pixels.length; i++) {

      color c = imagePiece.pixels[i];
      r += c>>16&0xFF;
      g += c>>8&0xFF;
      b += c&0xFF;
    }
    r /= imagePiece.pixels.length;
    g /= imagePiece.pixels.length;
    b /= imagePiece.pixels.length;

    return color(r, g, b);
  }
  
  boolean inBounds(int mX, int mY){
    return (mX > left) && (mX < right) && (mY > top) && (mY < bottom); 
  }
  
  boolean inCenterThird(int mX, int mY){
    return (mX > left + w / 3) && (mX < right - w / 3)
      && (mY > top + h / 3) && (mY < bottom - h / 3);
  }
  
  void processMouseMove(int mX, int mY, boolean force){
    
    force = force || area < forceThreshold;
    
    // Only process mouse move if it is in the center of the rect.
    if (inBounds(mX, mY)){
      // Check if I have children. If so, pass on to them.
      if(hasChildren){
        treeA.processMouseMove(mX, mY, force);
        treeB.processMouseMove(mX, mY, force);
      }
      // Otherwise deal with it myself. But only if in the center third.
      else if (inCenterThird(mX, mY) || force){
          divideAt(mX, mY);
      }
    }
  }

  void divideAt(int mX, int mY) {

    // Check for out of bounds
    if (!inBounds(mX, mY)) {
      return;
    }

    // If the tree has children, pass the click on to the appropriate one of them.
    if (hasChildren) {
      treeA.divideAt(mX, mY);
      treeB.divideAt(mX, mY);
    } else {
      // Otherwise, if I don't have any trees, divide myself into A and B trees.
      // Decide whether to divide vertically or horizontally based on my orientation.
      if (isVertical) {
        // Divide next layer horizontally
        treeA = new Tree(left, top, right, mY);
        treeB = new Tree(left, mY, right, bottom);
      } else {
        // Divide next layer vertically
        treeA = new Tree(left, top, mX, bottom);
        treeB = new Tree(mX, top, right, bottom);
      }
      hasChildren = true;
    }
  }

  void display() {
    // Draw a bounding box around myself.
    fill(fill);
    rect(left, top, w, h);

    // Display any children
    if (hasChildren) {
      treeA.display();
      treeB.display();
    }
  }
}