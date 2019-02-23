function findDistance(c1, c2) {
  return pow(red(c1)-red(c2), 2) + pow(green(c1)-green(c2), 2) + pow(blue(c1)-blue(c2), 2);
}

function ditherQuantize(img, palette) {

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {

      let colorSample = img.get(x, y);

      let nearestDistance = 999999;
      let secondNearestDistance = 1000000;
      let nearestCol = color(0);
      let secondNearestCol = color(255);
      
      for (let c of palette) {
        let distance = findDistance(c, colorSample); 
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestCol = c;
        } else {
          if (distance < secondNearestDistance) {
            secondNearestDistance = distance;
            secondNearestCol = c;
          }
        }
      }
      
      if (dither(x, y, nearestDistance,secondNearestDistance)){
          outputGraphic.stroke(secondNearestCol);
        } else {
          outputGraphic.stroke(nearestCol);
        }
        outputGraphic.point(x,y); 
    }
  }
}

function dither(x, y, dist1, dist2){
  let NUM_OF_DITHERS = 9;
  let range = (dist1+dist2)/NUM_OF_DITHERS;
  if (dist1 < range*1) {
    return dither_0(x,y);
  }else if (dist1 < range*2) {
    return dither_1(x,y);
  }else if (dist1 < range*3) {
    return dither_2(x,y);
  }else if (dist1 < range*4) {
      return dither_3(x,y);
  }else if (dist1 < range*5) {
      return dither_4(x,y);
  }else if (dist1 < range*6) {
      return dither_5(x,y);
  }else if (dist1 < range*7) {
    return dither_6(x,y);
  }else if (dist1 < range*8) {
    return dither_7(x,y);
  }else if (dist1 <= range*9) {//less than 255
    return dither_8(x,y);
  } else { //math is bork, something terrible has happened
    console.log("BIG OL' CALC ERROR");
    return false;
  }
  
}