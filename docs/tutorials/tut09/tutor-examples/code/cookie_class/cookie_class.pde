// Simple demo of defining an object in a class.
Cookie myCookie;

void setup(){
  size(600, 600);
  
  // Create a new cookie with sweetness 10 and no icing.
  myCookie = new Cookie(10, false);
  
  // Bake the cookie
  myCookie.bake();
  
  // Print out the sweetness of the cookie.
  println("Sweetness of the cookie is: " + myCookie.taste());
}

void draw(){

}
