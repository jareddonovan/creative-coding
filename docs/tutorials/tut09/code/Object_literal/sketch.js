function setup(){
  createCanvas(150, 150);
}

function draw(){
  background(200);

  let ball = {
    x: 75,
    y: 75,
    size: 100,
    color: "#0000FF",
    show: function(){
      fill(this.color);
      ellipse(
        this.x, this.y, this.size, this.size);
    }
  }

  ball.show();
}
