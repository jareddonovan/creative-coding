function getPallette(name){
  if (name == "pico"){
    return [
      color(0,0,0),       //black
      color(32,51,123),   //dark_blue
      color(126,37,83),   //dark_purple
      color(0,144,61),    //dark_green
      color(171,82,54),   //brown
      color(52,54,53),    //dark_gray
      color(194,195,199), //light_gray
      color(255,241,232), //white
      color(255,0,77),    //red
      color(255,155,0),   //orange
      color(255,231,39),  //yellow
      color(0,226,50),    //green
      color(41,173,255),  //blue
      color(132,112,169), //indigo
      color(255,119,168), //pink
      color(255,214,197)  //peach
  	];
  } else if (name == "c64") {
    return [
      color(0,0,0),        //black
      color(255,255,255),  //white
      color(136,0,0),      //red
      color(170,255,238),  //cyan
      color(204,68,204),   //violet
      color(0,204,85),     //green
      color(0,0,170),      //blue
      color(238,238,119),  //yellow
      color(221,136,85),   //orange
      color(102,68,0),     //brown
      color(255,119,119),  //lightred
      color(51,51,51),     //grey1
      color(119,119,119),  //grey2
      color(170,255,102),  //lightgreen
      color(0,136,255),    //lightblue
      color(187,187,187)   //grey3
    ];
  } else if (name == "gb"){
    return [
      color(156,189,15),
      color(140,173,15),
      color(48,98,48),
      color(15,56,15)
    ];
  } else if (name == "nes"){
    return [
      color(124,124,124),
      color(0,0,252),
      color(0,0,188),
      color(68,40,188),
      color(148,0,132),
      color(168,0,32),
      color(168,16,0),
      color(136,20,0),
      color(80,48,0),
      color(0,120,0),
      color(0,104,0),
      color(0,88,0),
      color(0,64,88),
      color(0,0,0),
      color(0,0,0),
      color(0,0,0),
      color(188,188,188),
      color(0,120,248),
      color(0,88,248),
      color(104,68,252),
      color(216,0,204),
      color(228,0,88),
      color(248,56,0),
      color(228,92,16),
      color(172,124,0),
      color(0,184,0),
      color(0,168,0),
      color(0,168,68),
      color(0,136,136),
      color(0,0,0),
      color(0,0,0),
      color(0,0,0),
      color(248,248,248),
      color(60,188,252),
      color(104,136,252),
      color(152,120,248),
      color(248,120,248),
      color(248,88,152),
      color(248,120,88),
      color(252,160,68),
      color(248,184,0),
      color(184,248,24),
      color(88,216,84),
      color(88,248,152),
      color(0,232,216),
      color(120,120,120),
      color(0,0,0),
      color(0,0,0),
      color(252,252,252),
      color(164,228,252),
      color(184,184,248),
      color(216,184,248),
      color(248,184,248),
      color(248,164,192),
      color(240,208,176),
      color(252,224,168),
      color(248,216,120),
      color(216,248,120),
      color(184,248,184),
      color(184,248,216),
      color(0,252,252),
      color(248,216,248),
      color(0,0,0),
      color(0,0,0)
    ];
  } else if (name == "goldfish"){
    return [
      color(105,210,231),
      color(167,219,216),
      color(224,228,204),
      color(243,134,48),
      color(250,105,0)
    ];
  } else if (name == "rainbow"){
    return [
      color(255,0,0),    //red
      color(255,127,0),  //orange
      color(255,255,0),  //yellow
      color(0,255,0),    //green
      color(0,0,255),    //blue
      color(75,0,130),   //indigo
      color(139,0,255),  //violet
      color(255,255,255) //white
    ];
  }
  return [color(255, 0, 0)];
}