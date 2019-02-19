/**
 * accordion.js - an accordion widget.
 * @author brichard
 **/
var accordion = {
  AccordionToggler: Class.create({
   /**
     Creates a new accordion toggler, wich is a single "tab" in an accordion widget.
       - params - JSON obj of params for this toggle includes:
              id - unique id given to this toggle
              url - AJAX url to dynamically load this toggler's content
              expanded - true/false flag whether this toggle should be initially rendered expanded
              expandMode - How many toggles can be expanded at once: single(default) or multiple
    *
    **/
   initialize: function( params )
   {
     if ( !Event.KEY_ENTER )
     {
       Event.KEY_ENTER = 13;
     }
     if ( !Event.KEY_SPACE )
     {
       Event.KEY_SPACE = 32;
     }

     this.params = Object.extend({ expandMode: "single", url: null}, params.evalJSON());
     this.toggleDiv = $('accordion_toggle_'+this.params.id);
     this.contentDiv = $('accordion_content_'+this.params.id);
     var tabLabel = this.toggleDiv.down('.accordionTabLabel');
     if ( tabLabel && !tabLabel.id )
     {
       tabLabel.id = this.toggleDiv.id + '_label';
     }
     if ( !tabLabel )
     {
       tabLabel = this.toggleDiv;
     }

     this.toggleDiv.parentNode.parentNode.setAttribute( "role", "application" );
     this.toggleDiv.parentNode.setAttribute( "role", "tablist" );
     this.toggleDiv.parentNode.setAttribute( "aria-multiselectable", "true" );
     this.toggleDiv.setAttribute( "role", "tab" );
     this.toggleDiv.setAttribute( "aria-controls", this.contentDiv.id );
     this.contentDiv.setAttribute( "role", "tabpanel" );
     this.contentDiv.setAttribute( "aria-labelledby", tabLabel.id );
     this.toggleDiv.setAttribute( "aria-labelledby", tabLabel.id );
     this.contentDivs = $(this.contentDiv.parentNode).select( 'div.accordion_content' );
     this.toggleDivs = $(this.contentDiv.parentNode).select( 'div.accordion_toggle' );
     this.toggleDiv.addClassName( 'collapsed' );
     this.toggleDiv.setAttribute( "tabIndex", "-1" );
     this.toggleDiv.setAttribute( "aria-selected", "false" );
     this.toggleDiv.setAttribute( "aria-expanded", "false" );
     this.contentDiv.setAttribute( "aria-hidden", "true" );

     if ( this.params.expanded )
     {
       this._onToggle();
       this.toggleDiv.focus();
     }
     this.toggleDiv.observe( 'click', this._onToggle.bindAsEventListener( this ) );
     this.toggleDiv.observe( 'keydown', this._onToggleKeyDown.bindAsEventListener( this ) );
     this.toggleDiv.observe( 'keyPress', this._onToggleKeyPress.bindAsEventListener( this ) );
     this.contentDiv.observe( 'keydown', this._onContentKeyDown.bindAsEventListener( this ) );
   },

   _onContentKeyDown: function( event )
   {
     var key = event.keyCode || event.which;
     switch ( key )
     {
       case Event.KEY_UP:
       {
         if ( event.ctrlKey )
         {
     this.toggleDiv.focus();
         }
       }
    }
   },

   _onToggleKeyDown: function( event )
   {
     var key = event.keyCode || event.which;
     var newToggle;
     switch ( key )
     {
       case Event.KEY_ENTER:
       case Event.KEY_SPACE:
       {
         this._onToggle();
         break;
       }
       case Event.KEY_RIGHT:
       case Event.KEY_DOWN:
       case Event.KEY_HOME:
       {
         newToggle = this.toggleDiv.next( 'div.accordion_toggle' );
         if ( !newToggle || key == Event.KEY_HOME )
         {
           newToggle = this.toggleDivs[0];
         }
         break;
       }
       case Event.KEY_LEFT:
       case Event.KEY_UP:
       case Event.KEY_END:
       {
         newToggle = this.toggleDiv.previous( 'div.accordion_toggle' );
         if ( !newToggle || key == Event.KEY_END )
         {
           newToggle = this.toggleDivs[this.toggleDivs.length-1];
         }
         break;
       }
    }
    if ( newToggle )
    {
      this._selectToggle( newToggle );
      Event.stop( event );
    }
   },

   _onToggleKeyPress: function( event )
   {
     var key = event.keyCode || event.which;
     if ( event.altKey )
     {
       return;
     }
     switch ( key )
     {
       case Event.KEY_ENTER:
       case Event.KEY_SPACE:
       case Event.KEY_RIGHT:
       case Event.KEY_DOWN:
       case Event.KEY_HOME:
       case Event.KEY_LEFT:
       case Event.KEY_UP:
       case Event.KEY_END:
       {
         Event.stop( event );
       }
    }
   },

   _selectToggle: function( toggleDiv )
   {
      this.toggleDivs.each( function( e )
      {
        e.setAttribute( "aria-selected", "false" );
        e.setAttribute( "tabIndex", "-1" );
      } );
      toggleDiv.setAttribute( "aria-selected", "true" );
      toggleDiv.setAttribute( "tabIndex", "0" );
      toggleDiv.focus();
   },

   _onToggle: function( event )
   {
     if ( event )
     {
       Event.stop( event );
     }
     if ( this.params.url )
     {
       new Ajax.Updater( this.contentDiv, this.params.url );
       this.params.url = null;
     }
     var closeThisContentDiv = this.contentDiv.visible();
     if ( this.params.expandMode == "single" || closeThisContentDiv )
     {
       // only a single contentDiv can be visible, close all others
       for (var i = 0; i < this.contentDivs.length; i++)
       {
         if ( this.contentDivs[i].visible() )
         {
           this.toggleDivs[i].addClassName( 'collapsed' );
           this.toggleDivs[i].setAttribute( "aria-expanded", "false" );
           this.contentDivs[i].setAttribute( "aria-hidden", "true" );
           this.contentDivs[i].hide();
         }
       }
     }
     if ( !closeThisContentDiv )
     {
       this.toggleDiv.removeClassName( 'collapsed' );
       this.toggleDiv.setAttribute( "aria-expanded", "true" );
       this.contentDiv.setAttribute( "aria-hidden", "false" );
       this.contentDiv.show();
     }
     this._selectToggle( this.toggleDiv );
   }

  })

};
