eesy.define(['jquery-private'], function($) {
  var domIframes = [];
  var mouseoveriframe = null;

  /*
   * Private functions
   */
  function getDomChildIframes(parentFrame) {
    return getDomIframesInIframes($(parentFrame).contents().find('iframe'));
  }
  
  function getDomIframes() {
      return getDomIframesInIframes($("iframe"));
  }
  
  function getDomIframesInIframes(iframes) {
      var tmpDomIframes = [];
  
      iframes.each(function() {
        try {
          var hostname = new RegExp(location.host);
          if (hostname.test(this.src)) {
            var ifrm = $(this).contents().get(0);
            if (ifrm.readyState == "complete") {
              tmpDomIframes.push({
                iframe: ifrm,
                src: ifrm.location.href,
                handled:$(this).contents().find('body').data("eesy")
              });
              tmpDomIframes = tmpDomIframes.concat(getDomChildIframes(this));
            }
          }
        }
        catch(err) {
        }
      });
  
      return tmpDomIframes;
  }
  
  function isIframeInArray(ar, src){
    for(var i = 0; i < ar.length;i++){
      if(ar[i].src == src)
        return true;
    }
    return false;
  }

  
  function setupIframe(ifrm) {
    $(ifrm).find('body').data("eesy",true);
    $(ifrm).mousemove(function(e) {
      $(document).trigger("iframe.mousemove", [ifrm.location.href]);
      return true;
    });
  
    $(ifrm).mouseup(function(e) {
      $(document).trigger("iframe.mouseup", [ifrm.location.href]);
      return true;
    });    

    
  }
  /*
   * Public functions
   */
  function iframeTimer(notFirst) {
      try {
        var changed = false;
        var ar = getDomIframes();
        //
        // find unhandled iframes
        //
        for (var i = 0; i < ar.length; i++) {
          if (!$(ar[i].iframe).contents().find('body').data("eesy")) {
            setupIframe(ar[i].iframe);
            $(document).trigger("iframe.added", [ar[i].iframe]);
            changed = true;
          }
        }
        
        //
        //  figure out if any frames is gone
        //
        for (var i = 0; i < domIframes.length; i++) {
          if (!isIframeInArray(ar,domIframes[i].src)) {
            $(document).trigger("iframe.srcremoved", [domIframes[i].src]);
            changed = true;
          }
        }

        domIframes = ar;
      } finally {
            setTimeout(function() { iframeTimer(true); }, 2000);
      }
  }

  
  function start() {
    $("iframe").mouseover(function(e){
      mouseoveriframe = e.target;
    });
  
    $("iframe").mouseleave(function(e){
        mouseoveriframe = null;
    });
  
    $(window).blur(function(e){
        if(mouseoveriframe != null) {
          $(document).trigger("iframe.focus", [mouseoveriframe]);
        }
    });

    iframeTimer(false);
  }
  
  return {
    start: start
  };
});