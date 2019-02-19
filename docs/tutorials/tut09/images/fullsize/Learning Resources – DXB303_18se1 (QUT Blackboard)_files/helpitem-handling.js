eesy.define(['jquery-private', 'sessionInfo', 'engine-state', 'presentation', 'helpitem-loader', 'json!hipa'], 
    function($, sessionInfo, engineState, presentation, helpitemLoader, hipa) {

  
  $(document).on('helpitemHandle', function(e, opts) {
    handleHelpItem(e.originalEvent.detail, 0);
  });
  
  
  function handleHelpItem(hid, mode, triggedby, user, shouldDisplay) {
    helpitemLoader.loadHelpItem(hid, function(hi) {
      if (hi.itemtype == "Hint") {
        if (mode == 0) { // Context rule mode 0: By mouse move (normal)
            if (hi.visible == "true") {
               presentation.settip(hid, hi.title, hi.width, hi.height, fixEesyLinks(hi.embed), hi.voting, user, shouldDisplay);
            }
        } else if (mode == 1) { // Context rule mode 1: By presence
           presentation.settippresentmode(hid, hi.width, hi.height, hi.title, fixEesyLinks(hi.embed), triggedby, hi.voting, user, shouldDisplay);
        }
      } else if (hi.itemtype == "Message") {
            presentation.showhelpEx(hid, 640, 480, hi.title, "<div class='eesy-proactive-content-box'>"
                      + fixEesyLinks(hi.embed) + "</div>", hi.voting, user, shouldDisplay);
      } else if (hi.itemtype == "Recording") {
            presentation.showhelpRecEx(hid, 640, 480, hi.title, fixEesyLinks(hi.embed), hi.voting, user, shouldDisplay);
      } else if (hi.itemtype == "Systray") {
          if ($('#systraycontainer').length) {
              if ($('#systraycontainer').data("helpitemid") != hid) {
                  $('#systraycontainer').remove();
              }
          }
  
          if (!($('#systraycontainer').length)) {
              presentation.showhelpsystray(hi.width, hi.height, hi.title, fixEesyLinks(hi.embed), hid, hi.voting, user, shouldDisplay);
              $('#systraycontainer').data("helpitemid", hid);
          }
      } else if (hi.itemtype == "HtmlCode") {
              presentation.showhelpRecEx(hid, 640, 480, hi.title, fixEesyLinks(hi.embed), hi.voting, user, shouldDisplay);
      } else if (hi.itemtype == "File") {
            presentation.showhelpRecEx(hid, 640, 480, hi.title, fixEesyLinks(hi.embed), hi.voting, user, shouldDisplay);
      } else if (hi.itemtype == "Link") {
            presentation.showhelpRecEx(hid, 640, 480, hi.title, fixEesyLinks(hi.embed), hi.voting, user, shouldDisplay);
      }
    });
  }

  
  /*
   * Private functions
   */
  function fixEesyLinks(intip) {
    var tip = intip;
    var numchars = "0123456789";

    var idx = tip.indexOf("loadfile:");

    while (idx > -1) {
        var hiid = "";
        if (numchars.indexOf("" + tip.charAt(idx + 9)) > -1) hiid += tip.charAt(idx + 9);
        if (numchars.indexOf("" + tip.charAt(idx + 10)) > -1) hiid += tip.charAt(idx + 10);
        if (numchars.indexOf("" + tip.charAt(idx + 11)) > -1) hiid += tip.charAt(idx + 11);
        if (numchars.indexOf("" + tip.charAt(idx + 12)) > -1) hiid += tip.charAt(idx + 12);
        var opencall = var_loadfile + "?fileid=" + hiid;
        tip = tip.replace("loadfile:" + hiid, opencall);
        idx = tip.indexOf("loadfile:");
    }

    return tip;
  }

  /*
   * Public functions
   */

  function markHelpitemAsSeen(helpItemId) {
    $.ajax({
       url: sessionInfo.dashboardUrl() + "/rest/helpitems/" + helpItemId + "/viewed?sessionkey=" + sessionInfo.sessionKey(),
       type: 'PUT',
       success: function(data){}
    });
  }

  function handleContextLink(cl, mode, triggedby, src) {
      var user = (function() {

        return {
            hasHiddenHelpitem: function(helpItemId) {
                return var_eesy_hiddenHelpItems[helpItemId];
            },
            hasSeenHelpitemThisSession: function(helpItemId, sessionKey) {
                return var_eesy_helpitemsSeen[helpItemId] == sessionKey;
            },
            hasSeenHelpitemBefore: function(helpItemId) {
                return var_eesy_helpitemsSeen[helpItemId] != undefined;
            },
            markHelpitemAsSeenThisSession: function(helpItemId, sessionKey) {
                if (var_eesy_helpitemsSeen[helpItemId] != sessionKey) {
                    var_eesy_helpitemsSeen[helpItemId] = sessionKey;
                    markHelpitemAsSeen(helpItemId, sessionKey);                  
                }
            }
        };
      } ());

      if (!hasAccessToHelpitem(cl.helpitemid)) {
        return; // no access
      }

      if (user.hasHiddenHelpitem(cl.helpitemid)) {
        return; // user has hidden it
      }

      if (cl.mode == "hint") {
        handleHelpItem(cl.helpitemid, mode, triggedby, user, function(hid) {
          return true;
        });
      } else if (cl.mode == "Normal") {
        engineState.foundhelpitems.get().addFoundItem(cl.helpitemid, src);
      } else if (cl.mode == "systray" && !systrayHandled) {
        systrayHandled = true;
        handleHelpItem(cl.helpitemid, mode, triggedby, user, function(hid) {
          return true;
        });
      } else if (cl.mode == "Proactive") {
        handleHelpItem(cl.helpitemid, mode, triggedby, user, function(hid) {
          return !user.hasSeenHelpitemThisSession(hid, sessionInfo.sessionKey());
        });
      } else if (cl.mode == "Proactive Once") {
        handleHelpItem(cl.helpitemid, mode, triggedby, user, function(hid) {
          return !user.hasSeenHelpitemBefore(hid);
        });
      }
  }

  function hasAccessToHelpitem(helpItemId) {
    var h = hipa['' + helpItemId] || [];
    var s = var_eesy_sac;

    for (var i=0; i<h.length; i++) {
        if (s[h[i]]) {
            if(s[h[i]].enabled) {
              return true;  
            }
        }
    }
    return false;
  }

  
  return {
    handleContextLink: handleContextLink,
//    hideHelpitem: hideHelpitem,
    hasAccessToHelpitem: hasAccessToHelpitem
  };
});