/**
 *
 * This is a slightly complex example which loads a text 
 * file and then makes a random poem from it.
 * Text taken from following article:
 *   https://www.couriermail.com.au/travel/travel-news/fear-of-flying-boy-now-scared-of-all-travel/news-story/d8d80aa753f2834b2c72c9036ebe2d60?nk=24d2a2ca80a4e9cbe8d83924b43cc76d-1550304155
 */

let lines = [];
let words = [];
let font;

function preload(){
	font = loadFont("data/AnonymousPro-Regular.ttf");

  // TODO: try a URL instead of local file  
  lines = loadStrings("data/article-bly_RYIriH.txt"); 
}

function setup() {
  createCanvas(600, 600);
  fill(255);
  textFont(font);
  textSize(20);
  
  // slice up text from source into array
  for (let i = 0; i < lines.length; i++) {
    let pieces = split(lines[i], " ");

    // Add the pieces to the larger array;
    for (let j = 0; j < pieces.length; j++) {
      let word = pieces[j];
      if (word.length > 0) {
        words = append(words, word);
      }
    }
  }
}

function draw() {
  makePoem();
  noLoop();
}

function mousePressed() {
  makePoem();
  loop();
}

function makePoem() {
  background(51);
  
  let i = 0; 
  let j = 0;
  let sentenceLength = 0;
  let poemLength = min(8, int(5 + random(10)));
  let stanzaLength = int(random(5) + 2);
  let next;
  let word;
  let theLine = "";
  let spacing = "";

  while (poemLength >= 0) {
    next = int(random(words.length));
    word = words[next];

    theLine += spacing + word;
    spacing = " ";
    sentenceLength++;

    // Print out a line every now and again...
    if (sentenceLength > 10 || (random(sentenceLength) > 2.5 && word.length > 1)) {
      text(theLine, 20, (j * 40) + 50 + random(5));
      j++;
      for (let s = int (random (4)); s > 0; s--) {
        spacing += " ";
      }
      theLine = "";
      sentenceLength = 0;
      if (poemLength % stanzaLength == 0) {
        j++;
      }
      poemLength--;
    }
  }
}