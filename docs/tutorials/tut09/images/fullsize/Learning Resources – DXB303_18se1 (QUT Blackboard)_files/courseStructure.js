var courseStructure = {};

//loads a course Structure picker in container via ajax
//called from properties page & Welcome Wizard
courseStructure.Picker = Class.create();
courseStructure.Picker.prototype =
{
  initialize: function( courseId, containerId, onSelectCallback )
  {
    this._container = $(containerId);
    this._courseId = courseId;
    this._onSelectCallback = onSelectCallback;
    new Ajax.Updater( this._container,'/webapps/blackboard/execute/getCourseStructures?course_id='+courseId,
                   { evalScripts:true, onComplete: this.onPickerLoaded.bind( this ) } );
  },

  onPickerLoaded: function()
  {
   // we need to temporarily expose (display but keep invisible) the container
   // so scrollBar can compute its size properly
   page.util.exposeElementForMeasurement( this._container );
   var sbContent = this._container.down( 'div.courseStructureNameScroller > div > div.structure_scrollbar_content' );
   var sbTrack = this._container.down( 'div.courseStructureNameScroller > div > div.structure_scrollbar_track' );
   this.scrollBar = new Control.ScrollBar( sbContent, sbTrack );
   page.util.unExposeElementForMeasurement( this._container );

   this._sampleCheck = this._container.down('input[name="structureIncludeSampleContent"]');
   this._sampleCheckLabel = this._container.down('label[for="structureIncludeSampleContent"]');

   this._existingMenuDesc = this._container.down('li.existingMenu');
   this._newStructureDesc = this._container.down('li.newStructure');

   this._descDiv = this._newStructureDesc.down('div.courseStructureDescription');
   this._menuDiv = this._newStructureDesc.down('div.courseStructureMenu');
   this._includeSampleDiv = this._newStructureDesc.down('span.structureIncludeSampleContentCheck');
   this.formElement = this._container.down('input[name="structureChoice"]');
   this.initialSelectedValue = this.formElement.value;
   this._descSBContent = this._newStructureDesc.down('div.courseStructureDescriptionAndMenu' );
   this._descSBTrack = this._container.down('div.courseStructureDescriptions').down('div.structure_scrollbar_track' );
   this._currentValue = this._container.down('span.current-value');
   this._currentValueAccessibility = this._container.down('span.currentValueAccessibility');
   this._initialCurrentValue = this._currentValue.innerHTML;

   this._useExistingMenuButton = this._container.down('a.useExistingMenu');
   this._useSelectedStructureButton = this._container.down('a.useSelectedStructure');

   this._useExistingMenuButton.observe( 'click', this.onUseThisStructure.bindAsEventListener( this ) );
   this._useSelectedStructureButton.observe( 'click', this.onUseThisStructure.bindAsEventListener( this ) );
   var radioContainer = this._container.down('div.structure_scrollbar_content').down('ol');

   this._includeSampleDiv.hide();

   radioContainer.observe( 'keydown', this.onKeyDown.bindAsEventListener( this ) );

   this._radioController = new ariaControl.RadioGroup( {   container : radioContainer,
                                                           childSelector : "li.courseStructureName",
                                                           onclick : this.onStructureClick.bindAsEventListener( this ),
                                                           checkedClass : "courseStructureChoiceSelected",
                                                           label : page.bundle.getString( 'structure.picker.ax.label' )
   });
   this._radioController.onFocus( null, this._container.down('li.courseStructureName') ); // select first structure

   if ( !Event.KEY_SPACE )
   {
     Event.KEY_SPACE = 32;
   }
  },

  onKeyDown: function( event )
  {
    var key = event.keyCode || event.which;
    if ( key == Event.KEY_SPACE )
    {
      this._toggleUseThisStructure();
      Event.stop( event );
    }
  },

  _toggleUseThisStructure: function()
  {
    if ( !this.selectedStructure || this.selectedStructure.id == '' )
    {
      return;
    }
    if ( this.formElement.value == '' )  // Existing Menu is current value
    {
      // change current value to selected structure
      this._updateCurrentValue( this.selectedStructure.name );
      this.formElement.value = this.selectedStructure.id;
      this._useSelectedStructureButton.hide();
    }
    else
    {
      // change current value to Existing Menu
      this._updateCurrentValue( this._initialCurrentValue );
      this.formElement.value = '';
      this._useSelectedStructureButton.show();
    }
    this._updateSampleContentCheckBoxVisibility();
    this._sampleCheck.checked = false;
  },

  _updateCurrentValue: function( value )
  {
    var key = ( value == this._initialCurrentValue ) ? "structure.picker.ax.no.structure.will.be.added" : "structure.picker.ax.structure.to.be.added.is";
    this._currentValue.update( value );
    this._currentValueAccessibility.update( page.bundle.getString( key, value ) );
    this._sampleCheckLabel.update( page.bundle.getString( "add.structure.sample.content.checkbox", value ) );
  },

  onUseThisStructure: function( event )
  {
    if ( this.selectedStructure )
    {
      this._updateCurrentValue( this.selectedStructure.name );
      this.formElement.value = this.selectedStructure.id;
      this._radioController.setFocusOnSelectedElement();
      event.element().hide(); // hide button after it is clicked
        this._updateSampleContentCheckBoxVisibility();
        this._sampleCheck.checked = false;
    }
    if ( event )
    {
      event.stop();
    }
  },

  // user clicked on a structure in the picker:
  //  set the form element value and optionally notify the callback
  //  show/hide the the appropriate description for existingMenu or newStructure
  //  show/hide the sample content checkbox
  //  load the description & menu for the selected structure
  onStructureClick: function( structureElement )
  {
    var structure = {};
    structure.id = structureElement.readAttribute("bb:structureId");
    structure.name = structureElement.readAttribute("bb:structureName");
    structure.hasSampleContent = structureElement.readAttribute("bb:hasSampleContent");

    if (this.selectedStructure && this.selectedStructure.id == structure.id)
    {
      // If we're re-selecting the same structure that is currently selected, do nothing
      return;
    }
    this.selectedStructure = structure;

    var currentIsSelected = ( this.formElement.value == this.selectedStructure.id );
    this._includeSampleDiv.hide();

    if ( structure.id == '' )
    {
      this._existingMenuDesc.show();
      this._newStructureDesc.hide();
      Element[currentIsSelected ? 'hide' : 'show']( this._useExistingMenuButton );
    }
    else
    {
      this._existingMenuDesc.hide();
      this._newStructureDesc.show();
      this._updateSampleContentCheckBoxVisibility();
      Element[currentIsSelected ? 'hide' : 'show']( this._useSelectedStructureButton );
      this._menuDiv.hide();
      this._descDiv.hide();
      this._getDescription( structure.id );
      this._getMenu( structure.id );
    }

    if ( this._onSelectCallback )
    {
      this._onSelectCallback( structure );
    }
    this.scrollBar.scrollTo( structureElement );
    return true;
  },

  _updateSampleContentCheckBoxVisibility: function( )
  {
      if ( this.selectedStructure && this.selectedStructure.hasSampleContent && this.formElement.value != '' )
      {
        this._sampleCheck.show();
        this._sampleCheckLabel.show();
      }
      else
      {
        this._sampleCheck.hide();
        this._sampleCheckLabel.hide();
      }
  },

  hasSelectedValueChanged: function( )
  {
    return this.initialSelectedValue != this.formElement.value;
  },

  unSelectStructure: function( )
  {
    this._radioController.selectElement( null );
    this.formElement.value = this.initialSelectedValue;
    if ( this.initialDescrition )
    {
      this._menuDiv.update( '' );
      this._descDiv.update( this.initialDescrition );
      this._sampleCheck.hide();
    }
  },

  _getMenu: function( structureId )
  {
    var url = '/webapps/blackboard/execute/course/previewStructure?course_id='+this._courseId+'&structure_id=' + structureId+'&type=menu';
    new Ajax.Updater({ success: this._menuDiv }, url,
                      {evalScripts:true,
                        onComplete: function()
                        {
                          // Assuming that it will, almost all the time, take longer to get to this point for the menu than it will to refresh the description
                          this._menuDiv.show();
                          this._descDiv.show();
                          this._includeSampleDiv.show();
                          new Control.ScrollBar( this._descSBContent, this._descSBTrack );
                        }.bind( this )
                       }
                    );
  },

  _getDescription: function( structureId )
  {
    var url = '/webapps/blackboard/execute/course/previewStructure?course_id='+this._courseId+'&structure_id=' + structureId+'&type=description';
    new Ajax.Updater({ success: this._descDiv }, url);
  }

};


courseStructure.savedLightbox = null;
courseStructure.menuLightbox = null;

courseStructure.restoreLightbox = function()
{
  lightbox._currentLightbox = courseStructure.savedLightbox;
  courseStructure.savedLightbox = null;
};

courseStructure.showExtendedStructureMenuHelp = function(title, theText)
{
  alert(theText);
  /* This logic is _close_ to having nested lightboxes but not quite right.  If we really want
   * formatted text here then we have to
   * a) Remove the alert
   * b) Uncomment this code
   * c) Create the previewMenuHelp style
   * d) Probably create a separate wrapper style for this lightbox (previewMenuHelp is the guts - the outside needs something too)
   * e) Figure out a way to keep the wizard lightbox there, but faded out the way the body is faded out when
   *    this is the primary lightbox)
  if (courseStructure.menuLightbox !== null)
  {
    lightbox.closeCurrentLightbox();
    courseStructure.menuLightbox = null;
  }
  courseStructure.savedLightbox = lightbox._currentLightbox;
  lightbox._currentLightbox = null;

  theText = "<div class='previewMenuHelp'>" + theText  + "</div>";

  courseStructure.menuLightbox = new lightbox.Lightbox({
      title: title,
        contents: theText,
        defaultDimensions: { w: 420 ,h : 220},
        useDefaultDimensionsAsMinimumSize : true,
        verticalBorder: 125,
        horizontalBorder: 125,
        onClose:courseStructure.restoreLightbox
      });
    courseStructure.menuLightbox.open();
  */
};

courseStructure.showLoadingOverwrite = function()
{
  var loading = new Element('div', {'class' : 'loading-overwrite', "role" : "alert", "aria-live" : "assertive" });
  loading.update("<span>"+ page.bundle.getString('add.structure.importing')+"</span>");
  loading.show();
  $('contentPanel').insert({top : loading});
  $('navigationPane').hide();
  window.scrollTo( 0, 0 );
};

