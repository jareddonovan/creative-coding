/**
 * This module contains objects that control dynamic
 * drag and drop behavior on objects on the page.
 *
 * - dragdrop.ListReordering is used for one-dimensional reordering.
 * - dragdrop.ModuleReordering is used fro two-dimensional reordering.
 */
var dragdrop = {};

/**
 *  A global list of all the drag and drop controllers on the page.  Used
 *  for enabling/disabling drag and drop at a page-level
 */
dragdrop.controllers = [];

/**
 * Get the dragdrop controller js object by accessibleControlsContainer id
 *
 * @param accessibleControlsContainerId
 */
dragdrop.getControllerObjById = function( accessibleControlsContainerId )
{
  return dragdrop.controllers.find( function( ctrl )
         { return ( ctrl.accessibleControlsContainer.id == accessibleControlsContainerId ); } );
};

/**
 * The ListReordering object controls drag and drop reordering controls
 * for a one-dimensional list of items
 */
dragdrop.ListReordering = Class.create();
dragdrop.ListReordering.prototype =
{
  /**
   * Creates a new ListReordering object.  Initializes the drag and drop behavior.
   * One of these objects should be instatitated for each container of reorderable
   * objects on the page.
   *
   * @param itemContainer HTML element that contains the items to be reordered.
   * @param accessibleControlsContainer HTML element that contains the manual reordering controls.
   * @param moveAccessibleControlsToActionBar Whether to move the accessible controls to the action bar.
   * @param tagType The type of the elements that will be moved (e.g. "li", "div").
   * @param reorderHandleClass CSS class of the element that will act as the "reordering handle".
   * @param reorderHandleTag HTML tag of the element that will act as the "reordering handle".
   * @param reorderingUrl The url to the server-side component that will persist
   *     the changes made by the drag and drop
   * @param contextParameters Query-string style parameters that will be passed to the
   *     reordering url as request parameters in order to give the call
   *     contextual information.
   * @param timestamp timestamp of when the page was loaded.
   * @param onlyCSSClass css class name applied to drag-n-drop-able elements. If unspecified, all elements are d-n-d-able.
   * @param mayBeNested defaults to True - set to false if you know that there are no overlapping droppable items
   */
  initialize: function( itemContainer, accessibleControlsContainer, moveAccessibleControlsToActionBar, tagType, reorderHandleClass, reorderHandleTag, reorderingUrl, contextParameters, timestamp, onlyCSSClass, mayBeNested )
  {
    // This is the format that the item ids must follow (essentially "some_string:the_id")
    this.format = /^[^:](?:[A-Za-z0-9\-_]*)[:](.*)$/;

    this.itemContainer = $( itemContainer );
    this.accessibleControlsContainer = $( accessibleControlsContainer );
    this.moveAccessibleControlsToActionBar = moveAccessibleControlsToActionBar;
    this.tagType = tagType;
    this.reorderHandleClass = reorderHandleClass;
    this.timestamp = timestamp;
    this.reorderingUrl = reorderingUrl;
    if ( reorderHandleTag ) {
      this.reorderHandleTag = reorderHandleTag;
    } else {
      this.reorderHandleTag = "*";
    }
    if ( mayBeNested ) {
      this.mayBeNested = mayBeNested;
    } else {
      this.mayBeNested = true;
    }
    if ( onlyCSSClass  )
    {
      this.onlyCSSClass = onlyCSSClass;
    }
    if ( contextParameters )
    {
      this.contextParameters = contextParameters.toQueryParams();
    }
    else
    {
      this.contextParameters = {};
    }

    if ( this.accessibleControlsContainer )
    {
      this.setupAccessibleReorderingControls();
      this.moveSublistAxControl();
    }
    this.enableDragAndDrop();
    this.calculateItemOrder();
    this.oldItemOrder = this.itemOrder;
    // register this drag and drop controller with the page
    dragdrop.controllers.push( this );
    var mouseOverHandler = this.onMouseOver;
    var mouseOutHandler = this.onMouseOut;
    $A(this.itemContainer.getElementsByTagName( reorderHandleTag )).each( function( i )
    {
      if ( page.util.hasClassName(i,this.reorderHandleClass) )
      {
        Event.observe( i, "mouseover", mouseOverHandler.bindAsEventListener( i, i  ) );
        Event.observe( i, "mouseout", mouseOutHandler.bindAsEventListener( i, i  ) );
      }
    }.bind( this ));
  },

  onMouseOver: function( event, handle )
  {
    $(handle).addClassName('reorderMouseOver');
    var reorderSpan = handle.down('span.reorder');
    if ( reorderSpan )
    {
      reorderSpan.setStyle({opacity: 1.0});
    }
  },

  onMouseOut: function( event, handle )
  {
    $(handle).removeClassName('reorderMouseOver');
    var reorderSpan = handle.down('span.reorder');
    if ( reorderSpan )
    {
      reorderSpan.setStyle({opacity: 1});
    }
  },

  /**
   * move ax reordering control of sublist next to enclosing item's h3 tag
   * for hierarchy list only (AS-112044)
   *
   */
  moveSublistAxControl: function()
  {
    var parentDiv = this.accessibleControlsContainer.parentNode;
    if( this.itemContainer.tagName.toLowerCase() == 'ul' &&
         page.util.hasClassName( this.itemContainer, 'subList-reorder' ) &&
         parentDiv && parentDiv.tagName.toLowerCase() == 'div' &&
         page.util.hasClassName( parentDiv, 'details' ) )
    {
      var enclosingItem = parentDiv.parentNode;
      if( enclosingItem && enclosingItem.tagName.toLowerCase() == 'li' )
      {
      var headers = enclosingItem.getElementsByTagName('h3');
      var itemHeader = null;
      if ( headers.length > 0 )
      {
        itemHeader = $(headers[0]);
      }

        Element.remove( this.reorderingControlToggleLink );
        var controlDiv = $(document.createElement("div"));
        controlDiv.addClassName("itemHeaderControl");
        controlDiv.appendChild( this.reorderingControlToggleLink );
        if( itemHeader )
        {
          // if enclosing list is sublist as well (dealing with a sublist of a sublist)
          //itemHeader.nextSibling will not support insertBefore and will throw a DOM exception
          //exception happens when itemHeader.nextSibling is a text node, a comment, etc.
          if (itemHeader.nextSibling)
          {
            try
            {
              enclosingItem.insertBefore( controlDiv, itemHeader.nextSibling );
            }
            catch(err)
            {
              enclosingItem.appendChild( controlDiv );
            }
          }
          else
          {
            enclosingItem.appendChild( controlDiv );
          }
        }
      }
    }
  },

  /******** Functions for accessible mode *******/

  /**
   * Wires up the behavior for the accessible reordering controls
   * The Accessible controls rely on a very specific DOM structure.
   *
   * See the reordering controls in contentList.vm for the structure.
   * NOTE: this code must be kept in sync with the reordering controls HTML
   */
  setupAccessibleReorderingControls: function()
  {

    var controlAreas = this.accessibleControlsContainer.immediateDescendants();
    this.reorderControlToggleDiv = controlAreas[0];
    this.reorderControlToggleDiv.show();
    this.reorderControlDiv = controlAreas[1];
    // Wire up the "show controls" link
    this.reorderingControlToggleLink = this.reorderControlToggleDiv.immediateDescendants()[0];
    Event.observe( this.reorderingControlToggleLink, "click", this.onShowReorderingControlsClick.bindAsEventListener( this ) );
    // Wire up the actual controls
    var reorderControlChildren = this.reorderControlDiv.immediateDescendants();
    this.reorderSelectBox = $(reorderControlChildren[1].getElementsByTagName('select')[0]);
    this.reorderSelectDiv = reorderControlChildren[1];
    this.reorderButtonsDiv = reorderControlChildren[2];
    this.reorderSubmitButton = $(this.reorderButtonsDiv.getElementsByTagName('button')[1]);
    var selectButtons = this.reorderSelectDiv.getElementsByTagName('button');
    Event.observe( selectButtons[0], "click", this.onReorderUpClick.bindAsEventListener( this ) );
    Event.observe( selectButtons[1], "click", this.onReorderDownClick.bindAsEventListener( this ) );
    Event.observe( this.reorderButtonsDiv.getElementsByTagName('button')[0], "click", this.onReorderCancelClick.bindAsEventListener( this ) );
    Event.observe( this.reorderSubmitButton, "click", this.onReorderSaveClick.bindAsEventListener( this ) );
    Element.remove( this.reorderControlDiv );
    dragdrop.ListReordering.saveDiv(this.reorderControlDiv);

    // Check whether there are items to reposition
    this.noOptionsDiv = $(Builder.node('div', { style: "width: 140px; display: none;"}, [ Builder.node('p', page.bundle.getString("dragdrop.accessible.empty") ) ] ) );
    this.reorderControlDiv.insertBefore( this.noOptionsDiv, this.reorderSelectDiv );
    var hasContents = (this.reorderSelectBox.options.length > 0);
    if ( !hasContents )
    {
      this.reorderSelectDiv.hide();
      this.reorderSubmitButton.hide();
      this.noOptionsDiv.show();
    }

    var i;

    // Moves the show accessible controls link to the nearest action bar if specified (and the action bar is present)
    if ( this.moveAccessibleControlsToActionBar )
    {
      var actionBar = page.util.findPrecedingActionBar(this.accessibleControlsContainer);

      if ( actionBar )
      {
        var actionBarButtons = actionBar.select('ul.nav')[1];

        if( !actionBarButtons )
        {
          //Need to create the secondary nav ul so we can add the reorder button there.
          var newActionBarUL = $(document.createElement("ul"));
          newActionBarUL.id = "navsecondary";
          newActionBarUL.addClassName("nav");
          newActionBarUL.addClassName("clearfix");
          newActionBarUL.addClassName("u_floatThis-right");
          actionBar.appendChild(newActionBarUL);
          // handles case where secondary nav ul is the only ul (when showWhenEmpty="true" in actionControlBar)
          actionBarButtons = actionBar.select('ul.nav')[1] || actionBar.select('ul.nav')[0];
        }

        if ( actionBarButtons )
        {
          var buttons = actionBarButtons.getElementsByTagName('li');
          var firstSecondaryButton = null;
          for ( i = 0; i < buttons.length; i++ )
          {
            if ( page.util.hasClassName(buttons[i],'secondaryButton') )
            {
              firstSecondaryButton = $(buttons[i]);
              break;
            }
          }
          Element.remove( this.reorderingControlToggleLink );
          var newButton = $(document.createElement("li"));
          newButton.addClassName("secondaryButton");
          newButton.appendChild( this.reorderingControlToggleLink );
          if ( firstSecondaryButton )
          {
            firstSecondaryButton.parentNode.insertBefore( newButton, firstSecondaryButton );
          }
          else
          {
            actionBarButtons.appendChild( newButton );
          }
        }
      }
    }
  },

  /**
   * Event handler that displays the accessible reordering controls when the
   * show reordering controls link is clicked.
   */
  onShowReorderingControlsClick: function( event )
  {
    //Check whether there are items to reposition
    var hasContents = (this.reorderSelectBox.options.length > 0);
    if ( !hasContents )
    {
      this.reorderSelectDiv.hide();
      this.reorderSubmitButton.hide();
      this.noOptionsDiv.show();
    }
    else
    {
      this.reorderSelectDiv.show();
      this.reorderSubmitButton.show();
      this.noOptionsDiv.hide();
    }

    var offset = Position.cumulativeOffset( this.reorderingControlToggleLink );
    document.body.appendChild( this.reorderControlDiv );

    if (this.extPreOpenCallback)
    {
      this.extPreOpenCallback();
    }

    if ( this.reorderSelectBox.getWidth() > document.viewport.getWidth() )
    {
      this.reorderSelectBox.setStyle({width: ( document.viewport.getWidth() - 50 ) + 'px' } );
    }

    var width = this.reorderControlDiv.getWidth();
    var bodyWidth = $(document.body).getWidth();
    if ( offset[0] + width > bodyWidth )
    {
      offset[0] = offset[0] - width + 30;
    }
    offset[1] = offset[1] + 30 - this.reorderingControlToggleLink.cumulativeScrollOffset()[1];
    this.reorderControlDiv.setStyle({display: "block", left: offset[0] + "px", top: offset[1] + "px", zIndex: "1500" });

    if ( hasContents )
    {
      this.reorderSelectBox.focus();
    }

    if ( !this.shim )
    {
      this.shim = new page.popupShim( this.reorderControlDiv );
    }
    this.shim.open();

    Event.stop( event );
  },

  /**
   * Event handler that moves the selected item in the accessible controls select box
   * up by one.  If no item is selected, an error message will be alerted.
   */
  onReorderUpClick: function( event )
  {
    var selectedIndex = this.reorderSelectBox.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      this.reorderSelectBox.focus();
    }
    else
    {
      if ( selectedIndex > 0 )
      {
        this.moveSelectOption( this.reorderSelectBox.options[selectedIndex], this.reorderSelectBox.options[selectedIndex - 1]);
      }
    }
    Event.stop( event );
  },

  /**
   * Event handler that moves the selected item in the accessible controls select box
   * down by one.  If no item is selected, an error message will be alerted.
   */
  onReorderDownClick: function( event )
  {
    var selectedIndex = this.reorderSelectBox.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      this.reorderSelectBox.focus();
    }
    else
    {
      if ( selectedIndex < (this.reorderSelectBox.options.length - 1) )
      {
        this.moveSelectOption( this.reorderSelectBox.options[selectedIndex], this.reorderSelectBox.options[selectedIndex + 1]);
      }
    }
    Event.stop( event );
  },

  /**
   * Helper function that swaps two <option> elements in a select box
   * @param srcOption The Option to swap from.
   * @param destOption The Option to swap to.
   */
  moveSelectOption: function ( srcOption, destOption )
  {
    var newSrcOption = { value: destOption.value, text: destOption.text, selected: false };
    var newDestOption = { value: srcOption.value, text: srcOption.text, selected: true };
    Object.extend( destOption, newDestOption );
    Object.extend( srcOption, newSrcOption );
    destOption.focus();
  },

  /**
   * Event handler that saves the order specified in the accessible controls
   * and persists the changes to the server.  Changes the order of the elements
   * on the screen so that the accessible controls remain in sync with the actual page contents.
   */
  onReorderSaveClick: function( event )
  {
    var newItemOrder = [];
    $A(this.reorderSelectBox.options).each( function( option )
    {
      newItemOrder.push( option.value );

    this.notifyPreOrderChangeCallback( option.value );
    }.bind( this ));

    Sortable.setSequence( this.itemContainer.id, newItemOrder );
    this.calculateItemOrder();
    this.lastDraggedItem = null;
    this.isAccessibleReorder = true;
    if ( this.reorderingUrl )
    {
      this.persistOrderChanges();
    }
    else
    {
      alert( page.bundle.getString("dragdrop.accessible.complete") );
    }
    this.reorderControlDiv.setStyle({display: "none"});
    this.reorderingControlToggleLink.focus();
    Element.remove(this.reorderControlDiv);
    if ( this.shim )
    {
      this.shim.close();
    }
    Event.stop( event );

  $A(this.reorderSelectBox.options).each( function( option )
    {
      this.notifyPostOrderChangeCallback( option.value );
    }.bind( this ));

    if ( this.extPostOrderCallback )
    {
      this.extPostOrderCallback();
    }
  },

  /**
   * Event handler that closes the accessible controls and reverts them back to
   * the order of the elements that are on the page.
   */
  onReorderCancelClick: function( event )
  {
    this.syncSelectBoxOrder( this.itemOrder );
    this.reorderControlDiv.setStyle({display: "none"});
    this.reorderingControlToggleLink.focus();
    Element.remove(this.reorderControlDiv);
    if ( this.shim )
    {
      this.shim.close();
    }
    Event.stop( event );
  },

  /**
   * Synchronizes the order of the accessible select box with the order
   * of the actual elements on the page.
   */
  syncSelectBoxOrder: function( order )
  {
    if ( this.accessibleControlsContainer && this.reorderSelectBox.options.length > 0 )
    {
      var valueToOption = {};
      this.reorderSelectBox.rawImmediateDescendants().each( function( opt )
      {
        valueToOption[opt.value] = opt;
        Element.remove( opt );
      });

      order.each( function ( value )
      {
        this.reorderSelectBox.appendChild( valueToOption[value] );
      }.bind( this ));
    }
  },

  /**
   * Updates an accessible select box option by it's value.
   */
  updateSelectBoxOptionLabelByOptionValue: function( selectBoxOptionValue, selectBoxOptionNewLabel )
  {
    if ( this.accessibleControlsContainer )
    {
      var selectOptionToChange = this.reorderSelectBox.immediateDescendants().find( function( opt )
      {
        return opt.value == selectBoxOptionValue;
      });

      if ( selectOptionToChange )
      {
        selectOptionToChange.text = selectBoxOptionNewLabel;
      }
    }
  },

  /****** End of functions for accessible mode *******/

  enableDragAndDrop: function()
  {
    var elems = this.itemContainer.childNodes;
    var handles = [];
    var realElems = [];
    for (var i=0;i<elems.length;i++) {
      var elem = elems[i];
      if (elem.nodeType == 1 && elem.tagName.toLowerCase() == this.tagType.toLowerCase()) {
        realElems.push(elem);
        var children = elem.getElementsByTagName(this.reorderHandleTag);
        for (var j=0;j<children.length;j++) {
          var child = children[j];
          if (page.util.hasClassName(child, this.reorderHandleClass)) {
            handles.push(child);
          }
        }
      }
    }
  if(this.onlyCSSClass)
  {
      var scrollregion = $('globalNavPageContentArea') || $('contentPanel') || window;
      Sortable.create( this.itemContainer.id,
      {
        tag: this.tagType,
        only: this.onlyCSSClass,
        handle: this.reorderHandleClass,
        scroll: scrollregion,
        format: this.format,
        onChange: this.updateCurrentItem.bind( this ),
        onUpdate: this.onOrderChange.bind( this ),
        handles: handles,
        elements: realElems,
        mayBeNested: this.mayBeNested,
        delay: 100
      });
  }
  else
  {
    Sortable.create( this.itemContainer.id,
    {
      tag: this.tagType,
      handle: this.reorderHandleClass,
      scroll: window,
      format: this.format,
      onChange: this.updateCurrentItem.bind( this ),
      onUpdate: this.onOrderChange.bind( this ),
      handles: handles,
      elements: realElems,
      mayBeNested: this.mayBeNested,
      delay: 100
    });
  }

    if ( this.accessibleControlsContainer )
    {
      this.reorderingControlToggleLink.show();
    }
  },

  disableDragAndDrop: function()
  {
    Sortable.destroy( this.itemContainer.id );

    if ( this.accessibleControlsContainer )
    {
      this.reorderingControlToggleLink.hide();
    }
  },

  /**
   * Sets the callback function to call prior to an item being reordered.
   * @param preOrderChangeCallbackFunction
   */
  setPreOrderChangeCallback: function( preOrderChangeCallbackFunction )
  {
    this.preOrderChangeCallbackFunction = preOrderChangeCallbackFunction;
  },

  /**
   * Callback invoked by Scriptaculous whenever the item's position changes during the drag.
   * This is being used to identify which element the user is currently dragging.
   */
  updateCurrentItem: function( element )
  {
    if ( !this.lastDraggedItem )
  {
    this.notifyPreOrderChangeCallback( element );
  }
    this.lastDraggedItem = element;
  },

  /**
   * Sets the callback function to call after an item is reordered.
   * @param postOrderChangeCallbackFunction
   */
  setPostOrderChangeCallback: function( postOrderChangeCallbackFunction )
  {
    this.postOrderChangeCallbackFunction = postOrderChangeCallbackFunction;
  },

  
  /**
   * Sets the callback function to be called by afterPersist which is ajax request's onSuccess callback. 
   */
  setOnReorderCallback: function( onReorderCallback )
  {
    this.onReorderCallback = onReorderCallback;
  },
  
  /**
   * Callback invoked by Scriptaculous when the item is dropped in a new position.
   *
   * Synchronizes the accessible controls and persists the change in order to the server.
   */
  onOrderChange: function( )
  {
    this.calculateItemOrder();
    this.syncSelectBoxOrder( this.itemOrder );
    if ( this.reorderingUrl )
    {
      this.persistOrderChanges();
    }
    if ( this.extPostOrderCallback )
    {
      this.extPostOrderCallback();
    }
  this.notifyPostOrderChangeCallback( this.lastDraggedItem );
  this.lastDraggedItem = null;
  },

  notifyPreOrderChangeCallback: function( orderedItem )
  {
    if ( this.preOrderChangeCallbackFunction )
    {
      this.preOrderChangeCallbackFunction( orderedItem );
    }
  },

  notifyPostOrderChangeCallback: function( orderedItem )
  {
    if ( this.postOrderChangeCallbackFunction )
    {
      this.postOrderChangeCallbackFunction( orderedItem );
    }
  },

  /**
   * Determines the order of the elements on the page.  Saves the previous value
   * so that we can revert the order if there is an error while persisting.
   */
  calculateItemOrder: function( )
  {
    this.oldItemOrder = this.itemOrder;
    this.itemOrder = Sortable.sequence( this.itemContainer.id );
  },

  /**
   * Persists the current list order to the server.
   *
   * Sends out the following request parameters:
   * - dnd_newOrder - one of these for each item id in the list, in order (e.g. dnd_newOrder=_1_1&dnd_newOrder=_2_1)
   * - dnd_timestamp - timestamp of when the page was loaded or the order was last changed.  Used for concurrent modification
   *                   detection
   * - dnd_itemId - id of the currently dragged item (this will only be specified by a visual drag and drop, not the accessible view)
   * - dnd_newPosition - new position of the dragged item (this will only be specified by a visual drag and drop, not the accessible view)
   * - any additional parameters specified in the contextParameters argument.
   */
  persistOrderChanges: function( )
  {
    var params = Object.extend({ dnd_newOrder: this.itemOrder, dnd_timestamp: this.timestamp }, this.contextParameters );

    // this will be false if the user uses the manual reordering controls
    if ( this.lastDraggedItem )
    {
      var itemId = this.lastDraggedItem.id.match(this.format)[1];
      var newPosition = null;
      var markerFound = false;
      for ( var i = 0; i < this.itemOrder.length; i++)
      {
        if ( this.itemOrder[i] == itemId )
        {
          newPosition = markerFound ? i-1 : i; // account for marker in itemOrder
          break;
        }
        if ( !markerFound && this.itemOrder[i].startsWith('insertionMarker') )
        {
          markerFound = true;
        }
      }
      params.dnd_itemId = itemId;
      params.dnd_newPosition = newPosition;
    }

    // XSRF protection
    params.sessionid = getCookie( 'JSESSIONID' );

    // If you just want the framework to handle all the grunt work for you but
    // don't need a callback then you can set the reorderingurl to noop to skip the server notification
    if (this.reorderingUrl != "noop") {
      new Ajax.Request( this.reorderingUrl,
      {
        method: 'post',
        parameters: params,
        requestHeaders: { cookie: document.cookie },
        onSuccess: this.afterPersist.bind( this )
      });
    }
  },

  /**
   * Callback invoked after the order is persisted to the server.
   *
   * Expects JSON of the following form to be returned from the server:
   * - For a successful call : { "success" : "true", "timestamp" : "[server timestamp]" }
   * - For an unsuccessful call : { "success" : "false", "timestamp" : "[server timestamp]", "error" : "error or concurrentModification", "errorMessage" : "localized error message" }
   *
   * If the call is successful, nothing is done (since the item is already moved)
   *
   * If the call is unsuccessful, the order of the items is reverted back to what it was before the persist call and
   * an error inline receipt message is displayed.
   */
  afterPersist: function( req )
  {
    try
    {
      var result = req.responseText.evalJSON( true );
      if ( result.success != "true" )
      {
        this.revertPosition();

        if ( result.error == "concurrentModification" )
          {
             new page.InlineConfirmation("error", result.errorMessage, true);
          }
          else
          {
             new page.InlineConfirmation("error", result.errorMessage, false );
          }
      }
      else
      {
        if ( this.isAccessibleReorder )
        {
          var rawOldOrder = '';
          var rawNewOrder = '';
          this.itemOrder.each( function( index )
                               {
                                 rawNewOrder = rawNewOrder + ':' + index ;
                               });
          this.oldItemOrder.each( function( index )
                               {
                                 rawOldOrder = rawOldOrder + ':' + index ;
                               });
          if (rawOldOrder == rawNewOrder)
          {
            alert( page.bundle.getString("dragdrop.accessible.complete.nochange") );
          }
          else
          {
            alert( page.bundle.getString("dragdrop.accessible.complete") );
          }
          this.isAccessibleReorder = false;
        }
        this.timestamp = parseInt( result.timestamp, 10 );
        if (this.onReorderCallback)
        {
          this.onReorderCallback();
        }
      }
  }
    catch ( e )
    {
      this.revertPosition();
    }
  },

  /**
   * Reverts the order of items in the list to what it was before the last drag/drop operation.
   *
   * This modifies the actual DOM elements as well as the selet boxes in the accessible controls.
   */
  revertPosition: function()
  {
    Sortable.setSequence( this.itemContainer.id, this.oldItemOrder );
    this.itemOrder = this.oldItemOrder;
    this.syncSelectBoxOrder( this.itemOrder );
  }
};
dragdrop.ListReordering.hiddenAccessDivs = [];
dragdrop.ListReordering.saveDiv = function(element)
{
  dragdrop.ListReordering.hiddenAccessDivs.push(element);
};
dragdrop.ListReordering.addDivs = function()
{
  for (var i=0,el=dragdrop.ListReordering.hiddenAccessDivs.length;i<el;i++) {
    document.body.appendChild(dragdrop.ListReordering.hiddenAccessDivs[i]);
  }
};
dragdrop.ListReordering.removeDivs = function()
{
  for (var i=0,el=dragdrop.ListReordering.hiddenAccessDivs.length;i<el;i++) {
    Element.remove(dragdrop.ListReordering.hiddenAccessDivs[i]);
  }
};

/**
 * The ModuleReordering object controls drag and drop reordering controls
 * for a two-dimensional modular style layout of items
 */
dragdrop.ModuleReordering = Class.create();
dragdrop.ModuleReordering.prototype =
{
  /**
   * Initialize drag and drop behavior for a module-style layout.
   *
   * @param columnIds Array of the ids of the column HTML elements (e.g. ['column1','column2','column3']
   * @param accessibleControlsContainer HTML element that contains the manual reordering controls.
   * @param moveAccessibleControlsToActionBar Whether to move the accessible controls to the action bar.
   * @param tagType The type of the elements that will be moved (e.g. "li", "div").
   * @param reorderHandleClass CSS class of the element that will act as the "reordering handle".
   * @param reorderingUrl The url to the server-side component that will persist
   *     the changes made by the drag and drop
   * @param contextParameters Query-string style parameters that will be passed to the
   *     reordering url as request parameters in order to give the call
   *     contextual information.
   * @param timestamp timestamp of when the page was loaded.
   * @param onlyCSSClass css class name applied to draggable elements. If unspecified, all elements are draggable.
   */
  initialize: function( columnIds, accessibleControlsContainer, moveAccessibleControlsToActionBar, tagType, reorderHandleClass, reorderingUrl, contextParameters, timestamp, onlyCSSClass )
  {
    // This is the format that the module ids must follow (essentially "some_string:the_id")
    this.format = /^[^:](?:[A-Za-z0-9\-_]*)[:](.*)$/;

    this.columnIds = $A(columnIds);
    this.numColumns = this.columnIds.length;
    this.columns = this.columnIds.map( function( col ) { return $(col); });
    this.baseId = null;
    for ( var i = 0; i < this.numColumns; i++ )
    {
      var firstModules = this.columns[i].getElementsByTagName( tagType );
      if ( firstModules.length > 0 )
      {
        this.baseId = firstModules[0].id.split(":")[0];
        break;
      }
    }
    this.accessibleControlsContainer = $( accessibleControlsContainer );
    this.moveAccessibleControlsToActionBar = moveAccessibleControlsToActionBar;
    this.tagType = tagType;
    this.reorderHandleClass = reorderHandleClass;
    this.timestamp = timestamp;
    this.reorderingUrl = reorderingUrl;
    if ( onlyCSSClass )
    {
      this.onlyCSSClass = onlyCSSClass;
    }
    if ( contextParameters )
    {
      this.contextParameters = contextParameters.toQueryParams();
    }
    else
    {
      this.contextParameters = {};
    }
    if ( this.accessibleControlsContainer )
    {
      this.setupAccessibleReorderingControls();
    }
    this.enableDragAndDrop();
    this.calculateItemOrder();
    this.oldItemOrder = this.itemOrder;
    dragdrop.controllers.push( this );
  },

  /******** Functions for accessible mode *******/

  /**
   * Wires up the behavior for the accessible reordering controls
   * The Accessible controls rely on a very specific DOM structure.
   *
   * See the reordering controls in moduleLayout.vm for the structure.
   * NOTE: this code must be kept in sync with the reordering controls HTML
   */
  setupAccessibleReorderingControls: function()
  {
    var controlAreas = this.accessibleControlsContainer.immediateDescendants();
    this.reorderControlToggleDiv = controlAreas[0];
    this.reorderControlToggleDiv.show();
    this.reorderControlDiv = controlAreas[1];
    // Wire up the "show controls" link
    this.reorderingControlToggleLink = this.reorderControlToggleDiv.immediateDescendants()[0];
    Event.observe( this.reorderingControlToggleLink, "click", this.onShowReorderingControlsClick.bindAsEventListener( this ) );
    // Wire up the actual controls
    this.reorderSelectBoxes = [];
    this.pinnedTopModules = [];
    var reorderControlChildren = this.reorderControlDiv.immediateDescendants();

    var buttons, i;

    this.reorderSelectDivs = [];
    for ( i = 0; i < this.numColumns; i++ )
    {
      var selectBox = $(reorderControlChildren[i * 2 + 1].getElementsByTagName("select")[0]);
      this.reorderSelectBoxes.push( selectBox );
      // hack to force display pinned top modules on AX controls although they aren't participating in reordering process
      // therefore not contained by this.itemOrder object. See syncSelectBoxOrder function
      if ( selectBox.options.length > 0 && this.isPinned( selectBox.options[0] ) )
      {
        this.pinnedTopModules[i] = selectBox.options[0];
      }

      var nextSelectBox = null;
      this.reorderSelectDivs.push( reorderControlChildren[i * 2 + 1] );
      if ( i < ( this.numColumns - 1 ) )
      {
        nextSelectBox = $(reorderControlChildren[(i+1) * 2 + 1].getElementsByTagName("select")[0]);
      }
      buttons = reorderControlChildren[i * 2 + 1].getElementsByTagName("a");
      Event.observe( buttons[0], "click", this.onReorderUpClick.bindAsEventListener( this, selectBox ) );
      Event.observe( buttons[1], "click", this.onReorderDownClick.bindAsEventListener( this, selectBox ) );
      if ( i < ( this.numColumns - 1 ) )
      {
        buttons = reorderControlChildren[i * 2 + 2].getElementsByTagName("button");
        Event.observe( buttons[0], "click", this.onReorderLeftRightClick.bindAsEventListener( this, nextSelectBox, selectBox ) );
        Event.observe( buttons[1], "click", this.onReorderLeftRightClick.bindAsEventListener( this, selectBox, nextSelectBox ) );
        this.reorderSelectDivs.push( reorderControlChildren[i * 2 + 2] );
      }
    }

    this.reorderSubmitButton = $(reorderControlChildren[this.numColumns * 2].getElementsByTagName("button")[1]);
    Event.observe( $(reorderControlChildren[this.numColumns * 2].getElementsByTagName("button")[0]), "click", this.onReorderCancelClick.bindAsEventListener( this ) );
    Event.observe( this.reorderSubmitButton, "click", this.onReorderSaveClick.bindAsEventListener( this ) );


    Element.remove( this.reorderControlDiv );
    document.body.appendChild( this.reorderControlDiv );

    // Check whether there are items to reposition
    this.noOptionsDiv = $(Builder.node('div', { style: "width: 140px; display: none;"}, [ Builder.node('p', page.bundle.getString("dragdrop.accessible.empty") ) ] ) );
    this.reorderControlDiv.insertBefore( this.noOptionsDiv, reorderControlChildren[1] );
    var hasContents = this.reorderSelectBoxes.find( function( selectBox ) {
      return selectBox.options.length > 0;
    }.bind(this));
    if ( !hasContents )
    {
      this.reorderSelectDivs.invoke("hide");
      this.reorderSubmitButton.hide();
      this.noOptionsDiv.show();
    }

    // Moves the show accessible controls link to the action bar if specified (and the action bar is present)
    if ( this.moveAccessibleControlsToActionBar )
    {
      var actionBar = page.util.findPrecedingActionBar(this.accessibleControlsContainer);

      if ( actionBar )
      {
        var actionBarButtons = actionBar.select('ul.nav')[1];

        if( !actionBarButtons )
        {
          //Need to create the secondary nav ul so we can add the reorder button there.
          var newActionBarUL = $(document.createElement("ul"));
          newActionBarUL.id = "navsecondary";
          newActionBarUL.addClassName("nav");
          newActionBarUL.addClassName("clearfix");
          newActionBarUL.addClassName("u_floatThis-right");
          actionBar.appendChild(newActionBarUL);
          // handles case where secondary nav ul is the only ul (when showWhenEmpty="true" in actionControlBar)
          actionBarButtons = actionBar.select('ul.nav')[1] || actionBar.select('ul.nav')[0];
        }

        if ( actionBarButtons )
        {
          buttons = actionBarButtons.getElementsByTagName('li');
          var firstSecondaryButton = null;
          for ( i = 0; i < buttons.length; i++ )
          {
            if ( page.util.hasClassName( buttons[i], 'secondaryButton') )
            {
              firstSecondaryButton = $(buttons[i]);
              break;
            }
          }
          Element.remove( this.reorderingControlToggleLink );
          var newButton = $(document.createElement("li"));
          newButton.addClassName("secondaryButton");
          newButton.appendChild( this.reorderingControlToggleLink );
          if ( firstSecondaryButton )
          {
            actionBarButtons.insertBefore( newButton, firstSecondaryButton );
          }
          else
          {
            actionBarButtons.appendChild( newButton );
          }
        }
      }
    }

  },

  /**
   * Event handler that displays the accessible reordering controls when the
   * show reordering controls link is clicked.
   */
  onShowReorderingControlsClick: function( event )
  {
    // Check whether there are items to reposition
    var hasContents = this.reorderSelectBoxes.find( function( selectBox ) {
      return selectBox.options.length > 0;
    }.bind(this));
    if ( !hasContents )
    {
      this.reorderSelectDivs.invoke("hide");
      this.reorderSubmitButton.hide();
      this.noOptionsDiv.show();
    }
    else
    {
      this.reorderSelectDivs.invoke("show");
      this.reorderSubmitButton.show();
      this.noOptionsDiv.hide();
    }

    var offset = Position.cumulativeOffset( this.reorderingControlToggleLink );

    var newSelectWidth = parseInt( ( document.viewport.getWidth() - ( 40 * this.reorderSelectBoxes.length )  ) / this.reorderSelectBoxes.length, 10 ) + 'px';
    var totalWidth = 0;
    this.reorderSelectBoxes.each( function( s ) {
      totalWidth += s.getWidth();
    });
    if ( totalWidth >= document.viewport.getWidth() )
    {
      this.reorderSelectBoxes.each( function( s ) {
        s.setStyle({width: newSelectWidth});
      });
    }

    var width = this.reorderControlDiv.getWidth();
    var bodyWidth = $(document.body).getWidth();
    if ( offset[0] + width > bodyWidth )
    {
      offset[0] = offset[0] - width + 30;
    }
    offset[1] = offset[1] + 30 - this.reorderingControlToggleLink.cumulativeScrollOffset()[1];
    this.reorderControlDiv.setStyle({display: "block", left: offset[0] + "px", top: offset[1] + "px", zIndex: "1500" });
    this.reorderSelectBoxes[0].focus();

    if ( !this.shim )
    {
      this.shim = new page.popupShim( this.reorderControlDiv );
    }
    this.shim.open();

    Event.stop( event );
  },

  isPinned: function( option )
  {
    return page.util.hasClassName(option, "pinnedModule");
  },

  /**
   * Event handler that moves the currently selected item in the specified
   * select box up by one
   */
  onReorderUpClick: function( event, selectBox )
  {
    var selectedIndex = selectBox.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      selectBox.focus();
    }
    else
    {
      if ( selectedIndex > 0 )
      {
        this.moveSelectOption( selectBox.options[selectedIndex], selectBox.options[selectedIndex - 1]);
      }
    }
    Event.stop( event );
  },

  /**
   * Event handler that moves the currently selected item in the specified select
   * box down by one
   */
  onReorderDownClick: function( event, selectBox )
  {
    var selectedIndex = selectBox.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      selectBox.focus();
    }
    else
    {
      if ( selectedIndex < (selectBox.options.length - 1) )
      {
        this.moveSelectOption( selectBox.options[selectedIndex], selectBox.options[selectedIndex + 1]);
      }
    }
    Event.stop( event );
  },

  /**
   * Event handler that moves the currently selected item in the source select box
   * into the destination select box.  This is used for moving items left and right between
   * columns.
   */
  onReorderLeftRightClick: function( event, sourceSelect, destSelect )
  {
    var selectedIndex = sourceSelect.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      sourceSelect.focus();
    }
    else
    {
      var optionToMove = sourceSelect.immediateDescendants()[selectedIndex];
      if ( this.isPinned( optionToMove ) )
      {
        alert( page.bundle.getString("dragdrop.accessible.error.pinned") );
        optionToMove.focus();
      }
      else
      {
        Element.remove( optionToMove );
        destSelect.appendChild( optionToMove );
        optionToMove.focus();
      }
    }
  },

  /**
   * Helper function that swaps the values/text of two <option> elements of a select box.
   */
  moveSelectOption: function ( srcOption, destOption )
  {
    if ( this.isPinned( srcOption ) || this.isPinned( destOption ) )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.pinned") );
      srcOption.focus();
    }
    else
    {
      var newSrcOption = { value: destOption.value, text: destOption.text, selected: false };
      var newDestOption = { value: srcOption.value, text: srcOption.text, selected: true };
      Object.extend( destOption, newDestOption );
      Object.extend( srcOption, newSrcOption );
      destOption.focus();
    }
  },

  /**
   * Event handler that saves the order specified in the accessible controls
   * and persists the changes to the server.  Changes the order of the elements
   * on the screen so that the accessible controls remain in sync with the actual page contents.
   */
  onReorderSaveClick: function( event )
  {
    //Move the items around
    var newColumns = [],
        i,j,newColumn;

    for ( i = 0; i < this.numColumns; i++ )
    {
      var selectBox = this.reorderSelectBoxes[i];
      newColumn = [];
      for ( j = 0; j < selectBox.options.length; j++ )
      {
        var module = $( this.baseId + ":" + selectBox.options[j].value );
        newColumn.push( module );
        Element.remove( module );
      }
      newColumns.push( newColumn );
    }

    for ( i = 0; i < this.numColumns; i++ )
    {
      newColumn = newColumns[i];
      for ( j = 0; j < newColumn.length; j++ )
      {
        this.columns[i].appendChild( newColumn[j] );
      }
    }

    this.lastDraggedItem = null;
    this.calculateItemOrder();
    if ( this.reorderingUrl )
    {
      this.persistOrderChanges();
    }
    else
    {
      alert( page.bundle.getString("dragdrop.accessible.complete") );
    }
    this.reorderControlDiv.setStyle({display: "none"});
    this.reorderingControlToggleLink.focus();
    if ( this.shim )
    {
      this.shim.close();
    }
    Event.stop( event );
  },

  /**
   * Event handler that closes the accessible controls and reverts them back to
   * the order of the elements that are on the page.
   */
  onReorderCancelClick: function( event )
  {
    this.syncSelectBoxOrder( this.itemOrder );
    this.reorderControlDiv.setStyle({display: "none"});
    this.reorderingControlToggleLink.focus();
    if ( this.shim )
    {
      this.shim.close();
    }
    Event.stop( event );
  },

   /**
   * Synchronizes the order of the accessible select boxes with the order
   * of the actual elements on the page.
   */
  syncSelectBoxOrder: function( columnOrder )
  {
    var valueToOption = {}, i;

    var loopFunc = function( opt )
      {
        valueToOption[opt.value] = opt;
        Element.remove( opt );
    };

    for( i = 0; i < columnOrder.length; i++ )
    {
      this.reorderSelectBoxes[i].immediateDescendants().each( loopFunc );
    }

    loopFunc = function( j )
    {
      // pinned modules don't participate in reordering process but still show up on AX controls
      // according to PM request. Reordering attempt made to, or with them will return alert box
      // to end user. See moveSelectOption() and onReorderLeftRightClick() for more details.
      if ( this.pinnedTopModules && this.pinnedTopModules[j] )
      {
        this.reorderSelectBoxes[j].appendChild( this.pinnedTopModules[j] );
      }

      columnOrder[j].each( function ( value )
      {
        if ( valueToOption[value] )
        {
          this.reorderSelectBoxes[j].appendChild( valueToOption[value] );
        }
      }.bind( this ));
    }.bind( this );

    for( i = 0; i < columnOrder.length; i++ )
    {
      loopFunc( i );
    }
  },


  /** End of functions for accessible mode */

  enableDragAndDrop: function()
  {
    var scrollregion = $('globalNavPageContentArea') || $('contentPanel') || window;

    this.columns.each( function( col ) {
      if( this.onlyCSSClass )
      {
        Sortable.create( col.id,
        {
          dropOnEmpty: true,
          tag: this.tagType,
          only: this.onlyCSSClass,
          handle: this.reorderHandleClass,
          overlap: 'vertical',
          containment: this.columnIds,
          constraint: false,
          scroll: scrollregion,
          format: this.format,
          onChange: this.updateCurrentItem.bind( this, col.id ),
          onUpdate: this.onOrderChange.bind( this, col.id )
        });
      }
      else
      {
        Sortable.create( col.id,
        {
          dropOnEmpty: true,
          tag: this.tagType,
          handle: this.reorderHandleClass,
          overlap: 'vertical',
          containment: this.columnIds,
          constraint: false,
          scroll: scrollregion,
          format: this.format,
          onChange: this.updateCurrentItem.bind( this, col.id ),
          onUpdate: this.onOrderChange.bind( this, col.id )
        });
      }
    }.bind( this ));
    this.reorderingControlToggleLink.show();
  },

  disableDragAndDrop: function()
  {
    this.columns.each( function( col ) {
      Sortable.destroy( col.id );
    });
    this.reorderingControlToggleLink.hide();
  },

  /**
   * Determines the order of the elements on the page.  Saves the previous value
   * so that we can revert the order if there is an error while persisting.
   */
  calculateItemOrder: function()
  {
    this.oldItemOrder = this.itemOrder;
    this.itemOrder = this.columnIds.map( function( colId ) { return Sortable.sequence( colId ); });
  },

  /**
   * Callback invoked by Scriptaculous whenever the item's position changes during the drag.
   * This is being used to identify which element the user is currently dragging.
   */
  updateCurrentItem: function( columnId, element )
  {
    this.lastDraggedItem = element;
  },

  /**
   * Callback invoked by Scriptaculous when an item is dropped.  If an item is moved from
   * one column to another, this function gets invoked twice, once for each column.  We ignore
   * the call for the column that the item was moved out of.
   *
   * @param columnId id of the column that the item was dragged to/from
   */
  onOrderChange: function( columnId )
  {
    var itemId = this.lastDraggedItem.id.match(this.format)[1];
    var newColumnOrder = Sortable.sequence( columnId );
    var newColIndex = this.columnIds.indexOf( columnId );
    var newPos =  newColumnOrder.indexOf( itemId );
    if ( newPos >= 0 ) // only do this for the update from the dropped column
    {
      this.newColumnIndex = newColIndex;
      this.newPosition = newPos;
      this.calculateItemOrder();
      if ( this.accessibleControlsContainer )
      {
        this.syncSelectBoxOrder( this.itemOrder );
      }
      // determine the old column
      this.oldItemOrder.each( function ( col, index )
      {
        if ( col.indexOf( itemId ) >= 0 )
        {
          this.oldColumnIndex = index;
        }
      }.bind( this ));

      this.persistOrderChanges();
    }
  },

  /**
   * Persists the current list order to the server.
   *
   * Sends out the following request parameters:
   * - dnd_numColumns - the number of columns in the layout
   * - dnd_newOrder[n] - for each column a set of dnd_newOrder[colIndex] parameters will be added.
   *            E.g. dnd_newOrder0=_1_1&dnd_newOrder0=_2_1&dnd_newOrder1=_3_1&dnd_newOrder2=_4_1
   * - dnd_timestamp - timestamp of when the page was loaded or the order was last changed.  Used for concurrent modification
   *                   detection
   * - dnd_itemId - id of the currently dragged item (this will only be specified by a visual drag and drop, not the accessible view)
   * - dnd_newPosition - new position of the dragged item (this will only be specified by a visual drag and drop, not the accessible view)
   * - dnd_columnIndex - index of the column in the layout that the item was dragged to.
   * - any additional parameters specified in the contextParameters argument.
   */
  persistOrderChanges: function()
  {
    var params = Object.extend({ dnd_timestamp: this.timestamp }, this.contextParameters );

    // add the column order
    params.dnd_numColumns = this.numColumns;
    this.itemOrder.each( function( col, index )
    {
      params['dnd_newOrder'+index] = col;
    });

    // this will be false if the user uses the manual reordering controls
    if ( this.lastDraggedItem )
    {
      var itemId = this.lastDraggedItem.id.match(this.format)[1];
      params.dnd_itemId = itemId;
      params.dnd_newPosition = this.newPosition;
      params.dnd_columnIndex = this.newColumnIndex;
    }

    // XSRF protection
    params.sessionid = getCookie( 'JSESSIONID' );

    // If you just want the framework to handle all the grunt work for you but
    // don't need a callback then you can set the reorderingurl to noop to skip the server notification
    if (this.reorderingUrl != "noop") {
      new Ajax.Request( this.reorderingUrl,
      {
        method: 'post',
        parameters: params,
        requestHeaders: { cookie: document.cookie },
        onSuccess: this.afterPersist.bind( this )
      });
    }
  },

  /**
   * Callback invoked after the order is persisted to the server.
   *
   * Expects JSON of the following form to be returned from the server:
   * - For a successful call : { "success" : "true", "timestamp" : "[server timestamp]" }
   * - For an unsuccessful call : { "success" : "false", "timestamp" : "[server timestamp]", "error" : "error or concurrentModification", "errorMessage" : "localized error message" }
   *
   * If the call is successful, nothing is done (since the item is already moved)
   *
   * If the call is unsuccessful, the order of the items is reverted back to what it was before the persist call and
   * an error inline receipt message is displayed.
   */
  afterPersist: function( req )
  {
    try
    {
        var result = req.responseText.evalJSON( true );
        if ( result.success != "true" )
        {
          this.revertPosition();

          if ( result.error == "concurrentModification" )
          {
             new page.InlineConfirmation("error", result.errorMessage, true);
          }
          else
          {
             new page.InlineConfirmation("error", result.errorMessage, false );
          }
        }
        else
        {
          if ( !this.lastDraggedItem )
          {
            var rawOldOrder = '';
            var rawNewOrder = '';
            this.itemOrder.each( function( col, index )
                                 {
                                   rawNewOrder = rawNewOrder + ':' + index + ':' +col;
                                 });
            this.oldItemOrder.each( function( col, index )
                                 {
                                   rawOldOrder = rawOldOrder + ':' + index + ':' + col;
                                 });
            if (rawOldOrder == rawNewOrder)
            {
              alert( page.bundle.getString("dragdrop.accessible.complete.nochange") );
            }
            else
            {
              alert( page.bundle.getString("dragdrop.accessible.complete") );
            }
          }
          this.timestamp = parseInt( result.timestamp, 10 );
        }
    }
    catch ( e )
    {
      this.revertPosition();
    }
  },

  /**
   * Reverts the order of items in the list to what it was before the last drag/drop operation.
   *
   * This modifies the actual DOM elements as well as the selet boxes in the accessible controls.
   */
  revertPosition: function()
  {
    // If this was a "visual drag", so we only have to change one item
    if ( this.lastDraggedItem)
    {
      if ( this.oldColumnIndex != this.newColumnIndex )
      {
        Element.remove( this.lastDraggedItem );
        this.columns[ this.oldColumnIndex ].appendChild( this.lastDraggedItem );
      }
      Sortable.setSequence( this.columnIds[this.oldColumnIndex], this.oldItemOrder[this.oldColumnIndex]);
      this.itemOrder = this.oldItemOrder;
      if ( this.accessibleControlsContainer )
      {
        this.syncSelectBoxOrder( this.itemOrder );
      }
    }
    // This was an accessible control save, so we have to change all the items
    else
    {
      this.itemOrder = this.oldItemOrder;
      if ( this.accessibleControlsContainer )
      {
        this.syncSelectBoxOrder( this.itemOrder );
      }
      //Move the DOM elements for the modules around into their old columns / order
      var newColumns = [], i, j, newColumn;
      for ( i = 0; i < this.numColumns; i++ )
      {
        var columnOrder = this.oldItemOrder[i];
        newColumn = [];
        for ( j = 0; j < columnOrder.length; j++ )
        {
          var module = $( this.baseId + ":" + columnOrder[j] );
          newColumn.push( module );
          Element.remove( module );
        }
        newColumns.push( newColumn );
      }

      for ( i = 0; i < this.numColumns; i++ )
      {
        newColumn = newColumns[i];
        for ( j = 0; j < newColumn.length; j++ )
        {
          this.columns[i].appendChild( newColumn[j] );
        }
      }
    }
  }
};

 /* =============================================================== */

 /**
 * The MultiColumnReordering object controls drag and drop reordering controls
 * for a multiple column list of items
 */
dragdrop.MultiColumnReordering = Class.create();
dragdrop.MultiColumnReordering.prototype =
{

  /**
   * Creates a new MultiColumnReordering object.  Initializes the drag and drop behavior.
   * One of these objects should be instantiated for each container of reorderable
   * objects on the page.
   *
   * @param itemContainer HTML element that contains the items to be reordered.
   * @param accessibleControlsContainer HTML element that contains the manual reordering controls.
   * @param moveAccessibleControlsToActionBar Whether to move the accessible controls to the action bar.
   * @param tagType The type of the elements that will be moved (e.g. "li", "div").
   * @param reorderHandleClass CSS class of the element that will act as the "reordering handle".
   * @param reorderHandleTag HTML tag of the element that will act as the "reordering handle".
   * @param reorderingUrl The url to the server-side component that will persist
   *     the changes made by the drag and drop
   * @param contextParameters Query-string style parameters that will be passed to the
   *     reordering url as request parameters in order to give the call
   *     contextual information.
   * @param timestamp timestamp of when the page was loaded.
   */
  initialize: function( itemContainer, accessibleControlsContainer, moveAccessibleControlsToActionBar, tagType, reorderHandleClass, reorderHandleTag, reorderingUrl, contextParameters, timestamp )
  {
    // This is the format that the item ids must follow (essentially "some_string:the_id")
    this.format = /^[^:](?:[A-Za-z0-9\-_]*)[:](.*)$/;

    this.itemContainer = $( itemContainer );
    this.accessibleControlsContainer = $( accessibleControlsContainer );
    this.moveAccessibleControlsToActionBar = moveAccessibleControlsToActionBar;
    this.tagType = tagType;
    this.reorderHandleClass = reorderHandleClass;
    this.timestamp = timestamp;
    this.mcReorderingUrl = reorderingUrl;

    if ( contextParameters )
    {
      this.contextParameters = contextParameters.toQueryParams();
    }
    else
    {
      this.contextParameters = {};
    }

    if ( this.accessibleControlsContainer )
    {
      this.setupAccessibleReorderingControls();
    }

    this.enableDragAndDrop();

    var listItems = this.itemContainer.immediateDescendants();

    this.calculateItemOrder();
    this.oldItemOrder = this.itemOrder;


    // register this drag and drop controller with the page
    dragdrop.controllers.push( this );

    var mouseOverHandler = this.onMouseOver;
    var mouseOutHandler = this.onMouseOut;
    $A(this.itemContainer.getElementsByTagName(reorderHandleTag)).each( function( i )
    {
      if ( page.util.hasClassName(i,this.reorderHandleClass) )
      {
        Event.observe( i, "mouseover", mouseOverHandler.bindAsEventListener( i, i  ) );
        Event.observe( i, "mouseout", mouseOutHandler.bindAsEventListener( i, i  ) );
      }
    });
  },

  onMouseOver: function( event, handle )
  {
    $(handle).addClassName('reorderMouseOver');
    var reorderSpan = handle.down('span.reorder');
    if ( reorderSpan )
    {
      reorderSpan.setStyle({opacity: 1.0});
    }
  },

  onMouseOut: function( event, handle )
  {
    handle.removeClassName('reorderMouseOver');
    var reorderSpan = handle.down('span.reorder');
    if ( reorderSpan )
    {
      reorderSpan.setStyle({opacity: 0});
    }
  },

  /******** Functions for accessible mode *******/

  /**
   * Wires up the behavior for the accessible reordering controls
   * The Accessible controls rely on a very specific DOM structure.
   *
   * See the reordering controls in contentList.vm for the structure.
   * NOTE: this code must be kept in sync with the reordering controls HTML
   */
  setupAccessibleReorderingControls: function()
  {
    var controlAreas = this.accessibleControlsContainer.immediateDescendants();
    this.reorderControlToggleDiv = controlAreas[0];
    this.reorderControlToggleDiv.show();
    this.reorderControlDiv = controlAreas[1];
    // Wire up the "show controls" link
    this.reorderingControlToggleLink = this.reorderControlToggleDiv.immediateDescendants()[0];
    Event.observe( this.reorderingControlToggleLink, "click", this.onShowReorderingControlsClick.bindAsEventListener( this ) );
    // Wire up the actual controls
    var reorderControlChildren = this.reorderControlDiv.immediateDescendants();
    this.reorderSelectBoxes = [];
    this.reorderSelectDivs = [];

    this.reorderCancelButton = $("reorder_cancel");
    this.reorderSubmitButton = $("reorder_submit");
    this.reorderEwDiv = $("reorderEwDiv");
    var leftRightButtons = this.reorderEwDiv.getElementsByTagName('button');
    this.reorderMoveLeftButton = $(leftRightButtons[0]);
    this.reorderMoveRightButton = $(leftRightButtons[1]);

    var hasContents = false;

    if ( reorderControlChildren.length > 1 )
    {
      //Left select box + buttons
      var selectDiv = $(reorderControlChildren[1]);
      this.reorderSelectDivs.push( selectDiv );
      var selectBox = $(selectDiv.getElementsByTagName('select')[0]);
      this.reorderSelectBoxes.push( selectBox );
      var selectButtons = selectDiv.getElementsByTagName('button');
      Event.observe( selectButtons[0], "click", this.onReorderUpClick.bindAsEventListener( this, selectBox ) );
      Event.observe( selectButtons[1], "click", this.onReorderDownClick.bindAsEventListener( this, selectBox ) );
      //Right select box + buttons
      selectDiv = $(reorderControlChildren[3]);
      this.reorderSelectDivs.push( selectDiv );
      selectBox = $(selectDiv.getElementsByTagName('select')[0]);
      this.reorderSelectBoxes.push( selectBox );
      selectButtons = selectDiv.getElementsByTagName('button');
      Event.observe( selectButtons[0], "click", this.onReorderUpClick.bindAsEventListener( this, selectBox ) );
      Event.observe( selectButtons[1], "click", this.onReorderDownClick.bindAsEventListener( this, selectBox ) );
      //Left/Right buttons
      var leftSelectBox = this.reorderSelectBoxes[0];
      var rightSelectBox = this.reorderSelectBoxes[1];
      Event.observe( this.reorderMoveLeftButton, "click", this.onReorderLeftRightClick.bindAsEventListener( this, rightSelectBox, leftSelectBox ) );
      Event.observe( this.reorderMoveRightButton, "click", this.onReorderLeftRightClick.bindAsEventListener( this, leftSelectBox, rightSelectBox ) );

      Event.observe( this.reorderCancelButton, "click", this.onReorderCancelClick.bindAsEventListener( this ) );
      Event.observe( this.reorderSubmitButton, "click", this.onReorderSaveClick.bindAsEventListener( this ) );
      hasContents = (this.reorderSelectBoxes.length > 0 && this.reorderSelectBoxes[0].options.length > 0 || this.reorderSelectBoxes[1].options.length > 0);
    }

    Element.remove( this.reorderControlDiv );
    document.body.appendChild( this.reorderControlDiv );

    // Check whether there are items to reposition
    this.noOptionsDiv = $(Builder.node('div', { style: "width: 140px; display: none;"}, [ Builder.node('p', page.bundle.getString("dragdrop.accessible.empty") ) ] ) );
    this.reorderControlDiv.insertBefore( this.noOptionsDiv, reorderControlChildren[0].nextSibling );

    if ( !hasContents )
    {
      this.reorderSelectDivs.invoke('hide');
      this.reorderSubmitButton.hide();
      this.noOptionsDiv.show();
    }

    // Moves the show accessible controls link to the nearest action bar if specified (and the action bar is present)
    if ( this.moveAccessibleControlsToActionBar )
    {
      var actionBar = page.util.findPrecedingActionBar(this.accessibleControlsContainer);

      if ( actionBar )
      {
        var actionBarButtons = actionBar.select('ul.nav')[1];

        if( !actionBarButtons )
        {
          //Need to create the secondary nav ul so we can add the reorder button there.
          var newActionBarUL = $(document.createElement("ul"));
          newActionBarUL.id = "navsecondary";
          newActionBarUL.addClassName("nav");
          newActionBarUL.addClassName("clearfix");
          newActionBarUL.addClassName("u_floatThis-right");
          actionBar.appendChild(newActionBarUL);
          // handles case where secondary nav ul is the only ul (when showWhenEmpty="true" in actionControlBar)
          actionBarButtons = actionBar.select('ul.nav')[1] || actionBar.select('ul.nav')[0];
        }

        if ( actionBarButtons )
        {
          var buttons = actionBarButtons.getElementsByTagName('li');
          var firstSecondaryButton = null;
          for ( var i = 0; i < buttons.length; i++ )
          {
            if ( page.util.hasClassName( buttons[i], 'secondaryButton') )
            {
              firstSecondaryButton = $(buttons[i]);
              break;
            }
          }
          Element.remove( this.reorderingControlToggleLink );
          var newButton = $(document.createElement("li"));
          newButton.addClassName("secondaryButton");
          newButton.appendChild( this.reorderingControlToggleLink );
          if ( firstSecondaryButton )
          {
            actionBarButtons.insertBefore( newButton, firstSecondaryButton );
          }
          else
          {
            actionBarButtons.appendChild( newButton );
          }
        }
      }
    }
  },



  /**
   * Event handler that displays the accessible reordering controls when the
   * show reordering controls link is clicked.
   */
  onShowReorderingControlsClick: function( event )
  {
    //Check whether there are items to reposition
    var hasTwoOrMoreContents = (this.itemOrder.length > 1);
    if ( !hasTwoOrMoreContents )
    {
      this.reorderingControlToggleLink.hide();
    }
    else
    {
      this.syncSelectBoxOrder( this.itemOrder );
      this.reorderSelectDivs.invoke( "show" );
      this.reorderSubmitButton.show();
      this.noOptionsDiv.hide();
    }

    var offset = Position.cumulativeOffset( this.reorderingControlToggleLink );

    var newSelectWidth = parseInt( ( document.viewport.getWidth() - 100 ) / this.reorderSelectBoxes.length, 10 ) + 'px';
    var totalWidth = 0;
    this.reorderSelectBoxes.each( function( s ) {
      totalWidth += s.getWidth();
    });
    if ( totalWidth >= document.viewport.getWidth() )
    {
      this.reorderSelectBoxes.each( function( s ) {
        s.setStyle({width: newSelectWidth});
      });
    }

    var width = this.reorderControlDiv.getWidth();
    var bodyWidth = $(document.body).getWidth();
    if ( offset[0] + width > bodyWidth )
    {
      offset[0] = offset[0] - width + 30;
    }
    offset[1] = offset[1] + 30 - this.reorderingControlToggleLink.cumulativeScrollOffset()[1];
    this.reorderControlDiv.setStyle({display: "block", left: offset[0] + "px", top: offset[1] + "px", zIndex: "1500" });
    this.reorderSelectBoxes[0].focus();

    if ( !this.shim )
    {
      this.shim = new page.popupShim( this.reorderControlDiv );
    }
    this.shim.open();

    Event.stop( event );
  },

  /**
   * Event handler that moves the selected item in the accessible controls select box
   * up by one.  If no item is selected, an error message will be alerted.
   */
  onReorderUpClick: function( event, selectBox )
  {
    var selectedIndex = selectBox.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      selectBox.focus();
    }
    else
    {
      if ( selectedIndex > 0 )
      {
        this.moveSelectOption( selectBox.options[selectedIndex], selectBox.options[selectedIndex - 1]);
      }
    }
    Event.stop( event );
  },

  /**
   * Event handler that moves the selected item in the accessible controls select box
   * down by one.  If no item is selected, an error message will be alerted.
   */
  onReorderDownClick: function( event, selectBox )
  {
    var selectedIndex = selectBox.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      selectBox.focus();
    }
    else
    {
      if ( selectedIndex < (selectBox.options.length - 1) )
      {
        this.moveSelectOption( selectBox.options[selectedIndex], selectBox.options[selectedIndex + 1]);
      }
    }
    Event.stop( event );
  },

    /**
   * Event handler that moves the currently selected item in the source select box
   * into the destination select box.  This is used for moving items left and right between
   * columns.
   */
  onReorderLeftRightClick: function( event, sourceSelect, destSelect )
  {
    var selectedIndex = sourceSelect.selectedIndex;
    if ( selectedIndex < 0 )
    {
      alert( page.bundle.getString("dragdrop.accessible.error.chooseOption") );
      sourceSelect.focus();
    }
    else
    {
      var optionToMove = sourceSelect.immediateDescendants()[selectedIndex];

      var optionToBeSwap = null;

      var destSelectedIndex = destSelect.selectedIndex;
      if ( destSelectedIndex < 0 )
      {
        if ( selectedIndex < destSelect.options.length )
        {
          destSelectedIndex = selectedIndex;
        }
        else
        {
          destSelectedIndex = destSelect.options.length -1;
        }
      }

      if ( destSelectedIndex >= 0 )
      {
        optionToBeSwap = destSelect.immediateDescendants()[destSelectedIndex];
        this.moveSelectOption( optionToMove, optionToBeSwap);
      }

      optionToMove.focus();
    }
  },


  /**
   * Helper function that swaps two <option> elements in a select box
   * @param srcOption The Option to swap from.
   * @param destOption The Option to swap to.
   */
  moveSelectOption: function ( srcOption, destOption )
  {
    var newSrcOption = { value: destOption.value, text: destOption.text, selected: false };
    var newDestOption = { value: srcOption.value, text: srcOption.text, selected: true };
    Object.extend( destOption, newDestOption );
    Object.extend( srcOption, newSrcOption );
    destOption.focus();
  },

  /**
   * Event handler that saves the order specified in the accessible controls
   * and persists the changes to the server.  Changes the order of the elements
   * on the screen so that the accessible controls remain in sync with the actual page contents.
   */
  onReorderSaveClick: function( event )
  {
    var newItemOrder = [];
    for (var i = 0; i < this.reorderSelectBoxes[0].options.length; i = i + 1)
    {
      for ( var j = 0; j < 2; j = j + 1 )
      {
        if ( i < this.reorderSelectBoxes[j].options.length )
        {
          newItemOrder.push( this.reorderSelectBoxes[j].options[i].value );
        }
      }
    }

    this.syncDndContainerOrder( newItemOrder );

    this.updateItemOrder( newItemOrder );
    this.lastDraggedItem = null;
    if ( this.mcReorderingUrl )
    {
      this.accessibleReorder = true;
      this.persistOrderChanges();
    }
    else
    {
      alert( page.bundle.getString("dragdrop.accessible.complete") );
    }
    this.reorderControlDiv.setStyle({display: "none"});
    this.reorderingControlToggleLink.focus();
    if ( this.shim )
    {
      this.shim.close();
    }
    Event.stop( event );
  },

  /**
   * Event handler that closes the accessible controls and reverts them back to
   * the order of the elements that are on the page.
   */
  onReorderCancelClick: function( event )
  {
    this.reorderControlDiv.setStyle({display: "none"});
    this.reorderingControlToggleLink.focus();
    if ( this.shim )
    {
      this.shim.close();
    }
    Event.stop( event );
  },

  /**
   * Synchronizes the order of the accessible select box with the order
   * of the actual elements on the page.
   */
  syncSelectBoxOrder: function( order )
  {
    if ( this.accessibleControlsContainer )
    {
      var valueToOption = {}, i;

      var loopFunc = function( opt )
        {
          valueToOption[opt.value] = opt;
          Element.remove( opt );
      };

      for( i = 0; i < 2; i=i+1 )
      {
        this.reorderSelectBoxes[i].immediateDescendants().each( loopFunc );
      }

      var value = "";
      for( i = 0; i < order.length; i=i+1 )
      {
        value = order[i];
        if ( (i % 2) === 0 )
        {
          this.reorderSelectBoxes[0].appendChild( valueToOption[value] );
        }
        else
        {
          this.reorderSelectBoxes[1].appendChild( valueToOption[value] );
        }
      }
    }
  },

  /****** End of functions for accessible mode *******/

    myOnDrop: function ( drag, drop, event )
    {
      if ( drag.id != drop.id )
      {
        var listItems = this.itemContainer.immediateDescendants();
        var dragIndex = listItems.indexOf( drag );
        var dropIndex = listItems.indexOf( drop );

        if ( dragIndex < dropIndex )
        {
           Element.remove( drag );
           this.itemContainer.replaceChild( drag, drop );
           listItems = this.itemContainer.immediateDescendants();
           this.itemContainer.insertBefore( drop, listItems[dragIndex] );
        }
        else
        {
           Element.remove( drop );
           this.itemContainer.replaceChild( drop, drag );
           listItems = this.itemContainer.immediateDescendants();
           this.itemContainer.insertBefore( drag, listItems[dropIndex] );
        }

        drag.setStyle({top: 0, left: 0});

        this.calculateItemOrder();

        var params = Object.extend({ dnd_newOrder: this.itemOrder, dnd_timestamp: this.timestamp }, this.contextParameters );

        this.syncSelectBoxOrder( this.itemOrder );
        this.accessibleReorder = false;

        // XSRF protection
        params.sessionid = getCookie( 'JSESSIONID' );

        // If you just want the framework to handle all the grunt work for you but
        // don't need a callback then you can set the reorderingurl to noop to skip the server notification
        if (this.mcReorderingUrl != "noop") {
            new Ajax.Request( this.mcReorderingUrl,
            {
              method: 'post',
              parameters: params,
              requestHeaders: { cookie: document.cookie },
              onSuccess: this.afterPersist.bind( this )
            });
        }
      }
    },

  enableDragAndDrop: function()
  {

    var listItems = this.itemContainer.immediateDescendants();

    var dropHandler = this.myOnDrop.bind(this);

    listItems.each( function( item )
    {
      new Draggable( item, {revert: true} );
      Droppables.add( item, {onDrop: dropHandler} );
    });

    if ( this.accessibleControlsContainer && listItems.length > 1 )
    {
      this.reorderingControlToggleLink.show();
    }
    else
    {
      this.reorderingControlToggleLink.hide();
    }
  },

  disableDragAndDrop: function()
  {

    if ( this.accessibleControlsContainer )
    {
      this.reorderingControlToggleLink.hide();
    }
  },

  /**
   * Callback invoked by Scriptaculous whenever the item's position changes during the drag.
   * This is being used to identify which element the user is currently dragging.
   */
  updateCurrentItem: function( element )
  {
    this.lastDraggedItem = element;
  },

  /**
   * Determines the order of the elements on the page.  Saves the previous value
   * so that we can revert the order if there is an error while persisting.
   */
  calculateItemOrder: function( )
  {
    this.oldItemOrder = this.itemOrder;
    this.itemOrder = $(this.itemContainer.immediateDescendants() || []).map( function(item) {
      var itemId = item.id.match(/^([A-Za-z0-9\-\:]*)[:](.*)$/) ? item.id.match(/^([A-Za-z0-9\-\:]*)[:](.*)$/)[2] : '';
      return itemId;
    });
  },

  updateItemOrder: function( newOrder )
  {
    this.oldItemOrder = this.itemOrder;
    this.itemOrder = newOrder;
  },

  /**
   * Persists the current list order to the server.
   *
   * Sends out the following request parameters:
   * - dnd_newOrder - one of these for each item id in the list, in order (e.g. dnd_newOrder=_1_1&dnd_newOrder=_2_1)
   * - dnd_timestamp - timestamp of when the page was loaded or the order was last changed.  Used for concurrent modification
   *                   detection
   * - dnd_itemId - id of the currently dragged item (this will only be specified by a visual drag and drop, not the accessible view)
   * - dnd_newPosition - new position of the dragged item (this will only be specified by a visual drag and drop, not the accessible view)
   * - any additional parameters specified in the contextParameters argument.
   */
  persistOrderChanges: function( )
  {
    var params = Object.extend({ dnd_newOrder: this.itemOrder, dnd_timestamp: this.timestamp }, this.contextParameters );

    // XSRF protection
    params.sessionid = getCookie( 'JSESSIONID' );

    // If you just want the framework to handle all the grunt work for you but
    // don't need a callback then you can set the reorderingurl to noop to skip the server notification
    if (this.mcReorderingUrl != "noop") {
      new Ajax.Request( this.mcReorderingUrl,
      {
        method: 'post',
        parameters: params,
        requestHeaders: { cookie: document.cookie },
        onSuccess: this.afterPersist.bind( this )
      });
    }
  },

  /**
   * Callback invoked after the order is persisted to the server.
   *
   * Expects JSON of the following form to be returned from the server:
   * - For a successful call : { "success" : "true", "timestamp" : "[server timestamp]" }
   * - For an unsuccessful call : { "success" : "false", "timestamp" : "[server timestamp]", "error" : "error or concurrentModification", "errorMessage" : "localized error message" }
   *
   * If the call is successful, nothing is done (since the item is already moved)
   *
   * If the call is unsuccessful, the order of the items is reverted back to what it was before the persist call and
   * an error inline receipt message is displayed.
   */
  afterPersist: function( req )
  {
    try
    {
        var result = req.responseText.evalJSON( true );
        if ( result.success != "true" )
        {
          this.revertPosition();

          if ( result.error == "concurrentModification" )
          {
             new page.InlineConfirmation("error", result.errorMessage, true);
          }
          else
          {
             new page.InlineConfirmation("error", result.errorMessage, false );
          }
        }
        else
        {
          if ( this.accessibleReorder )
          {
            var rawOldOrder = '';
            var rawNewOrder = '';
            this.itemOrder.each( function( col, index )
                                 {
                                   rawNewOrder = rawNewOrder + ':' + index + ':' +col;
                                 });
            this.oldItemOrder.each( function( col, index )
                                 {
                                   rawOldOrder = rawOldOrder + ':' + index + ':' + col;
                                 });
            if (rawOldOrder == rawNewOrder)
            {
              alert( page.bundle.getString("dragdrop.accessible.complete.nochange") );
            }
            else
            {
              alert( page.bundle.getString("dragdrop.accessible.complete") );
            }
          }
          this.timestamp = parseInt( result.timestamp, 10 );
        }
    }
    catch ( e )
    {
      this.revertPosition();
    }
  },

  /**
   * Reverts the order of items in the list to what it was before the last drag/drop operation.
   *
   * This modifies the actual DOM elements as well as the selet boxes in the accessible controls.
   */
  revertPosition: function()
  {
    this.itemOrder = this.oldItemOrder;
    this.syncSelectBoxOrder( this.itemOrder );
  },

  syncDndContainerOrder: function( selectBoxOrder )
  {
    var itemMap = {};
    var dndItemId = "" ;
    var id = "";

    this.itemContainer.immediateDescendants().each( function( item )
    {
      itemMap[item.id] = item;
      item.remove();
    });

    for ( var i = 0; i < selectBoxOrder.length; i=i+1 )
    {
      id = selectBoxOrder[ i ];
      dndItemId = "contentListItem:" + id;
      this.itemContainer.appendChild( itemMap[dndItemId] );
    }

    dndItemId = "";

  }

};

