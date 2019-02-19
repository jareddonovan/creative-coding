

var eesy_i=0;


//
//  legacy functionality soon. Must keep for older blackboard version. 
//

function AddJsLoc(loc,iurl){
  if(loc != null){
    if(loc.document.getElementById("eesyengine")==null){
      var fileref=loc.document.createElement("script");
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src",iurl);
      fileref.setAttribute("id","eesyengine");
      loc.document.getElementsByTagName("head")[0].appendChild(fileref);
    } 
  }   
}


function checkTimer(base,showsupporttab,stmp){
try{
  if(document.readyState==="complete"){
    var con = top.content;
    var toptype = top.content.nodeName;
    if (typeof(con.WFS_Files) != "undefined"){
      con = con.WFS_Files;
    }
    if (typeof(toptype) != "undefined"){
      if(toptype.toUpperCase()=="DIV"){
        con = top;
      }
    } else {
      con = top;
    }
    if(con.document.readyState==="complete"){
      var u = con.document.location.href;
      var loadUrl = base+"/loader.jsp?stmp="+stmp+"&listento=top.nav&showquicklink="+showsupporttab+"&k="+k;
      if ( u.indexOf("frameset.jsp") == -1 ) {
        AddJsLoc(con,loadUrl);
      } else {
        con = top.content;
        if(con.document.readyState==="complete"){
          AddJsLoc(con,loadUrl);
        }
      }  
    }
  }
} catch(err){}
  setTimeout("checkTimer('"+base+"','"+showsupporttab+"','"+stmp+"')",1000);
}

 

// dbg: ukey: _335086_1,tmpkey: bb671439-3c79-474d-a73f-bf0c22d67b5b
var k="bb671439-3c79-474d-a73f-bf0c22d67b5b";
var userInfo={};

function eesy_login(){
  $j_eesy.post( "https://qut.eesysoft.com/UserLogin.jsp?", userInfo, function( loginKey ) {
    k = loginKey.trim();
    if (k != ""){
      $j_eesy.get("/webapps/ee-Eesypluginv2-bb_bb60/setSessionKey.jsp?key=" + loginKey);
      setTimeout("checkTimer('https://qut.eesysoft.com','false','20180501092248792')",200);
    }  
  });

}

function eesy_init() {
  eesy_login();
     //grabba informasjonen fra blackboard som vi trenger for å kjøre en userlogin på eesysoft serveren
     //kjøre login slik at vi får en key i return
     //starte sjekktimer 
} 

function eesyStartTimer() {
  if (k == "") {
    // vi maa fetche key for faen....aekkke logga inn...laste jquery...og sette igang en chain of events
    // som skal sørge for at vi har jquery og muligheten til aa herje løs
	if (typeof $j_eesy === "undefined") {
		var fileref = document.createElement("script");
		fileref.setAttribute("type", "text/javascript");
	    fileref.setAttribute("src", "https://qut.eesysoft.com/Scripts/jquery-1.8.0.v2.min.js");
	    document.getElementsByTagName("head")[0].appendChild(fileref);
	} else {
		eesy_init();
	}  
  } else {
    setTimeout("checkTimer('https://qut.eesysoft.com','false','20180501092248792')",200);
  }  
}

eesyStartTimer();
