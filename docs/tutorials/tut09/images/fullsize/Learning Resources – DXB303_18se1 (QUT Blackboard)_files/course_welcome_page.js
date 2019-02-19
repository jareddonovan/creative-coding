// Javascript for the Course Welcome Page light-box

var course_welcome_page =
{
    storageKey : 'courseWelcomePage.currentCourseId',

    lbTemplate: '<div id="wizard"><h1 class="lb-header" tabindex="0" >#{title}<a href="javascript:course_welcome_page.onCancelClicked();" class="wizard-close" title="#{closeText}"><span class="hideoff">#{closeText}</span></a></h1><div class="#{lbContentClass}" /><span tabindex="0" class="lb-focustrap"> </span></div>',

    openLb : function( courseId, force )
    {
      var isCourseEntry = this.isCourseEntry( courseId );
      course_welcome_page.isPreview = false;
      if ( force || isCourseEntry )
      {
        this.lb = new lightbox.Lightbox(
        {
            ajax :
            {
                url : '/webapps/blackboard/execute/course/welcomePage',
                params :
                {
                    'cmd' : 'show',
                    'preview' : false,
                    'isCourseEntry' : isCourseEntry,
                    'course_id' : courseId
                },
                loadExternalScripts : true
            },
            title : page.bundle.getString( "courseWelcomePageLbTitle" ),
            showCloseLink : false,
            closeOnBodyClick : false,
            lbContentClass : 'wizard-lc-content',
            lbTemplate: course_welcome_page.lbTemplate
            } );
        this.lb.open();
        this.setCourseEntry( courseId );
      }
      if ( !Event.KEY_ENTER )
      {
        Event.KEY_ENTER = 13;
      }
      if ( !Event.KEY_SPACE )
      {
        Event.KEY_SPACE = 32;
      }
    },

    preview : function( type )
    {
      validateForm(); // populate text-box hidden fields
      course_welcome_page.isPreview = true;
      this.lb = new lightbox.Lightbox(
      {
          ajax :
          {
              url : '/webapps/blackboard/execute/course/welcomePage',
              params :
              {
                  'cmd' : 'show',
                  'type' : type,
                  'preview' : true,
                  'customHelptext' : $F( 'customHelptext' ),
                  'customHelptype' : $F( 'customHelptype' )
              },
              loadExternalScripts : true
          },
          title : page.bundle.getString( "courseWelcomePageLbTitle" ),
          showCloseLink : false,
          closeOnBodyClick : false,
          lbContentClass : 'wizard-lc-content',
          lbTemplate: course_welcome_page.lbTemplate
      } );
      this.lb.open();
    },

    onLoad : function()
    {
     // we need to temporarily expose (display but keep invisible) the container
     // so scrollBar can compute its size properly
       var container = $('course.welcome_page').up('div');
       var sbContent = container.down( 'div.course_welcome_help_content' );
       var sbTrack = container.down( 'div.course_welcome_help_scrollbar_track' );
       page.util.exposeElementForMeasurement( container );
       this.scrollBar = new Control.ScrollBar( sbContent, sbTrack );
       page.util.unExposeElementForMeasurement( container );

       // add focus trap for accordion content divs
       $$('div.accordion_content').each( function( contentDiv )
       {
         var d = new Element('div', { 'tabindex': '0' });
         contentDiv.insert({bottom:d});
         d.observe( 'focus', course_welcome_page.onFocusTrap );
       });
    },

    onFocusTrap : function( event )
    {
      // simulate clicking on next accordion toggle, if any
      var target = Event.element( event );
      var nextContentDiv = target.up('div.accordion_content').next();
      if ( nextContentDiv )
      {
        page.util.fireClick( nextContentDiv );
      }
    },

    onOKClicked : function()
    {
      if ( course_welcome_page.isPreview )
      {
        this.lb.close();
        this.lb = null;
        return;
      }
      var result = validateForm();
      if (!result)
      {
        return;
      }

      if ( this._anyChanges() )
      {
        $('welcomePageForm').submit();
        courseStructure.showLoadingOverwrite();
      }

      this.lb.close();
      this.lb = null;
    },

    _anyChanges : function()
    {
      var changeTheme = course_welcome_page.themePicker && course_welcome_page.themePicker.hasSelectedValueChanged();
      var applyStructure = course_welcome_page.structurePicker && course_welcome_page.structurePicker.hasSelectedValueChanged();
      var origCourseName = $('origCourseName');
      var saveNameDesc = origCourseName && // If we have origCourseName assume we have the rest of the fields
         ((origCourseName.value != $('wizardcourseName').value) || ($('origCourseDesc').value != $('wizardcourseDesctext').value));

      return changeTheme || applyStructure || saveNameDesc;
    },

    onCancelClicked : function()
    {
      this.lb.close();
      this.lb = null;
    },

    saveSetting : function( cb, courseId )
    {
      new Ajax.Request( '/webapps/blackboard/execute/course/welcomePage',
      {
          method : 'post',
          parameters :
          {
              'cmd' : 'saveCoursePreference',
              'courseDisabled' : cb.checked,
              's' : getCookie( 'JSESSIONID' ),
              'course_id' : courseId
          }
      } );
    },

    isCourseEntry : function( courseId )
    {
      var storedValue = ClientCache.getItem( this.storageKey );
      return !storedValue || storedValue != courseId;
    },

    setCourseEntry : function( courseId )
    {
      ClientCache.setItem( this.storageKey, courseId );
    }
};
