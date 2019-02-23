function setup(){
  createCanvas(400, 400);
}

function draw(){
  background(204);
  for(let x = 20; x < width; x += 40){
    for(let y = 20; y < height; y += 40){
      let r = jitter(20,10);
      ellipse(x, y, r);
    }
  }
}

// Note: The return statement is how the function gives 
//       a result back to us.
function jitter(num, amt){
  return num + random(-amt, amt);
}