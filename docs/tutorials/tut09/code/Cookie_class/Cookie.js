/**
 * This class defines a 'Cookie' object. 
 * Doesn't do much, but in my imagination it is delicious.
 */
class Cookie {  
  // The constructor is a special function that creates a new object of the class.
  constructor(sweetness, icing){
    // The class defines what data the objects need to store. 
    this.sweetness = sweetness;
    this.hasIcing = icing;
  	this.isBaked = false;    
  }
  
  // The class also defines functions that the objects can perform
  bake(){
    this.isBaked = true;
  }
  
  // The functions of the class can also return values just like other functions
  taste(){
    return this.sweetness; 
  }
  
}