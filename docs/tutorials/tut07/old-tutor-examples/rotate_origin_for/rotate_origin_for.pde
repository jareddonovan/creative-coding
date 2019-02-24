// Rotations are made about the origin.
for(int i = 0; i < 90; i += 15){
  rect(0, 0, 90, 5);
  rotate(radians(i));
}

save("rotate_origin_for.png");


