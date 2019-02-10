class Tree {

  constructor(left, top, right, bottom, parent) {
    this.parent = parent;

    this.hasChildren = false;
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;

    this.w = right - left;
    this.h = bottom - top;
    this.area = this.w * this.h;
    this.forceThreshold = 400;
    this.isVertical = this.w < this.h;

    this.fill = this.calcFill();

    this.treeA = null;
    this.treeB = null;
  }

  // Calculate an average fill color from the source image based 
  // on the extent of this part of the tree.
  calcFill() {
    let imagePiece = marlon.get(this.left, this.top, this.w, this.h);
    imagePiece.loadPixels();

    let r = 0, g = 0, b = 0;

    for (let i = 0; i < imagePiece.pixels.length; i += 4) {
      r += imagePiece.pixels[i];
      g += imagePiece.pixels[i + 1]; 
      b += imagePiece.pixels[i + 2]; 
    }
    r /= (imagePiece.pixels.length / 4);
    g /= (imagePiece.pixels.length / 4);
    b /= (imagePiece.pixels.length / 4);

    return color(r, g, b);
  }

  inBounds(mX, mY) {
    return (mX > this.left) && (mX < this.right) &&
      (mY > this.top) && (mY < this.bottom);
  }

  inCenterThird(mX, mY) {
    return (mX > this.left + this.w / 3) && (mX < this.right - this.w / 3) &&
      (mY > this.top + this.h / 3) && (mY < this.bottom - this.h / 3);
  }

  processMouseMove(mX, mY, force) {

    force = force || this.area < this.forceThreshold;

    // Only process mouse move if it is in the center of the rect.
    if (this.inBounds(mX, mY)) {
      // Check if I have children. If so, pass on to them.
      if (this.hasChildren) {
        this.treeA.processMouseMove(mX, mY, force);
        this.treeB.processMouseMove(mX, mY, force);
      }
      // Otherwise deal with it myself. But only if in the center third.
      else if (this.inCenterThird(mX, mY) || force) {
        this.divideAt(mX, mY);
      }
    }
  }

  divideAt(mX, mY) {

    // Check for out of bounds
    if (!this.inBounds(mX, mY)) {
      return;
    }

    // If the tree has children, pass the click on to the appropriate one of them.
    if (this.hasChildren) {
      this.treeA.divideAt(mX, mY);
      this.treeB.divideAt(mX, mY);
    } else {
      // Otherwise, if I don't have any trees, divide myself into A and B trees.
      // Decide whether to divide vertically or horizontally based on my orientation.
      if (this.isVertical) {
        // Divide next layer horizontally
        this.treeA = new Tree(this.left, this.top, this.right, mY, this.parent);
        this.treeB = new Tree(this.left, mY, this.right, this.bottom, this.parent);
      } else {
        // Divide next layer vertically
        this.treeA = new Tree(this.left, this.top, mX, this.bottom, this.parent);
        this.treeB = new Tree(mX, this.top, this.right, this.bottom, this.parent);
      }
      this.hasChildren = true;
    }
  }

  display() {
    // Draw a bounding box around myself.
    fill(this.fill);
    rect(this.left, this.top, this.w, this.h);

    // Display any children
    if (this.hasChildren) {
      this.treeA.display();
      this.treeB.display();
    }
  }
}