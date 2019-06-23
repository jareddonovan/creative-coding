let data;
let txtCity;
let btnFetch;

function setup() {
  createCanvas(400, 400);
  textSize(100);
  textAlign(CENTER, CENTER);
  
  createElement("BR");
  txtCity = createInput("Brisbane");
  btnFetch = createButton("Fetch");
  btnFetch.mousePressed(fetchData);
  
  fetchData();
}

function draw() {
  background(220);
  
  if (data && data.main && data.main.temp){
    text(data.main.temp, width / 2, height / 2);
  }
}

function fetchData(){
  let city = txtCity.value();
  let req= "https://api.openweathermap.org/data/2.5/weather?q=" +
    city + ",au&units=metric&appid=";
  let appid = "505dd49edaaa17588fe05a7c0441311f";
  
  data = loadJSON(req + appid);
}

