// Simple demo of defining an object in a class.
let myCookie;

function setup(){
  createCanvas(150, 150);
  
  // Create a new cookie with sweetness 10 and no icing.
  myCookie = new Cookie(10, false);

  // Use console.log to show some information about the cookie
  console.log("Baked: " + myCookie.isBaked);
  
  // Bake the cookie
  myCookie.bake();  

  // Now the cookie is baked
  console.log("Baked: " + myCookie.isBaked);
}

function draw(){
  background(200);

  // Display the sweetness of the cookie.
  text("Sweetness of the cookie is: " + myCookie.taste(),
    10, 10, 130, 130);
}