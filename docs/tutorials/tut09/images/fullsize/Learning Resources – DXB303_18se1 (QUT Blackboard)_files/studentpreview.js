/** 
 studentpreview.js - master JavaScript file for the Student Preview B2
 */
var studentpreview = {
  /**
   * This method is a wrapper call to create a new light box.
   * 
   * @param title Light box title
   * @param width Light box width
   * @param height Light box height
   * @param openLinkId Id of the <a> element used to invoke displaying the light box
   * @param Id of the <div> element containing the light box content
   */
  createLightBox: function( title, width, height, openLinkId, contentId )
  {
    new lightbox.Lightbox({
      openLink: openLinkId, 
      dimensions: { w: width, h: height },
      title: title,
      contents: { id: contentId, move: true },
      onClose: 'studentpreview.handleIframeContent( false )'
    });
  },
  /**
   * Toggle availability of the radio buttons in the settings light box dialog 
   * when the checkbox is selected.
   */
  toggleRadioButtonEnabled: function()
  {
    if ( $( 'spSettingsExitOverride' ).checked )  
    {
      $$( 'input[type=radio][name=spSettingValue]' )
      .each(function(el) { el.enable();});
    }
    else
    {
      $$( 'input[type=radio][name=spSettingValue]' )
      .each(function(el) { el.disable();});
    }
  }, 
  /**
   * Save the student preview settings selected in the settings light box dialog
   * 
   * @param form Form element from the settings dialog lightbox
   */
  saveSettings: function( form )
  {
    var paramHash    = form.serialize( true );
    var courseId     = paramHash.course_id;
    var exitSetting  = paramHash.spSettingValue;
    var exitOverride = paramHash.spSettingsExitOverride;
    var nonceId      = paramHash['blackboard.platform.security.NonceUtil.nonce.ajax'];

    var params = "course_id=" + courseId;
    if ( typeof exitOverride === 'undefined' )
    {
      exitOverride = 'false';
    }
    else
    {
      params += "&setting=" + exitSetting;
    }
    params += "&exitOverride=" + exitOverride + "&blackboard.platform.security.NonceUtil.nonce.ajax=" + nonceId;
    
    studentpreview.sendAjaxRequest( "/webapps/spreview/saveSettings", params, function() 
    {
      lightbox.closeCurrentLightbox();
      studentpreview.toggleExitLightBoxUsage( exitOverride, exitSetting );
    } );
  },
  /**
   * This toggles usage of the exit light box and if it is being overridden it 
   * will also update the exit preview url to match the users selection.
   * 
   * @param overrideLightBox Boolean flag to determine if the exit light box should be overridden
   * @param courseId         Id of the course in context for the exit override url
   * @param exitSetting      Exit override setting made by the user for the exit override url 
   */
  toggleExitLightBoxUsage: function ( overrideLightBox, exitSetting )
  {
    if ( overrideLightBox === "true" )
    {
      $('student-preview-exit-light-box-link').hide();
      $('student-preview-exit-override-link').show();
      $('student-preview-exit-override-link').onclick = function() {
        studentpreview.exitStudentPreview( exitSetting, overrideLightBox );
      };
    }
    else
    {
      $('student-preview-exit-light-box-link').show();
      $('student-preview-exit-override-link').hide();
    }
  },
  /**
   * If student preview controls (contentWrapper.jsp) are being loaded inside an
   * iframe but not in a top level iframe in Ultra (LRN-118569) then we need to
   * hide all other iframes and make ours 100% height when displaying student
   * preview lightboxes. When closing or dismissing student preview lightboxes
   * we need to do the opposite.
   * 
   * @param hideContent Boolean flag to either hide or display all page content
   */
  handleIframeContent: function( hideContent )
  {
    // Since Ultra loads classic courses in an iframe, checking if we're not in
    // the top window will return false positivies so we need to make sure we're
    // not in the top level iframe before going through sibling iframes when in
    // Ultra.
    if (window.self !== window.top && !page.util.parentWindowIsUltraApp())
    {
      // Loop through current parent's iframes, in case we are trapped 
      // inside several levels if iframe hell.
      for ( var i = 0 ; i < self.parent.frames.length ; i++ )
      {
        var currentFrame = self.parent.frames[i];
        if ( currentFrame.window == window.self )
        {
          // currentFrame is where student preview is loaded
          if ( hideContent )
            currentFrame.frameElement.style.height = '100%'; 
          else
            currentFrame.frameElement.style.height = '80px';
        }
        else
        {
          // currentFrame is one of the other iframes
          if ( hideContent )
            currentFrame.frameElement.addClassName( 'hideoff' );
          else
            currentFrame.frameElement.removeClassName( 'hideoff' );
        }
      }
    }
  },
  
  /**
   * Load the current preview user's owning user's student preview settings for the settings light box dialog
   * 
   * @param courseId Course Id
   */
  loadSettingsDialog: function ( courseId )
  {
    studentpreview.handleIframeContent( true );
    studentpreview.sendAjaxRequest( "/webapps/spreview/loadSettingsDialog", "course_id=" + courseId, function( response )
    {
      $( 'student-preview-settings-dialog-light-box' ).innerHTML = response.responseText;
      studentpreview.toggleRadioButtonEnabled();
    } );
  },
  sendAjaxRequest: function ( url, params, success )
  {
    new Ajax.Request( url,
    {
        method : 'get',
        parameters : params,
        onSuccess : success,
        onFailure : function( response )
        {
          $( 'settingsDialogErrorMsgs' ).innerHTML = response.responseText;
          $( 'settingsDialogErrorMsgs' ).show();
        }
    } );
  },
  /**
   * Show/hide the proper UI elements and animations for entering student preview
   * pause for one second and then submit the form.
   */
  enterStudentPreview: function()
  {
    // Create an overlay to disable the rest of the page
    overlay = new Element('div').addClassName('lb-overlay').setStyle( { opacity: 0 } );
    document.body.appendChild( overlay );
    new Effect.Opacity( overlay, {
      from: 0.0, to: 0.5, duration: 0,
      afterFinish: function()
      {
        $$('body')[0].addClassName('student-preview-mode');
        $('student-preview-control').hide();
        // Show the ribbon and move it in front of the overlay
        $('student-preview-ribbon').show();
        $('student-preview-ribbon').setStyle({ zIndex : 1002 }); 
        // Frame resize animation
        studentpreview.collapseNavFrameAnimation( 0.3 );
        studentpreview.submitFormTargetCheck( $('enterStudentPreviewForm') );
        // Redirect after 1 second pause
        setTimeout(function() {
          $('enterStudentPreviewForm').submit();
        }, 1000);
      } 
    });
  },
  /**
   * Show/hide the proper UI elements and animations for exiting student preview
   * pause for one second and then exit student preview with the given form
   * parameters for exitSetting and rememberSetting.
   */
  exitStudentPreview: function( exitSetting, rememberSetting )
  {
    // Hide the exit dialog, if its visible
    lightbox.hideCurrentLightbox(); 
    
    // Create an overlay to disable the rest of the page 
    overlay = new Element('div').addClassName('lb-overlay').setStyle( { opacity: 0 } );
    document.body.appendChild( overlay );
    new Effect.Opacity( overlay, {
      from: 0.0, to: 0.5, duration: 0, 
      afterFinish: function()
      {
        $$('body')[0].removeClassName('student-preview-mode');
        $('student-preview-control').show();
        $('student-preview-ribbon').hide();
        // Show the exit text and move it in front of the overlay
        $('student-preview-ribbon-exit-transition').show();
        $('student-preview-ribbon-exit-transition').setStyle({ zIndex : 1002 });
        // Frame resize animation
        studentpreview.expandNavFrameAnimation( 0.3 );
        // Redirect after 1 second pause
        setTimeout(function() {
          $( 'exitStudentPreviewForm' ).insert( new Element( 'input',
          {
              'type' : 'hidden',
              'name' : 'exitSetting',
              'value' : exitSetting
          } ) );
          $( 'exitStudentPreviewForm' ).insert( new Element( 'input',
          {
              'type' : 'hidden',
              'name' : 'rememberSetting',
              'value' : rememberSetting
          } ) );
          studentpreview.submitFormTargetCheck( $( 'exitStudentPreviewForm' ) );
          $( 'exitStudentPreviewForm' ).submit();
        }, 1000 );
      } 
    });
  },
  /**
   * Process the exit light box form inputs and then exit preview
   */
  processExitLightBoxForm: function( form )
  {
    var paramHash       = form.serialize( true );
    var exitSetting     = paramHash.exitSetting;
    var rememberSetting = paramHash.rememberSetting;
    
    // The remember setting is optional
    if ( typeof rememberSetting === 'undefined' )
    {
      rememberSetting = 'false';
    }
    studentpreview.exitStudentPreview( exitSetting, rememberSetting );
  },
  /**
   * Collapse the top navFrame and expand the contentFrame
   */
  collapseNavFrameAnimation: function( time )
  {
    if ( this.skipAnimation() ) 
    {
      return;
    }
    var windowHeight = 'height:' + top.document.viewport.getHeight() + 'px;';
    var navFrame = top.document.getElementById('globalNavPageNavArea');
    var contentFrame = top.document.getElementById('globalNavPageContentArea');
    var quickLinksWrap = top.document.getElementById('quick_links_wrap');
    var globalNavBarWrap = top.document.getElementsByClassName('global-nav-bar-wrap')[0];

    navFrame.blindUp({duration:time});

    new Effect.Morph(contentFrame, {
      style: windowHeight, // CSS Properties
      duration: time // Core Effect properties
    });

    globalNavBarWrap.hide();
    
    new Effect.Morph(quickLinksWrap, {
      style: 'top:29px;', // CSS Properties
      duration: time // Core Effect properties
    });
  },

  /**
   * Expand the top navFrame and shrink the contentFrame
   */
  expandNavFrameAnimation: function( time )
  {
    if ( this.skipAnimation() ) 
    {
      return;
    }
    var navFrame = top.document.getElementById('globalNavPageNavArea');
    var quickLinksWrap = top.document.getElementById('quick_links_wrap');

    navFrame.blindDown({duration:time});
    new Effect.Morph(navFrame, {
      style: 'opacity:0.99', // CSS Properties
      duration: time // Core Effect properties
    });

    new Effect.Morph(quickLinksWrap, {
      style: 'top:66px;', // CSS Properties
      duration: time // Core Effect properties
    });
  },
  /**
   * If there are no top navigation elements present, skip the animation.
   * @returns {Boolean}
   */
  skipAnimation: function()
  {
    var navFrame = top.document.getElementById('globalNavPageNavArea');
    var contentFrame = top.document.getElementById('globalNavPageContentArea');
    if ( navFrame !== null && contentFrame !== null )
    {
      return false;
    }    
    return true;
  },
  /**
   * Before submitting a form, this method is called to set the form's target correctly.
   * 
   * @param form Form we are submitting
   */
  submitFormTargetCheck: function( form )
  {
    if (self.parent == window.top)
    {
      // We are inside an iframe which most likely this means we are inside
      // Ultra.
      form.target = "_self";
    } 
    else 
    {
      // Our parent is not the top window which means we aren't in Ultra or we
      // are several levels deep in iframe hell (contentWrapper.jsp). In this
      // case, target should be _parent so the Classic Learn course reloads and
      // we don't escape whatever iframe is containing us.
      form.target = "_parent";
    }
  },
  /**
   * onLoad method to initialize lightboxes and be sure the proper UI elements are displayed. 
   * This is only called when Student Preview is running.
   */
  onLoadUISetUp: function( settingsLightBoxTitle, exitLightBoxTitle )
  {
    if ( $('student-preview-control') !== null )
    {
      $$('body')[0].addClassName('student-preview-mode'); 
      studentpreview.createLightBox( settingsLightBoxTitle, 500, 360,
                                     'student-preview-settings-dialog-light-box-link',
                                     'student-preview-settings-dialog-light-box' );
      studentpreview.createLightBox( exitLightBoxTitle, 500, 440, 
                                     'student-preview-exit-light-box-link',
                                     'student-preview-exit-light-box' );
      studentpreview.collapseNavFrameAnimation( 0.0 );
      
      if ( window.self !== window.top )
      {
        // Force the exit button to hide other iframe content onclick
        $('student-preview-exit-light-box-link').onclick = function() {
          studentpreview.handleIframeContent( true );
        };
      }
    }
  }
};