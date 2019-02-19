var flyoutform = {};
var formValidator;
var inputTextValidator;

flyoutform.flyoutForms = {};


flyoutform.FlyoutForm = Class.create();
flyoutform.FlyoutForm.prototype =
{
  initialize: function( h )
  {
    this.customPostSubmitHandler = h.customPostSubmitHandler;
    this.customOnSubmitHandler = h.customOnSubmitHandler;
    this.customCallbackObject = h.customCallbackObject;
    this.initializeExtraComponents = h.initializeExtraComponents;

    this.onCloseFocusItem = h.onCloseFocusItem;
    this.formDivId = h.formDivId;
    this.isOpen = false;
    this.resetFormOnOpen = (typeof h.resetFormOnOpen != 'undefined') ? h.resetFormOnOpen : true;
    this.inlineFormContainer = $(h.inlineFormContainerId);
    this.formDiv = $s( this.formDivId );

    var i;

    if( this.formDiv )
    {
      this.form = this.formDiv.getElementsByTagName('form')[0];
      if ( !this.form )
      {
        return;
      }
      var elems = this.form.getElementsByTagName('input');
      this.cancelButton = null;
      this.submitButton = null;
      this.extraControlButtons = [];
      for ( i = 0; i < elems.length; i++ )
      {
        if ( page.util.hasClassName(elems[i], 'flyout_cancel' ) )
        {
          this.cancelButton = $(elems[i]);
        }
        else if ( page.util.hasClassName(elems[i], 'flyout_submit' ) )
        {
          this.submitButton = $(elems[i]);
        }
      }

      if ( this.cancelButton )
      {
        Event.observe( this.cancelButton, "click", this.close.bindAsEventListener( this ) );
      }
      if ( this.submitButton )
      {
        Event.observe( this.submitButton, "click", this.submit.bindAsEventListener( this ) );
      }
      var flyoutFormObj = this;
			doubleSubmit.registerFormSubmitEvents( this.form, function(event)
      {
        return flyoutFormObj.submit(event);
      });
			
	  //LRN-69653: Cannot submit the addContentAreaForm in IE by pressing enter.
	  if ( Prototype.Browser.IE )
	  {
		Event.observe( this.form, "submit", this.submit.bindAsEventListener( this ) );
	  }
	  
      Event.observe( this.form, "keydown", this.onKeyDown.bindAsEventListener( this ) );

      var extraControlButtonIds = h.flyoutButtonIds;
      if ( extraControlButtonIds && this.cancelButton && this.submitButton )
      {
        var controllersDiv = this.submitButton.parentNode;
        for ( i = 0; i < extraControlButtonIds.length; i++ )
        {
          var button = $(extraControlButtonIds[i]);
          if( button )
          {
            Element.remove( button );
            controllersDiv.insertBefore( button, this.submitButton );
            this.extraControlButtons.push( button );
          }
        }
      }

      // Initialize some extra components on the form fields. Like instantiate the auto-complete for a field.
      if ( this.initializeExtraComponents )
      {
        this.initializeExtraComponents();
      }

      this.formValidator = new formValidator.form( this.formDivId, elems, this.submitButton, this.extraControlButtons );

      if ( h.linkId )
      {
        new flyoutform.FlyoutFormLink( h );
      }
      flyoutform.flyoutForms[ this.formDivId ] = this;
      // move the formDiv to the root level of the doc (well, remove it now and add it back when we open it)
      Element.remove(this.formDiv);
    }
  },

  updateSubmitButtonEnable: function( )
  {
    this.formValidator.updateSubmitButtonEnable();
  },

  open : function( flyoutLinkElement, offset )
  {
    // don't open if any other flyout forms are already open
    // check the actual div style display rather than isOpen flag
    for ( var ff in flyoutform.flyoutForms )
    {
      if ( flyoutform.flyoutForms[ ff ].formDiv.style.display == 'block' )
      {
        return;
      }
    }

    this.flyoutLinkElement = flyoutLinkElement;
    if ( !this.isOpen )
    {
      this.isOpen = true;

      if ( !this.inlineFormContainer )
      {
        document.getElementsByTagName( 'body' )[ 0 ].appendChild( this.formDiv );
        this.formDiv.style.display = 'block';

        var actualOffset = Position.cumulativeOffset( this.flyoutLinkElement );
        if ( !offset )
        {
          offset = actualOffset;
        }
        var width = $( this.formDiv ).getWidth();
        if ( !Prototype.Browser.IE )
        {
          var extraWidth = 0, dims = ['borderLeftWidth','borderRightWidth'];
          dims.each( function( d ) { extraWidth += parseFloat( this.formDiv.getStyle( d ) ) || 0; }.bind( this ) );
          width = width + extraWidth;
        }

        var bodyWidth = $( document.body ).getWidth();
        var linkWidth = $( this.flyoutLinkElement ).getWidth();


        // reposition form if it goes off the screen

        // align right edge of flyout form with link button
        if ( page.util.isRTL() )
        {
          this.formDiv.setStyle( {
                                  left : (actualOffset[ 0 ] - ( width - linkWidth )  + ( actualOffset[0] + linkWidth - offset[0] ) ) + "px",
                                  top :offset[ 1 ] + "px"
                                } );

          var newLeft = this.formDiv.cumulativeOffset()[0];
          if ( newLeft < 0 )
          {
            this.formDiv.setStyle( { left: '0px' } );
          }
        }
        else
        {
          //If the left offset + flyout width is > than the document width,
          //then set the offset to be the document width minus the flyout width.
          //If this is reported as a bug later, you can modify the if below,
          //but don't remove the 2nd if below or you will re-introduce negative
          //left offsets.
          if ( offset[ 0 ] + width > bodyWidth )
          {
            offset[ 0 ] = bodyWidth - width;
          }

          //Ensure that there is no negative left offset for LTR
          if( offset[ 0 ] < 0 )
          {
            offset[ 0 ] = 0;
          }

          this.formDiv.setStyle( {
                                  left :offset[ 0 ] + "px",
                                  top :offset[ 1 ] + "px"
                                } );
        }
        if ( !this.modalOverlay )
        {
          this.modalOverlay = new ModalOverlay( this.formDiv );
        }
        this.modalOverlay.setDisplay( true );
      }
      else
      {
        this.inlineFormContainer.insertBefore( this.formDiv, this.inlineFormContainer.firstDescendant() );

        this.inlineFormContainer.setStyle( { paddingTop: 0 } );
        this.formDiv.style.display = 'block';

        $A(this.formDiv.getElementsByTagName('div')).each( function( div ){
          $(div).setStyle( { display: "inline-block",
                             paddingRight: 4 + "px",
                             paddingTop: 0,
                             width: "auto" } );
        } );

        $(this.flyoutLinkElement).addClassName( "liveAreaTab" );
        $(this.flyoutLinkElement.parentNode).setStyle( { zIndex :1201 } );

      }

      this.formValidator.clearErrorMessages();
      if ( this.resetFormOnOpen )
      {
        var inputs = $( this.form ).getInputs( 'text' );
        for ( var i = 0; i < inputs.length; i++ )
        {
          inputs[ i ].value = '';
        }
        this.form.reset();
      }
      this.updateSubmitButtonEnable();
      setTimeout( this.focusFirstElement.bind( this ), 100 );
    }
  },

  focusFirstElement: function( )
  {
      $(this.form).focusFirstElement();
  },

  onKeyDown: function( event )
  {
  if (event.keyCode == Event.KEY_ESC)
  {
      Event.stop( event );
    this.close();
  }
  },

  close : function( event )
  {
    if ( event )
    {
      Event.stop( event );
    }
    $(this.formDiv).setStyle( { display :"none" } );
    this.formDiv.remove();
    if ( this.modalOverlay )
    {
      this.modalOverlay.setDisplay( false );
    }

    if ( this.onCloseFocusItem && this.onCloseFocusItem.focus )
    {
      this.onCloseFocusItem.focus();
    }
    else if ( this.flyoutLinkElement && this.flyoutLinkElement.focus )
    {
      this.flyoutLinkElement.focus();
    }

    if ( this.inlineFormContainer )
    {
      $(this.flyoutLinkElement).removeClassName( "liveAreaTab" );
      this.flyoutLinkElement.parentNode.removeAttribute("style");
      this.inlineFormContainer.removeAttribute("style");
    }

    this.isOpen = false;
    this.flyoutLinkElement = null;
  },


  submit: function( event )
  {
    if ( event )
    {
      Event.stop( event );
    }
    if ( this.customOnSubmitHandler )
    {
      if ( ! this.customOnSubmitHandler(this.customCallbackObject) )
      {
        return false;
      }
    }
    if ( !this.formValidator.validate() )
    {
      return false;
    }

    $(this.form).request( {
      requestHeaders: { cookie: document.cookie },
      onSuccess: this.afterSubmit.bind( this )
    } );
  },
  
  afterSubmit: function( reply )
  {
    var result = reply.responseText.evalJSON(),
        redirectUrl, queryParams, linkStart;
    if ( result.success )
    {
       if ( this.customPostSubmitHandler )
       {
         // execute the custom handler
         this.close();
         this.customPostSubmitHandler( result );
       }
       else
       {
         // default: refresh the page w/receipt.
         redirectUrl = result.redirectUrl ? result.redirectUrl : document.location.href;
         queryParams = redirectUrl.toQueryParams();
         delete queryParams.inline_receipt_message;
         delete queryParams.inline_receipt_error_msg;

         linkStart = redirectUrl.split("?")[0];
         document.location.href = linkStart + "?" + $H( queryParams ).toQueryString();
       }
    }
    else
    {
      if ( result.validationErrors )
      {
        // There were form validation errors
        var elementToFocusOn = null;
        var formValidator = this.formValidator;
        this.form.getElements().each( function ( elem )
        {
          if ( result.validationErrors[ elem.name ] && formValidator)
          {
            formValidator.setErrorMessage( elem.name, result.validationErrors[ elem.name ] );
            if ( !elementToFocusOn )
            {
              elementToFocusOn = elem;
            }
          }
        });
        if ( elementToFocusOn )
        {
          // focus on the first erroneous form element
          elementToFocusOn.focus();
        }
      }
      else // some sort of real error occurred
      {
        // refresh the page. with an error receipt
        redirectUrl = result.redirectUrl ? result.redirectUrl : document.location.href;
        queryParams = redirectUrl.toQueryParams();
        delete queryParams.inline_receipt_message;
        delete queryParams.inline_receipt_error_msg;

        linkStart = redirectUrl.split("?")[0];
        document.location.href = linkStart + "?" + $H( queryParams ).toQueryString();

      }
    }
  }
};

flyoutform.FlyoutFormLink = Class.create();
flyoutform.FlyoutFormLink.prototype =
{

  initialize: function( h )
  {
    this.linkElement = $(h.linkId);
    this.flyoutFormId = h.formDivId;
    this.openRelativeItem = h.openRelativeItem;

    if( this.linkElement )
    {
      Event.observe( this.linkElement, "click", this.onClick.bindAsEventListener( this ) );
    }
  },

  onClick: function( event )
  {
    var theFlyoutForm = flyoutform.flyoutForms[ this.flyoutFormId ];
    if ( theFlyoutForm )
    {
      var openButton = (this.openRelativeItem) ? this.openRelativeItem : this.linkElement ;
      var offset = Position.cumulativeOffset( openButton );
      offset[1] += openButton.offsetHeight;
      theFlyoutForm.open( this.linkElement, offset );
    }
    if ( event )
    {
      Event.stop( event );
    }
  }
};


formValidator = {};

formValidator.form = Class.create();

formValidator.form.prototype =
{
  initialize: function( formId, formElems, submitButton, extraControlButtons )
  {
    this.formId = formId;
    this.elements = [];

      // formId is actually a div for flyout forms
    this.form = $s( this.formId ).getElementsByTagName( "form" )[ 0 ];
    var elems = formElems;
    this.submitButton = submitButton;
    this.extraControlButtons = extraControlButtons;

    // find all required elements (within li) and add keyup listener to update the submit button enable
    var re = [];
    this.requiredElements = re;
    var reqItems = [], i;
    var lis = this.form.getElementsByTagName( 'li' );
    for ( i = 0; i < lis.length; i++ )
    {
      if ( page.util.hasClassName( lis[ i ], 'required' ) )
      {
        reqItems.push( $( lis[ i ] ) );
      }
    }
    var keyHandler = this.updateSubmitButtonEnable.bindAsEventListener( this );
    // inline form trick, no wrapping li elements so looks for required img for now
    if ( !reqItems || reqItems.length === 0 )
    {
      var reqDecorators = $(this.form).select( 'img[src="' + getCdnURL( "/images/ci/icons/required.gif" ) + '"]' );
      for ( i = 0; i < reqDecorators.length; i++ )
      {
        var fieldDiv = $(reqDecorators[ i ]).up("div.label").next("div.field");
        if ( fieldDiv.down("input") )
        {
          var reqInput =  $(fieldDiv.down("input"));
          if ( reqInput.type === 'file' )
          {
        	Event.observe( reqInput, "change", keyHandler );
          }
          else
          {
        	Event.observe( reqInput, "keyup", keyHandler );
          }
          re.push( reqInput );
        }
      }
    }

    if ( reqItems && reqItems.length > 0 )
    {
      reqItems.each( function( li )
      {
        var reqInput = $( li.getElementsByTagName( 'input' )[ 0 ] );
        if ( reqInput )
        {
          Event.observe( reqInput, "keyup", keyHandler );
          re.push( reqInput );
        }
      } );
    }

    this.updateSubmitButtonEnable();
    var validator = this;
    for ( i = 0; i < elems.length; i++ )
    {
      var elem = elems[ i ];
      if ( elem.tagName.toLowerCase() == 'input' &&
           elem.getAttribute( 'type' ) && elem.getAttribute( 'type' ).toLowerCase() == 'text' &&
           elem.getAttribute( 'validation' ) )
      {
        elem = $( elem );
        var v = eval( '(' + elem.getAttribute( 'validation' ) + ')' );
        v.name = elem.name;
        validator.elements.push( new inputTextValidator( validator.form, v ) );
      }
    }
  },

  clearErrorMessages: function(  )
  {
  this.elements.invoke( "clearErrorMessage" );
  },

  setErrorMessage: function( fieldName, msg )
  {
    this.elements.each( function ( e ) {
    if (e.fieldName == fieldName )
    {
      e.setErrorMessage( msg );
    }
  });
  },

  requiredElementsHaveData: function( )
  {
    var haveData = true;
  if (this.requiredElements)
  {
      this.requiredElements.each( function ( elem )
      {
        if ( elem.value.empty() )
        {
          haveData = false;
        throw $break; // needed to get out of each loop
        }
      });
  }
    return haveData;
  },

  updateSubmitButtonEnable: function( )
  {
    this.updateButtonEnable( this.submitButton );
    // enable some other control buttons moved to control div
    if( this.extraControlButtons.length > 0 )
    {
      $A(this.extraControlButtons).each( function( button ) { this.updateButtonEnable( button ); }.bind(this) );
    }
  },

  updateButtonEnable: function( button )
  {
    if ( !button )
    {
      return;
    }

    if ( this.requiredElementsHaveData() )
    {
      button.removeClassName('disabled');
      button.disabled = false;
    }
    else
    {
      button.addClassName('disabled');
      button.disabled = true;
    }
  },

  validate: function( )
  {
    var isValid = true;
    this.elements.each( function ( e )
    {
      if ( !e.validate() )
      {
        isValid = false;
      }
    });
    return isValid;
  }
};


inputTextValidator = Class.create();

inputTextValidator.prototype =
{
  initialize: function( form, h )
  {
    this.formatElement        = 'document.getElementsByName("'+h.display_format+'")[0]';
    this.focusElement         = h.focus_element; // override element for focus in case of error
    this.fieldName            = h.name;
    this.disable_script       = h.disable_script;
    this.ref_label            = h.ref_label;

    this.custom_alert         = h.custom_alert;
    this.custom_alert_cmp     = h.custom_alert_cmp;

    this.minlength            = h.minlength;
    this.maxlength            = h.maxlength;
    this.trim                 = h.trim;
    this.regex                = h.regex;
    this.regex_msg            = h.regex_msg;
    this.regex_match          = h.regex_match;
    this.verify               = h.verify;
    this.check                = inputTextCheck;
    this.valid_number         = h.valid_number;
    this.min_value        = h.min_value;
    this.nonnegative          = h.nonnegative;
    this.valid_float          = h.valid_float;
    this.allow_negative_float = h.allow_negative_float;
    this.valid_percent        = h.valid_percent;
    this.valid_efloat         = h.valid_efloat; // float with optional exponent
    this.valid_email          = h.valid_email;
    this.valid_url            = h.valid_url;
    this.required_url         = h.required_url;
    this.invalid_chars        = h.invalid_chars; // eg: /[%&#<>=+,]/g
    this.cmp_element          = 'document.getElementsByName("'+h.cmp_field+'")[0]';
    this.cmp_ref_label        = h.cmp_ref_label;
    this.xor                  = h.xor;
    this.cmp_required         = h.cmp_required;
    this.activeX              = h.activeX;   // synch activeX to hidden field before submission
    this.isHtmlDoc            = h.isHtmlDoc; // is portfolio with body and html
    this.img_check            = h.img_check;
    this.empty_value_warn     = h.empty_value_warn;
    this.valid_system_role_id  = h.valid_system_role_id;

    if ( document.all && document.getElementById(h.name+'_ax') )
    {
        this.axobj = document.getElementById(h.name+'_ax');
    }

    this.element = $(form[this.fieldName]);
    var lineItem = this.element.parentNode;
    while ( lineItem && lineItem.tagName.toLowerCase() != 'li' )
    {
      lineItem = lineItem.parentNode;
      if ( lineItem.tagName.toLowerCase() == 'body' )
      {
        lineItem = null;
      }
    }
    this.lineItem = $(lineItem);
    if ( this.lineItem )
    {
      var spans = this.lineItem.getElementsByTagName('span');
      for ( var i = 0; i < spans.length; i++ )
      {
        if( page.util.hasClassName( spans[i], 'fieldErrorText' ) )
        {
          this.errorSpan = $(spans[i]);
          break;
        }
      }
    }
  },

  setErrorMessage: function ( msg )
  {
    if ( this.errorSpan && this.lineItem )
    {
      this.errorSpan.update( msg );
      this.lineItem.addClassName( 'fieldError' );
    }
    else
    {
      //in TextElementTag, ref label was encoded as TextFormat.escape(JsResource.encodeHTML( refLabelValue ) ) for flyoutform
      //in order to work with html markup and validation message
      //hence, has to be unescaped in JS.
      alert( this._unescape(msg) );
    }
  },

  _unescape: function (str )
  {
    return str.replace(/&quot;/g,'"');
  },

  clearErrorMessage: function ( )
  {
    if ( this.errorSpan && this.lineItem )
    {
      this.errorSpan.update( '' );
      this.lineItem.removeClassName( 'fieldError' );
    }
  },

  validate: function ()
  {
    var error = this.getValidationError();
    if ( error.length > 0 )
    {
      this.setErrorMessage( error );
      return false;
    }
    else
    {
      this.clearErrorMessage( );
      return true;
    }
  },

  getValidationError: function ()
  {
    var validationError = '';
    var element = eval(this.element);
    var cmp_element = eval(this.cmp_element);
    if ( typeof element != 'undefined' )
    {
        var re;
        var focusElement = element;
        if ( this.axobj )
        {
            focusElement = this.axobj;
        }

        this.custom_alert     = (typeof this.custom_alert     != 'undefined') ? this.custom_alert     : '';
        this.custom_alert_cmp = (typeof this.custom_alert_cmp != 'undefined') ? this.custom_alert_cmp : '';

        this.ref_label = (typeof this.ref_label != 'undefined') ? this.ref_label
        : JS_RESOURCES.getFormattedString('field_name.substitute', [element.name]);
        var val    = element.value;
        if ( !val.replace(/<p><\/p>/gi,'').trim() )
        {
            val='';
        }

        if ( this.activeX && isEmptyWysiwyg(element) )
        {
            element.value = '';
            val = '';
        }

        if ( typeof eval(this.formatElement) != "undefined" )
        {
            //Check if it is a mathml where;
            if ( /<APPLET ID="(\d+)" NAME="(\w+)"/.test(element.value) )
            {
                if ( getRadioValue(eval(this.formatElement)) == 'P' )
                {
                    if ( !confirm(JS_RESOURCES.getString('validation.plain_text.confirm')) )
                    {
                        element.focus();return false;
                    }
                }
            }
        }

        if ( this.trim )
        {
            val = val.trim();
            element.value = val;
        } //Remove leading & trailing spaces if needed

        if ( typeof cmp_element != 'undefined' )
        {
            if ( this.xor )
            {
                if ( val.trim()=='' ^ cmp_element.value.trim()=='' )
                {
                    if ( val.trim()=='' )
                    {
                        validationError = this.custom_alert ? this.custom_alert :
                               JS_RESOURCES.getFormattedString('validation.cmp_field.required',
                                                               [this.ref_label, this.cmp_ref_label]);
                        shiftFocus(focusElement, this.activeX);
                    }
                    else
                    {
                        validationError = this.custom_alert_cmp ? this.custom_alert_cmp :
                              JS_RESOURCES.getFormattedString('validation.cmp_field.required',
                                                              [this.cmp_ref_label, this.ref_label]);
                        cmp_element.focus();
                    }
                    return validationError;
                }
            }
        }

        if ( this.disable_script )
        {
            if ( typeof eval(this.formatElement) == "undefined" || getRadioValue(eval(this.formatElement)) != 'P' )
            {
                re = /<\s*script/ig;
                var re1 = /<\s*\/\s*script\s*>/ig;
                val = val.replace(re,'<disabled-script');
                val = val.replace(re1,'</disabled-script>');
                var re2 = /href\s*=\s*(['"]*)\s*javascript\s*:/ig;
                val = val.replace(re2,"href=$1disabled-javascript:");
                element.value = val;
            }
        }

        var trimmedVal, numVal, isValidNum;

        if ( this.valid_number )
        {
            trimmedVal = val.trim();
            //added this check bcoz for numeric fields which are not required, this function was not working
            if ( trimmedVal!="" )
            {
                numVal = parseInt( trimmedVal, 10 );
                isValidNum = !isNaN(numVal);
                if ( isValidNum )
                {
                    isValidNum = !isNaN(numVal) && (numVal.toString().length == trimmedVal.length);
                }
                if ( !isValidNum )
                {
                    validationError = JS_RESOURCES.getFormattedString('validation.number', [this.ref_label]);
                    element.focus();
                    return validationError;
                }
                if (this.nonnegative && numVal<0)
                {
                    validationError = JS_RESOURCES.getFormattedString('validation.negative',[this.ref_label]);
                    element.focus();
                    return validationError;
                }
                if (this.min_value && numVal<this.min_value)
                {
                    validationError = JS_RESOURCES.getFormattedString('validation.invalid_value', [this.ref_label]);
                    element.focus();
                    return validationError;
                }
            }
        }

        if ( this.valid_float )
        {
            trimmedVal = val.trim();

            var numFormat;
            if ( this.allow_negative_float )
            {
                numFormat = LOCALE_SETTINGS.getString('float.allow.negative.format');
            }
            else
            {
                numFormat = LOCALE_SETTINGS.getString('float.format');
            }

            if ( typeof( numFormat ) != 'undefined' )
            {
                //hand parse for l10n
                re = new RegExp( numFormat );
                isValidNum = trimmedVal.search( re ) === 0;
            }
            else
            {
                //try to use platform native (non-localized)
                numVal = parseFloat(trimmedVal);
                isValidNum = !isNaN(numVal);
                if ( isValidNum && numVal.toString().length != trimmedVal.length )
                {
                    /* Allow strings with trailing zeros to pass */
                    re = /^[\.0]+$/;
                    isValidNum = re.test(trimmedVal.substring(numVal.toString().length));
                }
            }
            if ( !isValidNum )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.number', [this.ref_label]);
                element.focus();
                return validationError;
            }
        }

        if ( this.valid_percent )
        {
            if ( !isPercent(val) )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.percent', [this.ref_label]);
                element.focus();
                return validationError;
            }
        }

        if ( this.valid_efloat )
        {
            if ( !isNumeric(val) )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.number', [this.ref_label]);
                var focusElement2 = (this.focusElement ? this.focusElement : this.element);
                if ( focusElement2.focus )
                {
                    focusElement2.focus();
                }
                return validationError;
            }
        }

        if ( this.valid_email )
        {
            if ( val.trim() == '' )
            {
                if ( confirm(JS_RESOURCES.getString('warning.email')) )
                {
                    return true;
                }
                else
                {
                    element.focus();
                    return false;
                }
            }
            else
            {
                re = /^(['`a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
                if ( !re.test(val) )
                {
                    validationError = JS_RESOURCES.getFormattedString('validation.email', [this.ref_label]);
                    element.focus();
                    return validationError;
                }
            }
        }

        // confirms via javascript pop-up if input field is empty;
        // user can click Ok to proceed or cancel to go back with the element focused
        // the message that pops up is the message passed in with ref_label
        if ( this.empty_value_warn )
        {
            if ( val.trim() == '' )
            {
                if ( confirm(this.ref_label) )
                {
                    return true;
                }
                else
                {
                    element.focus();
                    return false;
                }
            }
        }


        // required_url, unlike valid_url, flags empty strings as invalid URLs.
        if ( this.required_url )
        {
            if ( val.trim() == '' )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.required', [this.ref_label]);
                return validationError;
            }
            if ( !isValidUrl(val) )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.url', [this.ref_label]);
                element.focus();
                return validationError;
            }
        }

        if ( this.valid_url )
        {
            if ( val.trim()=='' )
            {
                return validationError;
            }

            var oRegExp = /[^:]+:\/\/[^:\/]+(:[0-9]+)?\/?.*/;
            if ( !oRegExp.test(val) )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.url', [this.ref_label]);
                element.focus();
                return validationError;
            }
        }

        if ( typeof(this.regex) == 'string' )
        {
            this.regex=eval(this.regex);
        }

        if ( (typeof(this.regex) == 'object' || typeof(this.regex) == 'function') && val.trim() != '' )
        {
            re =this.regex;
            if ( this.regex_match && val.search(re) == -1 )
            {
                validationError = this.regex_msg + this.ref_label + '.';
                shiftFocus(focusElement, this.activeX);
                return validationError;
            }
            if ( !this.regex_match && re.test(val) )
            {
                validationError = this.regex_msg + this.ref_label + '.';
                shiftFocus(focusElement, this.activeX);
                return validationError;
            }
        }

        if ( this.invalid_chars )
        {
            if ( typeof(this.invalid_chars) == 'string' )
            {
              this.invalid_chars=eval(this.invalid_chars);
            }
            var arr = val.invalidChars(this.invalid_chars);

            if ( arr && arr.length )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.invalid_chars',
                                                      [this.ref_label, arr.join(', ')]);
                shiftFocus(focusElement, this.activeX);
                return validationError;
            }
        }

        if ( val.length < this.minlength )
        {
            if ( this.minlength == 1 )
            {
                validationError = this.custom_alert ? this.custom_alert
                      : JS_RESOURCES.getFormattedString('validation.required', [this.ref_label]);
            }
            else
            {
                validationError = this.custom_alert ? this.custom_alert
                      : JS_RESOURCES.getFormattedString('validation.minimum_length',
                                                        [this.minlength, this.ref_label]);
            }
            shiftFocus(focusElement, this.activeX);
            return validationError;
        }

        if ( this.maxlength < val.length )
        {
            if ( (val.length - this.maxlength) > 1 )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.maximum_length.plural',
                                                      [this.ref_label,this.maxlength,(val.length-this.maxlength)]);
            }
            else
            {
                validationError = JS_RESOURCES.getFormattedString('validation.maximum_length.singular',
                                                      [this.ref_label,this.maxlength]);
            }
            shiftFocus(focusElement, this.activeX);
            return validationError;
        }

        if ( this.verify )
        {
            var chk_field = document.getElementsByName(element.name.replace(/_inp$/,'_chk'))[0];
            var field     = document.getElementsByName(element.name.replace(/_inp$/,''))[0];

            if ( chk_field.value != val )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.mismatch', [this.ref_label]);
                chk_field.focus();
                return validationError;
            }
            // Encode password
            if ( element.type == 'password' )
            {
                element.value = element.value.trim();
                if ( element.value != '' )
                {
                    element.value = field.value = chk_field.value = calcMD5(element.value);
                }
                else
                {
                    validationError = JS_RESOURCES.getString('validation.password');
                    element.value = field.value ='';
                    element.focus();
                    return validationError;
                }
            }
        }

        if ( this.cmp_required && element.value.trim()!='' )
        {
            if ( !cmp_element.value.trim().length )
            {
                validationError = JS_RESOURCES.getFormattedString('validation.cmp_field.rejected',
                                                      [this.ref_label, this.cmp_ref_label]);
                cmp_element.focus();
                return validationError;
            }
        }

        if ( this.img_check )
        {
            return image_check(element);
        }


    //AS-102122, if a image tag without ALT properties <img src="1.jpg">, add a null ALT for it. <img src="1.jpg" alt="">
    imgTag_check(element,0);


        // System role ids cannot begin with "BB" as of 7.2; such ids are reserved for solely for Blackboard use
        // Checks field to see if string begins with "BB" case-insensitive and if so, alert the user
        if ( this.valid_system_role_id )
        {
            if ( element.value.indexOf('BB') === 0 || element.value.indexOf('bb') === 0 )
            {
                validationError = this.custom_alert ? this.custom_alert : JS_RESOURCES.getFormattedString('validation.system_role.reserve', [this.ref_label]);
                element.focus();
                return validationError;
            }
            else
            {
                return validationError;
            }
        }

    }
    return validationError;
}

};



var ModalOverlay = Class.create();

ModalOverlay.prototype = {

  initialize: function( modalDiv )
  {
    this.modalDiv = modalDiv;
    this.modalOverlay = $('modalOverlay');

    // create modal overlay div if it does not exist
    if (!this.modalOverlay)
    {
      this.modalOverlay = $( document.createElement( 'div' ) );
      this.modalOverlay.id = 'modalOverlay';
      this.modalOverlay.addClassName( 'modalOverlay' );
      document.getElementsByTagName('body')[0].appendChild( this.modalOverlay );
    }
  },

  setDisplay: function( on )
  {
    var disp =   (on) ? 'block' : 'none';
    this.modalDiv.setStyle({zIndex: 1200, display : disp });
    this.modalOverlay.setStyle({ display : disp, height : this._getPageHeight() +"px" });
    // for IE hide selects outside the modal div when showing the overlay
    if (Prototype.Browser.IE)
    {
      var selects = document.getElementsByTagName('select');
      for( var i = 0; i < selects.length; i++)
      {
        if ( !$(selects[i]).descendantOf( this.modalDiv ) )
        {
          selects[i].style.visibility = (on)?'hidden':'visible';
        }
      }
    }

  },

  _getPageHeight: function()
  {
    var yScroll;

    if (window.innerHeight && window.scrollMaxY) {
      yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
      yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight){ // Explorer 6 strict mode
      yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
      yScroll = document.body.offsetHeight;
    }

    var windowHeight;
    if (self.innerHeight) { // all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    var pageHeight;
    if(yScroll < windowHeight){
      pageHeight = windowHeight;
    } else {
      pageHeight = yScroll;
    }
    return pageHeight;
  }
};