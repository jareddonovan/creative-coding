eesy.define(['jquery-private', 'context-probe', 'context-handling', 'monitor-handling', 
        'events-urlchange', 'events-iframe', 'engine-state', 'keep-alive', 'presentation', 
        'found-items-handler', 'mouse'],
    function($, ctxProbe, ctxHandling, monitorHandling, 
        eventsUrlChange, eventsIframe, engineState, keepAlive, presentation,
        foundItemsHandler, mouse) {
                
  return {
    start: start
  };
          
  function start() {
    engineState.foundNodes.set(foundItemsHandler.create());
    engineState.foundhelpitems.set(foundItemsHandler.create());

    var lookuptimer;

    $(document).ready(function() {
      if (var_show_tab) {
        presentation.showDashboardLinker("dummy");
      }

      ProbeForHelp(getDocumentLocation(document.location.href),$('body'));
      ProbeForNodes(getDocumentLocation(document.location.href),$('body'));

      $(document).mousemove(function(e) {
          handleMouseMove(getDocumentLocation(document.location.href), e);
          return true;
      });

      monitorHandling.checkMonitorCookies();
      ctxProbe.probeForMonitor(getDocumentLocation(document.location.href),$('body'));

      $(document).mouseup(function(e) {
          ctxProbe.probeForMonitor(getDocumentLocation(document.location.href), e.target);
          return true;
      });

      var inUrl = getDocumentLocation(document.location.href);
      
      ctxProbe.probeForPresentContexts(inUrl, 
          ctxHandling.withUrl(inUrl).handlePresentContext);
/*
      if (typeof eesysoftReady == 'function') {
          eesysoftReady();
      }
*/

      //
      //  listening for iframe events
      //
      $(document).on("iframe.mousemove", function(e, href) {
        handleMouseMove(href, e);
        return true;
      });
      $(document).on("iframe.mouseup", function(e, href) {
        ctxProbe.probeForMonitor(href, e.target);
        return true;
      });
      $(document).on("iframe.focus", function(e, ifrm) {
        ctxProbe.probeForMonitor(getDocumentLocation(document.location.href), ifrm);
        return true;
      });

      $(document).on("iframe.added", function(e, ifrm) {
        ProbeForHelp(ifrm.location.href, $(ifrm).find('body'));
        ProbeForNodes(ifrm.location.href, $(ifrm).find('body'));
        ctxProbe.probeForMonitor(ifrm.location.href, $(ifrm).find('body'));
        return true;
      });
      $(document).on("iframe.srcremoved", function(e, href) {
        engineState.foundhelpitems.get().removeFoundItemsWithSource(href);
        engineState.foundNodes.get().removeFoundItemsWithSource(href);
        presentation.helpAvailableNotify();
        monitorHandling.clearTokens();
        return true;
      });
      
      //
      // Listening for presentation events
      //
      $(document).on("presentation.hide.item", function(e) {
        ProbeForHelp(getDocumentLocation(document.location.href), $('body'));            
      });

      //
      // Listening for target application events
      //
      $(document).on("target_application.user_changed", function(e, params) {
        loginUser(params);
      });


      eventsIframe.start();


      //
      // listening for url changes
      //
      $(window).on('urlchanged', eesy_reloadContext);

      eventsUrlChange.start();

      keepAlive.start();
    });
    
    
    function loginUser(params) {
      var userInfo = {
        username: params.userid,
        mail: params.email,
        roles: params.roles.join("#COMMA#"),
        key: __eesy.hostKey
      }
  
      $.post(var_dashboard_url + "/UserLogin.jsp", userInfo, function( loginKey ) {
        var_key = loginKey;

        eesy_initUserValues(function() {
          if (var_show_tab) {
            showDashboardLinker();
          }

          eesy_reloadContext();
        });
      });
    }
    

    function timedLookup() {
      if(!mouse.hintmode) {
        presentation.hideHint();
          ProbeForHelp(mouse.lasturl, mouse.lastelement);
      }
    }

    function handleMouseMove(inurl, e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;

      if (e.target != mouse.lastelement) {
        clearTimeout(lookuptimer);
        mouse.lastelement = e.target;
        mouse.lasturl = inurl;

        mouse.hintmode = presentation.isHint(e.target);
        if (!mouse.hintmode) {
          if ($("#hintcontainer").length > 0) {
            lookuptimer = setTimeout(timedLookup, 1000);
          } else {
            lookuptimer = setTimeout(timedLookup, 10);
          }
        }
      }
    }
    
    function getDocumentLocation(defurl) {
      if (defurl.toUpperCase().indexOf("LAUNCHLINK") > -1) {
        if ($("#eesy_realurl").length) {
          return decodeURIComponent($("#eesy_realurl").html());
        }
      }
      return defurl;
    }
    
    function ProbeForHelp(inurl, element) {
      systrayHandled = false;
    
      ctxProbe.eesy_traversePathForMatchingContexts(inurl, element, 0, function(contextRule) {
        ctxHandling.withUrl(inurl).handleContextLinks(contextRule, element, 0);
      });
    }
    
    function ProbeForNodes(inurl, element) {
      ctxProbe.eesy_traversePathForMatchingContexts(inurl, element, 0, function(contextRule) {      
        $.each(ctxProbe.connectedContextNodeLinks(contextRule), function(i, nodeLink) {
          engineState.foundNodes.get().addFoundItem(nodeLink.nodeId, inurl);
        });
      });
    }
    
    function eesy_reloadContext() {
      presentation.stopEesyTimers();
      $('.eesy_container').remove();
      $('.eesy-highlighted').removeClass('eesy-highlighted');
  
      // TODO remove visible help items (popups etc)
      engineState.foundhelpitems.get().clearFoundItems();
      engineState.foundNodes.get().clearFoundItems();
  
      ProbeForHelp(getDocumentLocation(document.location.href), $('body'));
      ProbeForNodes(getDocumentLocation(document.location.href), $('body'));
      ctxProbe.probeForMonitor(getDocumentLocation(document.location.href),$('body'));    
  
      var inUrl = getDocumentLocation(document.location.href);
    
      ctxProbe.probeForPresentContexts(inUrl, 
          ctxHandling.withUrl(inUrl).handlePresentContext);
    };
  } //main end
});


/*
function openDashboard() {
  var url = var_dashboard_url + "/restapi/service.jsp";
  
  $j_eesy.get(url, {
    u: 'sessionkey',
    p: var_key,
    userUpdate: 'addSessionEvent',
    event_name: 'SUPPORT_TAB_TRIGGERED',
    event_data: JSON.stringify({ url: document.location.href, coursePk1: window.eesy_course_id })
  }, function(){
    window.open(dashu, "", "width=1024,height=800,scrollbars=yes,resizable=yes,menubar=no");
  });
}
*/


