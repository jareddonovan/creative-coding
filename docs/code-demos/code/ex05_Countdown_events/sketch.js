/**
 * This sketch demonstrates creating a simple countdown
 * timer. 
 * Youtube video: https://youtu.be/n4fvoZBPoHU
 * Jared Donovan 2019.
 */

// Create a new date for April the first 2020.
// Change this for whatever date you want.
let eventDate = new Date(2020, 3, 1, 0, 0);
let sldCurrentDate;
let birthdayDate = new Date(2019, 6, 20, 0, 0);

function setup() {
  createCanvas(400, 400);
  textSize(50);
  textAlign(LEFT, CENTER);
  sldCurrentDate = createSlider(0, 365, 0);
}

function draw() {
  background(220);
  let eventDay = eventDate.getDay();
  let eventHours = eventDate.getHours();
  let eventMinutes = eventDate.getMinutes();
  let eventSeconds = eventDate.getSeconds();

  let now = new Date();
  now.setDate(now.getDate() + sldCurrentDate.value());

  let nowD = now.getDate();
  let nowM = now.getMonth() + 1;
  let nowY = now.getFullYear();

  // Check whether it is my birthday.
  let bdayD = birthdayDate.getDate();
  let bdayM = birthdayDate.getMonth() + 1;

  console.log("d: ", bdayD, "m: ", bdayM, "nD: ", nowD, "nM: ", nowM);
  
  if (nowD == bdayD && nowM == bdayM) {
    background(255, 0, 0);
    text("happy birthday", 50, height / 2);
  } else {
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
  
  //Draw the current date to the screen.
  text(nowD + "/" + nowM + "/" + nowY, 50, height - 80);
}