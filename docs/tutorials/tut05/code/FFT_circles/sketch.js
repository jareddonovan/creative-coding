/**
 * Audio: 'Mushrooms' by Komiku
 *        Public Domain. 
 *        http://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/bibliothque
 */

let song;
let fft;

function preload(){
  song = loadSound('assets/Komiku_-_03_-_Mushrooms.mp3');
}

function setup() {
  createCanvas(400, 400);
  song.play();
  fft = new p5.FFT();
  
  stroke(255);
  noFill();  
}

function draw() {
  background(0);
  
  let spectrum = fft.analyze();
  
	for (let i = 0; i < spectrum.length; i++){
    let d = map(spectrum[i], 0, 255, 0, height);

    ellipse(width / 2, height / 2, d);
  }  
  
}