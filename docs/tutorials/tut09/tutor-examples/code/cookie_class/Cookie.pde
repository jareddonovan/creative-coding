/**
 * This class defines a 'Cookie' object. 
 * Doesn't do much, but in my imagination it is delicious.
 */
class Cookie {
  
  // The class defines what data the objects need to store. 
  int sweetness = 0;
  boolean hasIcing = false;
  boolean isBaked = false;
  
  // The constructor is a special function that creates a new object of the class.
  Cookie(int sweetness, boolean icing){
    this.sweetness = sweetness;
    this.hasIcing = icing;
  }
  
  // The class also defines functions that the objects can perform
  void bake(){
    this.isBaked = true;
  }
  
  // The functions of the class can also return values just like other functions
  int taste(){
    return this.sweetness; 
  }
  
}
