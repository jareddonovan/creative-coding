eesy.define(['jquery-private', 'sessionInfo', 'engine-state', 'utils', 'helpitem-loader', 
  'context-links', 'mouse','json!settings-supportcenter'], 
function($, sessionInfo, engineState, utils, helpitemLoader, contextlinks, mouse, settings) {
          
  var hiddenitems = new Object();
  var eesyTimers = [];

  var activeSystrayHid = -1;
  var supportTabAlign = 'right';

  /*
    private functions:
  */
  function eesy_isIE11() {
    return !!navigator.userAgent.match(/Trident.*rv\:11\./);
  }

  function rectangleOf(element) {
    return {
      left: element.offset().left,
      right: element.offset().left + element.width(),
      top: element.offset().top,
      bottom: element.offset().top + element.height()
    };
  }

  function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
  }

  
  function isOrHas(element, selector) {
    return !!element.getAttribute && 
        (!!$(element).parents(selector).length || $(element).is(selector));
  }

  function isHint(elm) {
    return isOrHas(elm, "#hintcontainer");
  }

  function eesy_cookieExists(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return true;
      }
      return false;
  }


  function removeDontShowIfNoUser() {
    // Get rid of "Don't show this again" when not logged in
    
    if (var_key) return;

    $.each([
      'eesy_hint_hide',
      'eesy_hintfixed_dontshowanymore',
      'eesy_standard_hide',
      'eesy_systray_hide',
    ], function(i, elementClass) {
      $('.' + elementClass).hide();
    });
  }
  
  function addVotingBar(hid, voting, container, prependTo) {
    // TODO scope to helpitem by ID??
    
    if (voting && voting.enabled) {
      $(prependTo).addClass('voting-enabled').prepend(templates.proactive_voting_bar);
      $(container + ' .quick-survey__answer').data("helpitemId", hid);
      
      if (voting.votedUp) setVoted(container + ' .___positive');
      if (voting.votedDown) setVoted(container + ' .___negative');
    }              
  };

  function setVoted(selector) {
    $(selector).addClass('isSelected isFocusable focusStyleOutline');
  }
  
  function __setTipPresentMode(hid, w, h, title, tip, connectTo, voting, user, shouldDisplay) {
    if (shouldDisplay && !shouldDisplay(hid)) return;

    if (hid in hiddenitems) {
      $('#systraycontainer_'+hid).fadeOut('fast');
      $(connectTo).removeClass('eesy-highlighted');
      $('#systraycontainer_'+hid).remove();
      $('#arrow_'+hid).remove();
      return;
    }

    var arrowpos = "";

    $(connectTo).addClass('eesy-highlighted');

    var ct = {
      left: $(connectTo).offset().left,
      top: $(connectTo).offset().top,
      width: $(connectTo).width(),
      height: $(connectTo).height()
    };

    var tt = {
      width: parseInt(w),
      height: parseInt(h)
    };

    var ttCentered = {
      left: ct.left + (ct.width - tt.width) / 2,
      top: ct.top + (ct.height - tt.height) / 2
    };

    var space = {
      below: (ct.top + ct.height + tt.height + 10) < $(window).scrollTop() + $(window).height(),
      above: (ct.top - tt.height - 10) > $(window).scrollTop(),
      right: (ct.left + ct.width + tt.width + 10) < $(window).scrollLeft() + $(window).width(),
      left: (ct.left - tt.width - 10) > $(window).scrollLeft()
    };

    var canCenter = {
      x: (ttCentered.left >= 0)
          && ((ttCentered.left + tt.width) < $("body").width())
          && (space.below || space.above),
      y: (ttCentered.top >= 0)
          && ((ttCentered.top + tt.height) < $("body").height())
          && (space.left || space.right)
    };

    var xpos = 0;
    var ypos = 0;

    if (canCenter.x) {
      xpos = ttCentered.left;

      if (space.below) {
        arrowpos = "up";
        ypos = ct.top + ct.height + 10;
      } else {
        arrowpos = "down";
        ypos = ct.top - tt.height - 11;
      }
    } else if (canCenter.y) {
      ypos = ttCentered.top;

      if (space.right) {
        arrowpos = "right";
        xpos = ct.left + ct.width + 10;
      } else {
        arrowpos = "left";
        xpos = ct.left - tt.width - 12;
      }
    } else {
      if (space.below && space.right) {
        arrowpos = "up";
        xpos = ct.left < 0 ? 0 : ct.left;
        ypos = ct.top + ct.height + 10;
      } else if (space.below && space.left) {
        arrowpos = "up";
        xpos = (ct.left + ct.width > $("body").width() ? $("body").width()
                : ct.left + ct.width) - tt.width;
        ypos = ct.top + ct.height + 10;
      } else if (space.above && space.right) {
        arrowpos = "down";
        xpos = ct.left < 0 ? 0 : ct.left;
        ypos = ct.top - tt.height - 11;
      } else if (space.above && space.left) {
        arrowpos = "down";
        xpos = (ct.left + ct.width > $("body").width() ? $("body").width()
            : ct.left + ct.width) - tt.width;
        ypos = ct.top - tt.height - 11;
      }
    }

    // check if space to show the hint
    if (arrowpos == "") {
      $('#arrow_'+hid).css({'display': 'none'});
      $('#systraycontainer_'+hid).css({'display': 'none'});
    } else {
      if (arrowpos == "right") {
        arrowposleft = ct.left + ct.width + 1;
        arrowpostop = ct.top + ct.height / 2;
      } else if (arrowpos == "left") {
        arrowposleft = ct.left - 11;
        arrowpostop = ct.top + ct.height / 2;
      } else if (arrowpos == "up") {
        arrowposleft = ct.left + ct.width / 2 - 10;
        arrowpostop = ct.top + ct.height;
      } else if (arrowpos == "down") {
        arrowposleft = ct.left + ct.width / 2 - 10;
        arrowpostop = ct.top;
      }
  
      arrowpostop -= 10 + $(window).scrollTop();
      arrowposleft -= $(window).scrollLeft();
  
      $('#systraycontainer_'+hid).css({
        'position': 'absolute',
        'height': h + 'px',
        'width': w + 'px',
        'top': ypos,
        'left': xpos
      });
  
      if ($("#eesy_systray_header_text_"+hid).html() != title) {
        $("#eesy_systray_header_text_"+hid).html(title);      
      }
  
      if ($("#eesy_systray_"+hid).html() != tip) {
        $("#eesy_systray_"+hid).html(tip);      
      }
      
      $('#systraycontainer_'+hid).attr('data-helpitemid', hid);
      
      if (!$('#eesy_systray_footer_'+hid).hasClass('voting-enabled')) {
        addVotingBar(hid, voting, '#systraycontainer_'+hid, '#eesy_systray_footer_'+hid);
      }
      
      $('#arrowInner_'+hid)
          .removeClass('eesyarrow up down left right')
          .addClass('eesyarrow ' + arrowpos);
  
      $('#arrow_'+hid).css({
        'position': 'fixed',
        'height': '10px',
        'width': '10px',
        'top': arrowpostop,
        'left': arrowposleft,
        'z-index' : 100002
      });
  
      var top = ct.top + 2;
      var left = ct.left + 2;
      var bottom = ct.top + ct.height - 2;
      var right = ct.left + ct.width - 2;
  
      var visible = isSameOrChildOf(connectTo, elementFromAdjustedPoint(left, top))
          || isSameOrChildOf(connectTo, elementFromAdjustedPoint(right, top))
          || isSameOrChildOf(connectTo, elementFromAdjustedPoint(left, bottom))
          || isSameOrChildOf(connectTo, elementFromAdjustedPoint(right, bottom));
  
      if (!visible) {
        $('#arrow_'+hid).hide();
        $('#systraycontainer_'+hid).hide();
      } else {
        $('#arrow_'+hid).show();
        $('#systraycontainer_'+hid).show();
      }
  
      user && user.markHelpitemAsSeenThisSession(hid, var_key);
    }
    
    eesyTimers["TipPresentMode"+hid] = setTimeout(function() {
      __setTipPresentMode(hid, w, h, title, tip, connectTo, voting, user, shouldDisplay);
    }, 250);
  }

  var elementFromAdjustedPoint = function(x, y) {
    return document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset);
  };

  var isSameOrChildOf = function(connectTo, fromPoint) {
    if (connectTo == fromPoint) return true;
    var parents = $(fromPoint).parents("*");

    for (var i=0; i<parents.length; i++) {
      if (connectTo == parents[i]) {
        return true;
      }
    }

    return false;
  };

  function positionSystray(w, h, hid) {
    if (hid != activeSystrayHid) return;
    if (!($('#systraycontainer').length)) return;

    var bottomPos = var_tab_version == 2 ? 88 : 20; // Adjust bottom if tab v2

    if (attemptUnobscure) {
      traypos = {
        left: ($("body").width()-20)-w,
        right: $("body").width()-20,
        top: ($(window).height()-20)-h,
        bottom: $(window).height()-bottomPos
      };

      do {
        var obscuringStuff = false;

        $('input').each(function() {
          if (intersectRect(traypos, rectangleOf($(this)))) {
            obscuringStuff = true;

            // nudge left
            traypos.left -= 50;
            traypos.right -= 50;
          }
        });
      } while (obscuringStuff && traypos.right > 0);

      $('#systraycontainer').css({
        'position': 'fixed',
        'height': (traypos.bottom-traypos.top)+'px',
        'width': (traypos.right-traypos.left)+'px',
        'top': traypos.top,
        'left': traypos.left
      });
    } else {
      $('#systraycontainer').css({
        'position': 'fixed',
        'height': h + 'px',
        'width': w + 'px',
        'bottom': bottomPos + 'px',
        'right': '20px'
      });
    }

    eesyTimers["positionSystray" + hid] = setTimeout(function() {
      positionSystray(w, h, hid);
    }, 1000);
  }
  
  function positionTab() {
    if (var_tab_version != 1) return;

    try {
      if ($('#eesy-tab-inner').height() > 0) { // dont position if the image is not loaded yet
        if (supportTabAlign == 'right') {
          try {
            var adjustScrollbar = false;

            adjustScrollbar = adjustScrollbar ||
                ($("#globalNavPageContentArea").get(0).scrollHeight > $("#globalNavPageContentArea").height());

            if (adjustScrollbar) {
              $('#eesy-tab-inner').css('right', scrollbarRightAdjust);
            } else {
              $('#eesy-tab-inner').css('right','0px');
            }
          } catch(e) {
            $('#eesy-tab-inner').css('right','0px');
          }
        }

        $('#eesy-tab-inner').css('margin-top', '-' + ($('#eesy-tab-inner').height() / 2) + 'px');
        $("#eesy-tab-inner").css("display", "inline-block");
      }
    } finally {
      setTimeout(function() {
        positionTab();
      }, 500);
    }
  }

  function updateTabLocker(drawMinimized) {
    var flip = supportTabAlign == 'left';

    var minimizedCode = flip ? 8676 : 8677;
    var maximizedCode = flip ? 8677 : 8676;

    var characterCode = drawMinimized ? minimizedCode : maximizedCode;

    $('#tab-locker').css('background-image',
        'url(//' + $('#eesy-tab-inner').data('host') + '/generateIcon.jsp'
            + '?color=' + encodeURIComponent($('#eesy-tab-inner').data('fg-color'))
            + '&size='+$('#eesy-tab-inner-img').width()
            + '&char='+characterCode+')');
  }

  function RemovePresentationMode(helpitemId){
    for (var ii = 0; ii < contextlinks.length; ii++ ) {
      if (contextlinks[ii].helpitemid == helpitemId) {
        contextlinks[ii].mode = "none";
      }
    }
  }

  function updateHelpitemVote(hid, answer) {
    helpitemLoader.loadHelpItem(hid, function(hi) {
      hi.voting.votedUp = answer;
      hi.voting.votedDown = !answer;
    });
  } 

  function hideHelpitem(hid) {
    if (confirm(var_eesy_lang.LNG.PROACTIVE.CONFIRM_HIDE_MESSAGE)) {
      var_eesy_hiddenHelpItems[hid] = true;

      var url = sessionInfo.dashboardUrl() + "/Scripts/HelpitemHide.jsp?helpitemid=" + hid
              + "&key=" + sessionInfo.sessionKey() + "&callback=jsonHideHelpitem";

      $.ajax({
        type: 'GET',
        url: url,
        async: true,
        jsonpCallback: 'jsonHideHelpitem',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
          helpitemLoader.loadHelpItem(hid, function(hi) {
            hi.visible = "false";
          });
        }
      });
    }
  }

  function hideAndFade(selector, element) {
    hideHelpitem($(selector).data("helpitemid"));
    $(element).parents(".eesy_container").fadeOut('fast');
    $(element).parents(".eesy_container").remove();
  }
      

  
  /*
  public functions:
  */
  function stopEesyTimers() {
    for (var eesyTimer in eesyTimers) {
      clearTimeout(eesyTimers[eesyTimer]);
    }
    
    eesyTimers = [];
  }

  function settip(hid,title,w,h,tip,voting, user, shouldDisplay) {
    if (tip == "") return;
    if (eesy_cookieExists("eesyhinthidden_" + hid + "_" + var_key)) return;    
    if (shouldDisplay && !shouldDisplay(hid)) return;

    $("body").append(templates.hint);
    removeDontShowIfNoUser();

    var xpos = mouse.x + 20;
    if ((xpos + parseInt(w)) > $("body").width()) {
        xpos = mouse.x - 20 - w;
    }

    var ypos = mouse.y + 20;
    if ((ypos + parseInt(h)) > $("body").height()) {
        ypos = mouse.y - 20 - h;
    }

    $('#hintcontainer').css({
      'position': 'absolute',
      'height': h+'px',
      'width': w+'px',
      'top': ypos,
      'left': xpos
    });
    
    $('#hintcontainer').data("helpitemid",hid);
    $("#eesy_hint_header_text").html(title);
    $("#eesy_hint").html(tip);
    $("#hintcontainer").attr('data-helpitemid', hid);
    
    addVotingBar(hid, voting, '#hintcontainer', '#eesy_hint_footer');
    
    $('#hintcontainer').fadeIn('fast');
    
    user && user.markHelpitemAsSeenThisSession(hid, var_key)
  }

  function settippresentmode(hid, w, h, title, tip, connectTo, voting, user, shouldDisplay) {
    if (tip == "") return;
    if (shouldDisplay && !shouldDisplay(hid)) return;

    $("body").after(templates.hintfixed.replace(/_hid\b/g, '_' + hid));
    $('#systraycontainer_'+hid).data("helpitemid", hid);
    $('#systraycontainer_'+hid).data("mode", "present");
    $('#systraycontainer_'+hid).append("<div id='arrow_"+hid+"'><div id='arrowInner_"+hid+"' class='eesyarrow up'><div><div>");
    __setTipPresentMode(hid, w, h, title, tip, connectTo, voting, user, shouldDisplay);
  }

  function hideHint(){
    $("#hintcontainer").remove();
  }
  
  function showhelpRec(hid, w, h, title, tip, voting, user, shouldDisplay) {
    if (tip == "") return;
    if ($('#eesy-standardcontainer').length) return;
    if (shouldDisplay && !shouldDisplay(hid)) return;

    if (settings.SUPPORTCENTER.USEFORMESSAGES) {
      launchSupportTab(hid);	  
    }
    else {

      $("body").append("<div class='eesy_dark' id='eesy-dark-screen'></div>");

      if ($("#eesy-dark-screen").height() < h) {
        h = $("#eesy-dark-screen").height();
      }

      $("body").append(templates.standard);
      removeDontShowIfNoUser();

      $('#eesy-standardcontainer').css('width', w + 'px');

      $("#eesy_content").html(tip);
      $("#eesy-standardcontainer").attr('data-helpitemid', hid);
    
      addVotingBar(hid, voting, '#eesy-standardcontainer', '#eesy-standardcontainer .eesy_footer');
    
      $("#eesy_header_text").html(title);

      $('#eesy-standardcontainer').css({
        'margin-left': -$('#eesy-standardcontainer').width() / 2 + 'px',
        'margin-top': -$('#eesy-standardcontainer').height() / 2 + 'px'
      });
    
      $('#eesy-dark-screen').fadeIn('fast');
      $('#eesy-standardcontainer').fadeIn('fast');
    
    }
    
    user && user.markHelpitemAsSeenThisSession(hid, var_key);
  }

  function showhelpsystray(w, h, title, tip, hid, voting, user, shouldDisplay) {
    if (eesy_cookieExists("eesysystrayhidden_" + hid + "_" + var_key)) return;
    if (shouldDisplay && !shouldDisplay(hid)) return;

    activeSystrayHid = hid;

    $("body").append(templates.systray);
    removeDontShowIfNoUser();

    $("#eesy_systray_header_text").html(title);
    $("#eesy_systray").html(tip);
    $("#systraycontainer").attr('data-helpitemid', hid);
    
    addVotingBar(hid, voting, '#systraycontainer', '#eesy_systray_footer');
    positionSystray(w, h, hid);

    $("#systraycontainer").fadeIn('slow');
    
    user && user.markHelpitemAsSeenThisSession(hid, var_key);
  }

  
  function showhelpEx(hid, w, h, title, tip, voting, user, shouldDisplay) {
    if ($('#eesy-standardcontainer').length) return; // can only be one eesy-standardcontainer

    $('.eesy_dark').remove();
    showhelp(hid, w, h, title, tip, voting, user, shouldDisplay);
    $('#eesy-standardcontainer').data("helpitemid", hid);
  }

  function showhelpRecEx(hid, w, h, title, tip, voting, user, shouldDisplay) {
    showhelpRec(hid, w, h, title, tip, voting, user, shouldDisplay);
    $('#eesy-standardcontainer').data("helpitemid", hid);
  }


  function showhelp(hid, w, h, title, tip, voting, user, shouldDisplay) {
    showhelpRec(hid, w, h, title, tip, voting, user, shouldDisplay);
  }

  function showDashboardLinker(p) {
    $("body").append({ 
      1: templates.dashboardlinker, 
      2: templates.dashboardlinker2
    }[var_tab_version]);
    
    removeDontShowIfNoUser();
    helpAvailableNotify();
    positionTab();
  }

  function helpAvailableNotify() {
    if (!($('#eesy-tab-inner').length)) return;

    var adjX = 2;
    var adjY = 20;

    var numHelpItems = 0;

    if (engineState.foundhelpitems.get().getFoundItemsString() != "") {
      adjY = 10;
      numHelpItems = engineState.foundhelpitems.get().getFoundItemsString().split(",").length;
    }

    var tabData = function(key) { return $('#eesy-tab-inner').data(key) };

    if (var_tab_version == 1) {
      var host = tabData('host');
      var backBorder = parseInt(tabData('bottom-width')) > 0;
      var borderRadius = tabData('border-radius').substring(0, 1);
      var fgColor = encodeURIComponent(tabData('fg-color'));
      var bgColor = encodeURIComponent(tabData('bg-color'));
      supportTabAlign = tabData('align');

      var align = supportTabAlign.toUpperCase();
  
      var borderColor = tabData('border-style') == 'none'
          ? bgColor
          : encodeURIComponent(tabData('border-color'));

      var imageUrl = "//" + host + "/support_tab_image.jsp?"
          + "backBorder=" + backBorder
          + "&borderRadius=" + borderRadius
          + "&borderColor=" + borderColor
          + "&fgColor=" + fgColor
          + "&bgColor=" + bgColor
          + "&align=" + supportTabAlign.toUpperCase()
          + "&numItems=" + numHelpItems
          + "&language=" + var_language
          + "&extraHeightTop=" + ($('#eesy-tab-inner').data('hideable') ? 20 : 0)
          + "&styleChecksum=" + var_eesy_style_checksum;

      $('#eesy-tab-inner-img').one("load", function() {
          var width = $(this).width();
          var height = $(this).height();

          var maximizedWidth = eesy_maximizedTabWidth || (width + "px");

          $('#eesy-tab-inner')
              .css('width', "" + (supportTabMinimized ? eesy_minimizedTabWidth : maximizedWidth))
              .css('height', "" + height + "px")
              .css('background-position', supportTabAlign == 'left' ? 'right' : 'left');

          if ($('#eesy-tab-inner').data('hideable')) {
              $('#tab-locker')
                  .css('display', 'block')
                  .css('height', width + 'px');

              updateTabLocker(supportTabMinimized);
          }
      });

      $('#eesy-tab-inner').css('background-image', 'url(' + imageUrl + ')');
      $('#eesy-tab-inner-img').attr('src', imageUrl);
      $("#eesy-tab-inner").css(supportTabAlign, "0px");
    }
  }

  function launchSupportTab(hid) {
    dashu = "";

    eesyRequire( 
        ['supportCenter'], 
        function(supportCenter) {          

      var cid = "&cid=-1";
      if (!(typeof eesy_course_id === 'undefined')) {
          cid = "&cid=" + eesy_course_id;
      }
    
    
      if (engineState.foundhelpitems.get().getFoundItemsString() == "") {
          dashu = var_dashboard_url + "/index.jsp?u=sessionkey&p=" + var_key + cid;
      } else {
          dashu = var_dashboard_url + "/index.jsp?u=sessionkey&p=" 
              + var_key + "&page=helpitems&method=CSI&input=" 
              + engineState.foundhelpitems.get().getFoundItemsString() 
              + cid;
      }
    
      var url = var_dashboard_url + "/restapi/service.jsp";
  
      function reportSupportTabClick(async) {
        $.ajax(url, {
          async: async,
          data: {
            u: 'sessionkey',
            p: var_key,
            userUpdate: 'addSessionEvent',
            event_name: 'SUPPORT_TAB_TRIGGERED',
            event_data: JSON.stringify({ url: document.location.href, coursePk1: window.eesy_course_id })
          }
        });
      }
    
      if (var_open_dashboard_in_new_window) {
        reportSupportTabClick(false);
        window.open(dashu,"","width=1280,height=800,scrollbars=yes,resizable=yes,menubar=no");
      } else {
        reportSupportTabClick(true);
        
        dashu = var_dashboard_url + "/index.jsp?u=sessionkey&p=" 
            + var_key + "&page=style_v2/index&method=CSI&input=" 
            + engineState.foundhelpitems.get().getFoundItemsString() 
            + cid;
    
        //sessionInfo.init(var_dashboard_url, var_style_path, var_key);
        
        supportCenter.show(
            engineState.foundhelpitems.get().getFoundItemsString(), 
            engineState.foundNodes.get().getFoundItemsString(), 
            hid);
      }
    });
  }

  /*
   * event listeners
   */
  $(document).ready(function() {

    utils.onClickOrSelectKey('.eesy_hint_close', function(e, localThis) {
      document.cookie = "eesyhinthidden_" + $('#hintcontainer').data("helpitemid") + "_" + var_key + "=true; path=/;";
      $(localThis).parents(".eesy_container").fadeOut('fast');
      $(localThis).parents(".eesy_container").remove();
    });


    utils.onClickOrSelectKey('.eesy_close', function(e, localThis) {
      RemovePresentationMode($('#eesy-standardcontainer').data("helpitemid"));
      $(localThis).parents(".eesy_container").fadeOut('fast');
      $('.eesy_dark').fadeOut('fast');
      $(localThis).parents(".eesy_container").remove();
      $('.eesy_dark').remove();
      $(document).trigger("presentation.hide.item");
    });
    
    utils.onClickOrSelectKey('.eesy_systray_close', function(e, localThis) {
      var mode = $(localThis).closest(".eesy_container").data("mode");
      var helpitemId = $(localThis).closest(".eesy_container").data("helpitemid");
      //document.cookie = "eesysystrayhidden_" + helpitemId + "_" + var_key + "=true; path=/;";
      
      if (mode == "present") {
        hiddenitems[helpitemId] = 1;
      } else {
        RemovePresentationMode(helpitemId);
        $('#systraycontainer').fadeOut('fast');
        $('#systraycontainer').remove();
      }
    });
    
    utils.onClickOrSelectKey('#hintcontainer .eesy_hint_hide', function(e, element) {
      hideAndFade('#hintcontainer', element);      
    });
    
    utils.onClickOrSelectKey('.eesy_systray_hide', function(e, element) {
      hideAndFade('#systraycontainer', element)
    });
    
    utils.onClickOrSelectKey('.eesy_standard_hide', function(e, element) {
      hideAndFade('#eesy-standardcontainer', element);
      
      $('.eesy_dark').fadeOut('fast');
      $('.eesy_dark').remove();
      $(document).trigger("presentation.hide.item");
    });
    
    utils.onClickOrSelectKey('.eesy_hintfixed_dontshowanymore', function(e, localThis) {
      hiddenitems[$(localThis).parents(".eesy_container").data("helpitemid")] = 1;
      hideHelpitem($(localThis).parents(".eesy_container").data("helpitemid"));
    });
    
    // click on one of the voting up/down buttons
    utils.onClickOrSelectKey('.quick-survey__answer', function(e, element) {
      var button = element;
      var answer = $(button).data('answer');
      var hid = $(button).data('helpitemId');
      var data = { sessionkey: var_key, isUp: answer };
      
      $.post(var_dashboard_url + "/rest/helpitems/" + hid + "/votes?sessionkey=" + var_key, data, function() {
        $(button).addClass("isSelected").siblings('.quick-survey__answer').removeClass("isSelected");
        updateHelpitemVote(hid, answer);            
      });
    });
      
    
    
    $(document).on('click', '#eesy-tab-inner', function(e) {
      launchSupportTab();
    });
    
    // TODO can we replace these handlers entirely with css pseudo class selectors? (":hover" etc)
    $(document).on("mouseenter focus", "#eesy-tab-inner", function(e) {
      $('#eesy-tab-inner').addClass("___TabIsFocused");
    });
    
    $(document).on("mouseleave blur", "#eesy-tab-inner", function(e) {
      $('#eesy-tab-inner').removeClass("___TabIsFocused");
    });
    
    $(document).on('keypress', '#eesy-tab-inner', function(e) {
      var code = e.keyCode || e.which;
      if (code === 13) {
        launchSupportTab();      
      }
    });
    
    $(document).on('mouseenter', '#tab-locker', function(e) {
      updateTabLocker(!supportTabMinimized);
    });
    
    $(document).on('mouseleave', '#tab-locker', function(e) {
      updateTabLocker(supportTabMinimized);
    });
    
    $(document).on('click', '#tab-locker', function(e) {
      if ($('#eesy-tab-inner').data('hideable')) {
        supportTabMinimized = !supportTabMinimized;
        updateTabLocker(supportTabMinimized);
        
        var maximizedWidth = eesy_maximizedTabWidth || ($('#eesy-tab-inner-img').width() + "px");
        
        $('#eesy-tab-inner').animate({'width': "" + (supportTabMinimized ? eesy_minimizedTabWidth : maximizedWidth)});
        $.get(var_dashboard_url + "/restapi/service.jsp?u=sessionkey&p=" + var_key
            + "&userUpdate=setMinimized&minimized=" + (supportTabMinimized ? 1 : 0));
        
        return false;
      }
    });
  });
  
  return {
    stopEesyTimers: stopEesyTimers,
    settip: settip,
    settippresentmode: settippresentmode,
    showhelpRec: showhelpRec,
    showhelpsystray: showhelpsystray,
    showhelpEx: showhelpEx,
    showhelpRecEx: showhelpRecEx,
    showhelp: showhelp,
    showDashboardLinker: showDashboardLinker,
    helpAvailableNotify: helpAvailableNotify,
    launchSupportTab: launchSupportTab,
    hideHint: hideHint,
    isHint: isHint
  };
});

