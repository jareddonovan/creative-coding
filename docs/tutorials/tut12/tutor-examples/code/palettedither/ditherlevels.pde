boolean dither_0(int x, int y) {
  return false;
}

boolean dither_1(int x, int y) {
  if ( ((x%4 == 0) && (y%4 == 0)) || ((x%4 == 2) && (y%4 == 2)) ) {
    return true;
  } else {
    return false;
  }
}

boolean dither_2(int x, int y) {
  if ( ((x%2 == 0) && (y%2 == 0)) ) {
    return true;
  } else {
    return false;
  }  
}

boolean dither_3(int x, int y) {
  if ( ((x%2 == 0) && (y%2 == 0)) || (((x%4 == 1) && (y%4 == 1)) || ((x%4 == 3) && (y%4 == 3))) ) {
    return true;
  } else {
    return false;
  }  
}

boolean dither_4(int x, int y) {
  if  ( ((x%2 == 0) && (y%2 == 0)) || ((x%2 == 1) && (y%2 == 1)) ) {
    return true;
  } else {
    return false;
  }
}

boolean dither_5(int x, int y) {
  return !dither_3(x,y);  
}

boolean dither_6(int x, int y) {
  return !dither_2(x,y);  
}

boolean dither_7(int x, int y) {
  return !dither_1(x,y);  
}

boolean dither_8(int x, int y) {
  return true;
}