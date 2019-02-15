let points;
let font;
let spacing = 30;
let minMouseDist = 5000;
let txt = "avoidance";

function preload(){
  font = loadFont("data/Roboto-Italic.ttf");
}

function setup(){
  createCanvas(400, 400);

  textFont(font);
  textSize(48);
  textAlign(LEFT);
  
  points = new Array(txt.length);
  for (let i = 0; i < points.length; i++){
		points[i] = new Array(2);
  }
  
  let textW = textWidth(txt);
  let s2 = "";
    
  for(var i = 0; i < txt.length; i++){
    let charPosn = textWidth(s2);
    
    points[i][0] = createVector((width - textW) / 2 + textWidth(s2), height / 2);
    
    s2 = s2 + txt.charAt(i);
    
    console.log("s2: " + s2);
  }
  
  console.log(points);
  
}

function draw(){
  background(0);
  fill(255);

  for(let i = 0; i < points.length; i++){
    let p = points[i][0];
    let p2 = createVector(0, 0);
    
    let mouseDist = dist(p.x, p.y, mouseX, mouseY);
    
    if(mouseDist < minMouseDist){
      p2 = createVector(p.x - mouseX, p.y - mouseY);   
      
      let distDifference = minMouseDist - mouseDist;
      p2.setMag(sqrt(distDifference));
    }

    points[i][1] = p2;
    
    text(txt.charAt(i), p.x + p2.x, p.y + p2.y);
  }

}
