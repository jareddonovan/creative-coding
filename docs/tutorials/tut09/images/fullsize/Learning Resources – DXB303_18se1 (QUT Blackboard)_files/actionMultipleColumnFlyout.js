var actionMultipleColumnFlyout =
{
  toggleSubColumn : function( menuId, elemId, numSubColumns )
  {
    if ( menuId && elemId && numSubColumns )
    {
      // remove old css classes
      var numColumns = $(menuId + '_numColumns');
      var myMenu = $(menuId);
      myMenu.removeClassName ( 'bcMenuDiv-' + $(numColumns).value );
      $$('#' + menuId + ' div.sub-column').each( function(item) {
            $(item).removeClassName ( 'column-' + $(numColumns).value );
      });

      // update num of columns
      var subColumn = $(elemId).up("div.sub-column").next('div.sub-column');
      var firstColumn = $(elemId).up("div.sub-column");
      var img = $('slideOutImg');
      if ( $(subColumn).visible() )
      {
        $(numColumns).value = parseInt( $(numColumns).value ) - numSubColumns ;
        // toggle the arrow
        $(elemId).removeClassName( 'slideoutLink-active liveArea' );
        img.setAttribute( 'alt', $(menuId + '_showText').value  + ' ' + $(elemId).title);
        firstColumn.removeClassName('slideoutOpen');
      }
      else
      {
        $(numColumns).value = parseInt( $(numColumns).value ) + numSubColumns ;
        // toggle the arrow
        $(elemId).addClassName( 'slideoutLink-active liveArea' );
        img.setAttribute( 'alt', $(menuId + '_hideText').value  + ' ' + $(elemId).title);
        firstColumn.addClassName('slideoutOpen');
      }

      // add new css classes
      myMenu.addClassName ( 'bcMenuDiv-' + $(numColumns).value );
      $$('#' + menuId + ' div.sub-column').each( function(item) {
            $(item).addClassName ( 'column-' + $(numColumns).value );
      });

      // toggle sub-columns
      for ( i=0; i<numSubColumns; i++)
      {
        $(subColumn).toggle();
        subColumn = $(subColumn).next('div.sub-column');
      }
      myMenu.flyoutMenu.resizeAfterShowHide();
    }
  }
};
