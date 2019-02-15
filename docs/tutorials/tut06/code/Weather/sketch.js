/**
 * get 7 day forcast text file from the BOM at location below
 * ftp2.bom.gov.au/anon/gen/fwo/IDA00004.dat
 * text data format contains multiple lines, where data on each line separated by a # 
 * structure is below
 *
 *   loc_id#location#state#forecast_date#issue_date#issue_time#
 *   min_0#max_0#min_1#max_1#min_2#max_2#min_3#max_3#min_4#max_4#min_5#max_5#min_6#max_6#min_7#max_7#
 *   forecast_0#forecast_1#forecast_2#forecast_3#forecast_4#forecast_5#forecast_6#forecast_7#
 *
 */

let lines = [];
let data = [];

let tomorrow;
let f;

function preload() {
  f = loadFont("data/IBMPlexSerif-Regular.ttf");
  // load full text file into an array which is broken up by lines
  // weather forcast has 1 line per location
  // Downloaded from: ftp://ftp2.bom.gov.au/anon/gen/fwo/IDA00100.dat
  lines = loadStrings("data/IDA00100.txt");
}

function setup() {
  createCanvas(500, 250);
  background(0);
  textFont(f);
  textSize(24);
  colorMode(HSB, 255);
}

function draw() {
  background(0);
  fill(255);  
  
  // use split() function with the #
  // note lines[n] is the specifier for the station - line 3 = brisbane
  data = split(lines[3], '#');

  text(data[0], 10, 95);
    
  let temp = int(data[6]); // make it an integer
  
  // use max temp to change hue (this is a v quick mapping and may not be intelligible re actual values
  fill(temp, 255, 255); 
  text(temp + ": " + data[7], 10, 130);
}
