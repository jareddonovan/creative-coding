
function basicScale(inG, scaleFactor) {
  let out = createGraphics(inG.width*scaleFactor, inG.height*scaleFactor);
  //out.beginDraw();

  //iterate through original pixels
  for (let x = 0; x < inG.width; x++) {
    for (let y = 0; y < inG.height; y++) {

      out.stroke(inG.get(x, y));//sample pixel colour from original image

      //iterate through each pixel in the scaled up "pixel"
      for (let ix = 0; ix < scaleFactor; ix++) {
        for (let iy = 0; iy < scaleFactor; iy++) {

          out.point((x*scaleFactor)+ix, (y*scaleFactor)+iy);//point
        }
      }//end iterate through up-scaled pixel
    }
  }//end interate through original pixels

  //out.endDraw();
  return out;
}

function limitSize(img, maxSize) {
  //if image is bigger than allowable
  if ((img.width > maxSize) || (img.height > maxSize)) { 
    let scaleFactor;
    //find which axis is bigger
    if (img.width > img.height) {//width is biggest 
      scaleFactor = img.width / maxSize;
    } else {//height is biggest OR they're equal
      scaleFactor = img.height / maxSize;
    }
    img.resize(int(img.width/scaleFactor), int(img.height/scaleFactor));
  }
}