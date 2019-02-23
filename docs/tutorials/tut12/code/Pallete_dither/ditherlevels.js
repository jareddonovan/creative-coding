function dither_0(x, y) {
  return false;
}

function dither_1(x, y) {
  if ( ((x%4 == 0) && (y%4 == 0)) || ((x%4 == 2) && (y%4 == 2)) ) {
    return true;
  } else {
    return false;
  }
}

function dither_2(x, y) {
  if ( ((x%2 == 0) && (y%2 == 0)) ) {
    return true;
  } else {
    return false;
  }  
}

function dither_3(x, y) {
  if ( ((x%2 == 0) && (y%2 == 0)) || (((x%4 == 1) && (y%4 == 1)) || ((x%4 == 3) && (y%4 == 3))) ) {
    return true;
  } else {
    return false;
  }  
}

function dither_4(x, y) {
  if  ( ((x%2 == 0) && (y%2 == 0)) || ((x%2 == 1) && (y%2 == 1)) ) {
    return true;
  } else {
    return false;
  }
}

function dither_5(x, y) {
  return !dither_3(x,y);  
}

function dither_6(x, y) {
  return !dither_2(x,y);  
}

function dither_7(x, y) {
  return !dither_1(x,y);  
}

function dither_8(x, y) {
  return true;
}