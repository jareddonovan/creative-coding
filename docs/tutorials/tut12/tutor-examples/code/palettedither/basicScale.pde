
PGraphics basicScale(PGraphics in, int scaleFactor) {
  PGraphics out;
  out = createGraphics(in.width*scaleFactor, in.height*scaleFactor);
  out.beginDraw();

  //iterate through original pixels
  for (int x = 0; x < in.width; x++) {
    for (int y = 0; y < in.height; y++) {

      out.stroke(in.get(x, y));//sample pixel colour from original image

      //iterate through each pixel in the scaled up "pixel"
      for (int ix = 0; ix < scaleFactor; ix++) {
        for (int iy = 0; iy < scaleFactor; iy++) {

          out.point((x*scaleFactor)+ix, (y*scaleFactor)+iy);//point
        }
      }//end iterate through up-scaled pixel
    }
  }//end interate through original pixels

  out.endDraw();
  return out;
}

void limitSize(PImage img, float maxSize) {
  //if image is bigger than allowable
  if ((img.width > maxSize) || (img.height > maxSize)) { 
    float scaleFactor;
    //find which axis is bigger
    if (img.width > img.height) {//width is biggest 
      scaleFactor = img.width / maxSize;
    } else {//height is biggest OR they're equal
      scaleFactor = img.height / maxSize;
    }
    img.resize(int(img.width/scaleFactor), int(img.height/scaleFactor));
  }
}