function setup() {
	let c = createCanvas();
  c.hide();
}

function draw() {
  if (random(1) > 0.5){
	  createSpan("/");
  } else {
  	createSpan("\\");
  }
}