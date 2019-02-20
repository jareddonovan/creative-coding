// Simple demo of defining an object in a class.
let myCookie;

function setup(){
  createCanvas(600, 600);
  
  // Create a new cookie with sweetness 10 and no icing.
  myCookie = new Cookie(10, false);
  
  // Bake the cookie
  myCookie.bake();
  
  // Print out the sweetness of the cookie.
  console.log("Sweetness of the cookie is: " + myCookie.taste());
}

function draw(){

}
