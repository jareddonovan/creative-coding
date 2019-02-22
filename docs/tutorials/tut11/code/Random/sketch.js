function setup(){
  // The random() function takes either one or two arguments.
  // If you give it a single argument, it will return a random number somewhere
  // between 0 and the number you give.
  let r1 = random(10);

  // The value of r1 will be somewhere between 0 and 10.
  console.log(r1);

  // If you give it two arguments, it will return a random number somewhere
  // between the numbers you give.
  let r2 = random(10, 100);

  // The value of r2 will be somewhere between 10 and 100.
  console.log(r2);
}