/**
 * This sketch demonstrates creating a simple countdown
 * timer. 
 * Youtube video: https://youtu.be/n4fvoZBPoHU
 * Jared Donovan 2019.
 */

// Create a new date for April the first 2020.
// Change this for whatever date you want.
let eventDate = new Date(2020, 3, 1, 0, 0);
console.log(eventDate);

function setup() {
  createCanvas(400, 400);
  textSize(50);
  textAlign(LEFT, CENTER);
}

function draw() {
  background(220);
  let eventDay = eventDate.getDay();
  let eventHours = eventDate.getHours();
  let eventMinutes = eventDate.getMinutes();
  let eventSeconds = eventDate.getSeconds();
  
  let now = new Date();
  
  let ms = eventDate - now;
  
  // Figure out how many seconds, minutes, hours, days
  // until the event date. 
  let s = int(ms / 1000);
  ms = ms % 1000;
  let m = int(s / 60);
  s = s % 60;
  let h = int(m / 60);
  m = m % 60;
  let d = int(h / 24);
  h = h % 24;
  
  // Draw the number of days, minutes, hours and seconds
  // between now and the event to the canvas.
  text(d + " days", 50, 50);
  text(h + " hours", 50, 100);
  text(m + " minutes", 50, 150);
  text(s + " seconds", 50, 200);
  text("...April the first", 50, 250);
}