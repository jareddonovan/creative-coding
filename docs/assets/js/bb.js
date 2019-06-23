var app = {
	init: function(){
		// Check that there is actually a parent window...
		if (window.parent === window){
      app.doc = window.document;
			return false;
		}

		// Otherwise, there is a parent. Proceed.
		app.bb = window.parent;
		app.doc = app.bb.document;
		app.isAtBb = location.host === "blackboard.qut.edu.au";

		console.log("bb: " + app.bb + ", doc: " + app.doc);

		return app.doc !== null;
	},

	enableTutorialLinks: function(){
    console.log("app.enableTutorialLinks");

    var tut_links = $("ul.dxb211-nav-list li a");
    
    console.log("tut_links: ", tut_links.length);

		var dateNow = new Date();

		tut_links.each(function(i, e){
      // If it is not being hosted at Bb, then swap the links.
			if (!app.isAtBb){
        console.log("swap the links");
				$(e).attr("href", $(e).data("local-link"));
			}

      // Find out when the tutorial is available from
			var availableFrom = new Date($(e).data("availableFrom"));

      // Also check if the link is forced to enabled
      let isEnabled = $(e).data("enabled");

			// Disable link if both tutorial isn't enabled and not yet released.
			if ((!isEnabled && dateNow < availableFrom && app.isAtBb)){
				// $(e).addClass("dxb211-disabled");
				$(e).removeAttr("href");
				$(e).removeAttr("title");
			} else if (!isEnabled && dateNow < availableFrom){
				// $(e).addClass("dxb211-disabled");
      } else {
        $(e).removeClass("dxb211-disabled");
      }
		});

		// Finally, remove the 'display: none' on the parent element.
		// $(app.doc).find("div.unit-nav").removeAttr("style");
	}

	// checkStylesLoaded: function(){
  //   // TODO: See if there is a way for me to save this link locally in site.data ?? 
	// 	var styleSheetLink = "https://blackboard.qut.edu.au/bbcswebdav/courses/DXB211_19se1/_site/assets/css/style.css";
	// 	if (!app.isAtBb){
  //     // TODO: See if I can find a way to get rid of the hard coded unit semester id.
	// 		styleSheetLink = "http://localhost:4000/bbcswebdav/courses/DXB211_19se1/_site/assets/main.css";
	// 	}
	// 	for (var i = 0; i < app.doc.styleSheets.length; i++){
	// 		if (app.doc.styleSheets[i].href === styleSheetLink){
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }
};

$(document).ready(function(){

	console.log("Hello dxb211. Creative coding lets you do things you couldn't otherwise");


	// If the app fails to initialize, print a message and quit.
	if (!app.init()){
		console.log("Boo-hoo... Could not find bb doc: ", app);
	}

	// Otherwise, Just wait for a bit more - until final stylesheet is loaded 
	// before doing last tasks.
	// doAfterStylesLoaded(app.enableTutorialLinks);
	app.enableTutorialLinks();

	// Will execute the callback function after the specified styles are loaded.
	// function doAfterStylesLoaded(callBack){
	// 	var isLoaded = app.checkStylesLoaded();
	// 	if (!isLoaded){
	// 		setTimeout(function(){
	// 			doAfterStylesLoaded(callBack);	
	// 		}, 1000);
	// 	}
	// 	else {
	// 		callBack();
	// 	}
	// }
});

