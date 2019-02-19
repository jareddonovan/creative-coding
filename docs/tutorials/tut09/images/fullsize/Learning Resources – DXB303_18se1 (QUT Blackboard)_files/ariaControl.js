if ( !window.ariaControl )
{
  var ariaControl =
  {};

  // adds radio button/group behavior to a container & its child elements
  // (OR tabgroup behavior - very similar behavior... just different aria attributes)
  // params:
  // container - required
  // childSelector - required
  // label - optional accessibility label
  // initialId - initially checked child - optional, default is first child with checkedClass
  // checkedClass - default is 'selected'
  // onclick - if specified, return true; if it handled the click, false; if it did not do anything with it.
  // doClickOnFocus - call onclick when a radio element gets focus - optional, default is true
  // isTabGroup - (Default: false).  If true then the group is setup as a tablist instead of radiogroup
  // isPlainlist - (Default: false).  If istabgroup=false and isplainlist=true then it will currently be treated as a tab group
  //  but is open to change.

  var SKIP_NEXT_DUPLICATE_CLICK_CHECK = 'SKIP_NEXT_CHECK';

  ariaControl.RadioGroup = Class.create();
  ariaControl.RadioGroup.prototype =
  {
      initialize : function( params )
      {
        this._params = Object.extend(
        {
            initialId : null,
            label : null,
            onclick : null,
            checkedClass : 'selected',
            doClickOnFocus : true,
            isTabGroup: false,
            isPlainList: false
        }, params );
        
        if ( this._params.isTabGroup)
        {
          this.SELECTED_ATTR = "aria-selected";
          this.ROLE_PER_ROW = "tab";
          this.CONTAINER_ROLE = "tablist";
        }
        else if (this._params.isPlainList)
        {
          this.SELECTED_ATTR = "x-aria-selected";
          this.ROLE_PER_ROW = "listitem";
          this.CONTAINER_ROLE = "list";
        }
        else
        {
          this.SELECTED_ATTR = "aria-checked";
          this.ROLE_PER_ROW = "radio";
          this.CONTAINER_ROLE = "radiogroup";
        }


        this._doInit();
      },

      _doInit : function()
      {
        this._container = this._params.container;
        this._childElements = this._container.select( this._params.childSelector );

        var activeChild = this._params.initialId ? $( this._params.initialId ) : null;
        this._childElements.each( function( e )
        {
          if ( !activeChild && e.hasClassName( this._params.checkedClass ) )
          {
            activeChild = e;
          }
          if ( e.getAttribute( "role" ) )
          {
            return;
          }
          var checked = ( e == activeChild );
          e.setAttribute( "role", this.ROLE_PER_ROW );
          e.setAttribute( this.SELECTED_ATTR, checked ? "true" : "false" );
          e.setAttribute( "tabIndex", checked ? "0" : "-1" );
          Element[ checked ? 'addClassName' : 'removeClassName' ]( e, this._params.checkedClass );
          e.observe( 'click', this.onClick.bindAsEventListener( this, e ) );
          e.observe( 'keydown', this.onKeyDown.bindAsEventListener( this, e ) );
          e.observe( 'focus', this.onFocus.bindAsEventListener( this, e ) );
        }.bind( this ) );

        this.selectElement( activeChild );

        if ( !this._container.getAttribute( "role" ) )
        {
          if ( !this._container.parentNode.getAttribute( "role" ) )
          {
            this._container.parentNode.setAttribute( "role", "application" );
          }
          this._container.setAttribute( "role", this.CONTAINER_ROLE );
          if ( this._params.label )
          {
            var uid = "lbl_" + new Date().getTime();
            var lbl = new Element( 'h3',
            {
                'class' : 'hideoff',
                id : uid
            } ).update( this._params.label );
            this._container.parentNode.insert(
            {
              top : lbl
            } );
            this._container.setAttribute( "aria-labelledby", uid );
          }
        }
      },

      reinit : function()
      {
        this._params.initialId = null;
        this._doInit();
      },

      onClick : function( event, activeChild )
      {
        // consume the event - browser calls focus()
        var shouldStop = true;
        if ( this._params.onclick && activeChild && !this._params.doClickOnFocus )
        {
          shouldStop = this._params.onclick( activeChild );
        }
        if ( shouldStop && !this.targetHasGlobalHandling(event.target))
        {
          Event.stop( event );
        }
      },
      
      /*
       * If something inside an ariaControl handled aria has global js event handling then it will not be run until
       * after we deal with it here.  To stop 'stopping' the event, add the class hasGlobalHandling to any elements
       * that need to have their click events propagated. 
       */
      targetHasGlobalHandling: function (target)
      {
        return page.util.upToClass(target, 'hasGlobalHandling');
      },

      onFocus : function( event, activeChild )
      {
        var wasAlreadySelected = activeChild && activeChild.hasClassName( this._params.checkedClass );
        this.selectElement( activeChild );
        var reload = ariaControl.shouldSkipNextDuplicateClick();
        if( reload && reload == "true" )
        {
          ariaControl.skipNextDuplicateClick( false );
          wasAlreadySelected = false;
        }
        if ( !wasAlreadySelected && this._params.onclick && activeChild && this._params.doClickOnFocus )
        {
          this._params.onclick( activeChild );
        }
        if ( event )
        {
          Event.stop( event );
        }
      },

      selectElement : function( selElement )
      {
        // loop through elements and unselect them
        this._childElements.each( function( e )
        {
          e.setAttribute( this.SELECTED_ATTR, "false" );
          e.setAttribute( "tabIndex", "-1" );
          e.removeClassName( this._params.checkedClass );
        }.bind( this ) );

        if ( selElement )
        {
          selElement.setAttribute( this.SELECTED_ATTR, "true" );
          selElement.setAttribute( "tabIndex", "0" );
          selElement.addClassName( this._params.checkedClass );
        }
        else if ( this._childElements[ 0 ] )
        {
          this._childElements[ 0 ].setAttribute( "tabIndex", "0" );
        }
        this._selElement = selElement;
      },

      setFocusOnSelectedElement : function()
      {
        if ( this._selElement )
        {
          this._selElement.focus();
        }
      },

      onKeyDown : function( event, activeElement )
      {
        var key = event.keyCode || event.which;
        var selElement;
        switch ( key )
        {
          case Event.KEY_RIGHT:
          case Event.KEY_DOWN:
            selElement = activeElement.next( this._params.childSelector );
            if ( !selElement )
            {
              selElement = this._childElements[ 0 ];
            }
            break;
          case Event.KEY_LEFT:
          case Event.KEY_UP:
            if ( event.ctrlKey && key == Event.KEY_UP )
            {
              break; // allow CTRL+UP to be handled by containing tab panel
            }

            selElement = activeElement.previous( this._params.childSelector );
            if ( !selElement )
            {
              selElement = this._childElements[ this._childElements.length - 1 ];
            }
            break;
        }
        if ( selElement )
        {
          selElement.focus();
          Event.stop( event );
        }
      }

  };

  // adds menu behavior to a container & its child elements
  // params:
  // linkId - required
  // menu - required
  // childSelector - required
  // popup - required
  // firstFocusId - optional id of the first element in the container to receive focus, if not provided, a child element will be used
  // lastFocusId - optional id of the last element in the container to receive focus, if not provided, a child element will be used
  // label - optional accessibility label
  // onclick - optional onclick callback
  // restrictSize - optional flag to reposition/resize popup to fit on screen. Default is false.
  // centerUnderLink - if restrictSize==true and centerUnderLink==true then the popup will try to be positioned centered under the link
  // scrollContent/scrollTrack - optional divs inside popup. Scrollbar needs to be managed by this class when restrictSize of popup (see code).

  ariaControl.Menu = Class.create();
  ariaControl.Menu.prototype =
  {
      initialize : function( params )
      {
        this._params = Object.extend(
        {
            label : null,
            onclick : null,
            restrictSize : false,
            centerUnderLink : false
        }, params );

        if ( !Event.KEY_ENTER )
        {
          Event.KEY_ENTER = 13;
        }
        if ( !Event.KEY_SPACE )
        {
          Event.KEY_SPACE = 32;
        }

        this._doInit();
      },

      _doInit : function()
      {
        this._menu = this._params.menu;
        this._popup =  this._params.popup ? this._params.popup : this._menu;
        this._childElements = this._menu.select( this._params.childSelector );

        this._childElements.each( function( e, index )
        {
          if ( e.getAttribute( "role" ) )
          {
            return;
          }
          e.setAttribute( "role", "menuitem" );
          e.setAttribute( "tabIndex", ( index === 0 ) ? "0" : "-1" );
          e.observe( 'click', this.onClick.bindAsEventListener( this, e ) );
          e.observe( 'keydown', this.onKeyDownMenuItem.bindAsEventListener( this, e ) );
          e.observe( 'focus', this.onFocus.bindAsEventListener( this, e ) );
        }.bind( this ) );

        if ( !this._menu.getAttribute( "role" ) )
        {
          this._menu.parentNode.setAttribute( "role", "application" );
          this._menu.setAttribute( "role", "menu" );
          if ( this._params.label )
          {
            var uid = "lbl_" + new Date().getTime();
            var lbl = new Element( 'h3',
            {
                'class' : 'hideoff',
                id : uid
            } ).update( this._params.label );
            this._menu.parentNode.insert(
            {
              top : lbl
            } );
            this._menu.setAttribute( "aria-labelledby", uid );
          }
        }
        if ( !this._link )
        {
          this._link = $( this._params.linkId );
          this._link.setAttribute( "aria-haspopup", "true" );
          Event.observe( this._link, 'click', this.onClickLink.bindAsEventListener( this ) );
          Event.observe( this._link, 'keydown', this.onKeyDownLink.bindAsEventListener( this ) );
          Event.observe( document.body, "click", this.close.bindAsEventListener( this ) );
          Event.observe( this._popup, 'keydown', this.onKeyDownPopup.bindAsEventListener( this ) );
          this.firstFocusElement =  this._params.firstFocusId ? $( this._params.firstFocusId ) : null;
          this.lastFocusElement =  this._params.lastFocusId ? $( this._params.lastFocusId ) : null;
          if ( this.firstFocusElement && !this.firstFocusElement.visible() )
          {
            this.firstFocusElement = null;
          }
          if ( this.lastFocusElement && !this.lastFocusElement.visible() )
          {
            this.lastFocusElement = null;
          }
          if ( this.firstFocusElement )
          {
            Event.observe( this.firstFocusElement, 'keydown', this.onKeyDownFirstElement.bindAsEventListener( this ) );
          }
          if ( this.lastFocusElement )
          {
            Event.observe( this.lastFocusElement, 'keydown', this.onKeyDownlastElement.bindAsEventListener( this ) );
          }
        }
        if ( this._params.scrollTrack )
        {
            Event.observe( this._params.scrollTrack, 'click', this.stopEventPropagation.bindAsEventListener( this ) );
        }

      },

      reinit : function()
      {
        this._doInit();
      },

      onClick : function( event, activeChild )
      {
        if ( this._params.onclick )
        {
          this._params.onclick( activeChild );
        }
        this.close();
      },

      onClickLink : function( event )
      {
        if ( !this._popup.visible() )
        {
          var e = this.firstFocusElement ? this.firstFocusElement : this.getFocusedChild();
          (function() { e.focus(); }.bind(this).defer());
        }
        page.aria.toggle(this._popup);
        if ( this._popup.visible() && this._params.restrictSize )
        {
          if ( !this.origPopupDimensions )
          {
            this.origPopupDimensions = this._popup.getDimensions();
            this.origPopupOffset = this._popup.viewportOffset();
          }
          var viewDim = document.viewport.getDimensions();
          var h = this.origPopupDimensions.height;
          var w = this.origPopupDimensions.width;
          var t = this.origPopupOffset.top;
          var l = this.origPopupOffset.left;
          if (this._params.centerUnderLink)
          {
            l = this._link.viewportOffset().left + (this._link.getDimensions().width/2) - (w/2);
            if (l < 0)
            {
              l = 0;
            }
          }
          
          var clipFudge = 0;
          if ( t + h > viewDim.height )
          {
            t = Math.max( viewDim.height - h, 0 );
            clipFudge = 20; // fudge factor, mostly due to padding/borders.
          }
          h = Math.min( viewDim.height, t + h ) - t - clipFudge;
          if ( l + w > viewDim.width )
          {
                l = Math.max( viewDim.width - w, 0 );
          }
          w = Math.min( viewDim.width, l + w ) - l;
          if ( !this._params.scrollContent || !this._params.scrollTrack  )
          {
            // no scrollbar, just set popup size/location
            this._popup.setStyle({ top: t + "px", height: h + "px", left: l + "px", width: w + "px" });
          }
          else
          {
            // set popup width/location and set content height so it can be scrolled. Then create/recalc scrollbar
            this._popup.setStyle({ top: t + "px", left: l + "px", width: w + "px" });
            this._params.scrollContent.setStyle({ height: h + "px" });
            if ( this._popup.scrollbar )
            {
              this._popup.scrollbar.recalculateLayout();
            }
            else if ( this._params.scrollContent && this._params.scrollTrack )
            {
              this._popup.scrollbar = new Control.ScrollBar( this._params.scrollContent,  this._params.scrollTrack );
            }
          }
        }
        Event.stop( event );
      },

      stopEventPropagation : function( event )
      {
        // need to stop propagation so document onclick handler will not close the popup
        // can't use Event.stop() here because it prevents default action for element this handler is applied to.
        Event.extend( event );
        event.stopPropagation();
        event.stopped = true;
      },

      close : function()
      {
        if (this._popup.visible())
        {
          this._link.focus();
          page.aria.hide(this._popup);
        }
      },

      onFocus : function( event, activeChild )
      {
        this.selectElement( activeChild );
        if ( event )
        {
          Event.stop( event );
        }
      },

      selectElement : function( selElement )
      {
        // loop through elements and unselect them
        this._childElements.each( function( e )
        {
          if ( e != selElement )
          {
            e.setAttribute( "tabIndex", "-1" );
          }
        }.bind( this ) );

        if ( selElement )
        {
          selElement.setAttribute( "tabIndex", "0" );
        }
        else if ( this._childElements[ 0 ] )
        {
          this._childElements[ 0 ].setAttribute( "tabIndex", "0" );
        }
      },

      getNextChild : function( child )
      {
        for ( var i = 0; i < this._childElements.length; i++ )
        {
          if ( child == this._childElements[ i ] )
          {
            return ( i == this._childElements.length - 1 ) ? this._childElements[ 0 ] : this._childElements[ i + 1 ];
          }
        }
      },

      getPrevChild : function( child )
      {
        for ( var i = 0; i < this._childElements.length; i++ )
        {
          if ( child == this._childElements[ i ] )
          {
            return ( i === 0 ) ? this._childElements[ this._childElements.length - 1 ] : this._childElements[ i - 1 ];
          }
        }
      },

      onKeyDownFirstElement : function( event )
      {
        var key = event.keyCode || event.which;
        switch ( key )
        {
          case Event.KEY_TAB:
            if ( event.shiftKey )
            {
              // wrap to last, if any, else focus on child with tabindex = 0
              var e = this.lastFocusElement ? this.lastFocusElement : this.getFocusedChild();
              e.focus();
              Event.stop( event );
            }
            break;
          default :
            break;
        }
      },

      onKeyDownlastElement : function( event )
      {
        var key = event.keyCode || event.which;
        switch ( key )
        {
          case Event.KEY_TAB:
            if ( !event.shiftKey )
            {
              // wrap to first, if any, else focus on child with tabindex = 0
              var e = this.firstFocusElement ? this.firstFocusElement : this.getFocusedChild();
              e.focus();
              Event.stop( event );
            }
            break;
          default :
            break;
        }
      },

      getFocusedChild : function( )
      {
        for ( var i = 0; i < this._childElements.length; i++ )
        {
          if ( this._childElements[ i ].getAttribute( "tabIndex" ) == "0" )
          {
            return this._childElements[ i ];
          }
        }
      },

      onKeyDownLink : function( event )
      {
        var key = event.keyCode || event.which;
        switch ( key )
        {
          case Event.KEY_DOWN:
          case Event.KEY_UP:
          case Event.KEY_ENTER:
          case Event.KEY_SPACE:
            this.onClickLink( event );
            break;
        }
      },

      onKeyDownPopup : function( event )
      {
        var key = event.keyCode || event.which;
        switch ( key )
        {
          case Event.KEY_ESC:
            this.close();
            Event.stop( event );
            break;
          default :
            break;
        }
      },

      getNextChildThatStartsWith : function( startChr )
      {
        var currentChild = this.getFocusedChild();
        var nextChild = this.getNextChild( currentChild );
        if ( !startChr || !currentChild || !nextChild )
        {
          return null;
        }
        startChr = startChr.toLowerCase();
        while ( nextChild != currentChild )
        {
          if ( nextChild.innerHTML.toLowerCase().startsWith( startChr ) )
          {
            return nextChild;
          }
          nextChild = this.getNextChild( nextChild );
        }
        return null;
      },

      onKeyDownMenuItem : function( event, activeElement )
      {
        var key = event.keyCode || event.which;
        var selElement;
        switch ( key )
        {
          case Event.KEY_RIGHT:
          case Event.KEY_DOWN:
            selElement = this.getNextChild( activeElement );
            break;

          case Event.KEY_LEFT:
          case Event.KEY_UP:
            selElement = this.getPrevChild( activeElement );
            break;

          case Event.KEY_ENTER:
          case Event.KEY_SPACE:
            page.util.fireClick( activeElement );
            Event.stop( event );
            break;

          case Event.KEY_TAB:
            if ( event.shiftKey && !this.firstFocusElement )
            {
              selElement = this.lastFocusElement; // wrap to last, if any
              Event.stop( event ); // swallow event so focus does not jump out of menu
            }
            else if ( !event.shiftKey && !this.lastFocusElement )
            {
              selElement = this.firstFocusElement; // wrap to first, if any
              Event.stop( event ); // swallow event so focus does not jump out of menu
            }
            break;

          default :
            selElement = this.getNextChildThatStartsWith( String.fromCharCode( key ) );
        }
        if ( selElement )
        {
          selElement.focus();
          Event.stop( event );
        }
      }

  };


  ariaControl.skipNextDuplicateClick = function( shouldSkip )
  {
    page.putInSessionStorage( SKIP_NEXT_DUPLICATE_CLICK_CHECK, shouldSkip );
  };

  ariaControl.shouldSkipNextDuplicateClick = function()
  {
    return page.getFromSessionStorage( SKIP_NEXT_DUPLICATE_CLICK_CHECK );
  };

} // end if (!window.ariaControl)
