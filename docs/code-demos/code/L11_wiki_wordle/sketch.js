let wordCounts = [];

function setup() {
  let c = createCanvas(400, 400);
  let d = select("#cnv");
  c.parent(d);
  
  let paras = selectAll("p", "#ada-content");

  let text = "";
  
  for (let p of paras){
    text += p.html();
  }
  
  wordCounts = getOccurrences(text);
}

function draw() {
  background(220);

  let textY = 0;
  let textB = 10;
  
  for (let i = 0; i < wordCounts.length; i++){
    wc = wordCounts[i];
    let word = wc[0];
    let count = wc[1];
    let textH = count * 2;
    textSize(textH);
    textB += textH;
    text(word, 20, textB);
  }
}

// Splits a string of text into separate words and returns an
// array of ordered pairs where the first item is the word, and
// the second item is the number of times that the word
// appeared in the string.
function getOccurrences(text){ 
  
  // Split the string on word boundaries
  let splitWords = text.split(/\W+/);
  
  // Word counts will be a hash of words and occurrences
  let wordCounts = {};
  
  // Loop over the sorted array and count up the number
  // of times each word appears. As we do this, populate
  // a hash of ordered pairs where the key is the word and
  // the value is the number of occurrences of that word
  for (let w of splitWords){
    let lowerW = w.toLowerCase();
    if (wordCounts[lowerW]){
      wordCounts[lowerW] += 1;
    } else {
      wordCounts[lowerW] = 1;
    }
  }
  
  // Construct a return array of ordered pairs from the 
  // hash of occurrences.
  let sortedWords = [];
  
  for (let [key, value] of Object.entries(wordCounts)) {
    sortedWords.push([key, value]);
  }
  
  // Sort the array of occurrences based on the number of 
  // occurrences, from large to small.
  sortedWords.sort(sortOccurrences);   
  
  return sortedWords;
}

// This function can be used to sort an array of ordered pairs.
// It expects the second item to be a number and the first item
// to be a string. It sorts first on the second item (desc) and
// then on the first iteam (a-z)
function sortOccurrences(a, b){
  if (b[1] === a[1]){
    if (b[0] < a[0]){
      return -1;
    } else {
      return 1;
    }
  } else {
    return b[1] - a[1];
  }
}