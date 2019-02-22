class Cookie {  
  // The constructor is a special function that creates a new object.
  // This constructor takes two arguments: one for the sweetness
  // and one for whether the cookie has icing or not.
  constructor(sweetness, icing){
    // The 'this' keyword refers to the newly created object.
    // Here, we are storing some data inside the object.
    this.sweetness = sweetness;
    this.hasIcing = icing;
    this.isBaked = false;
  }
  
  // The class definition also specifies what functions objects have
  bake(){
    // Functions can reference data inside the object with 'this'
    this.isBaked = true;
  }
  
  // The functions of the class can also return values.
  // This function returns the sweetness of the cookie.
  taste(){
    return this.sweetness;
  }
}