var contentList =
{};

// Set by ContentListTag
contentList.courseId = '';

contentList.toggleDetails = function( contentId, toggleLink )
{
  var contentDiv = $( contentId );
  var detailsDiv = contentDiv.next( 'div.details', 0 );
  toggleLink = $( toggleLink );
  var img = toggleLink.down();

  var blindOptions = { duration: 0.3 };

  var isVisible;
  if ( detailsDiv.style.display !== 'none' )
  {
    isVisible = false;
    detailsDiv.blindUp( blindOptions );
    img.src = getCdnURL( '/images/ci/ng/portlet_expand.gif' );
    contentDiv.style.height = '48px';
  }
  else
  {
    isVisible = true;
    contentDiv.style.height = 'auto';
    detailsDiv.blindDown( blindOptions );
    img.src = getCdnURL( '/images/ci/ng/portlet_contract.gif' );
  }

  var toggleTitleKey = isVisible ? 'contentlist.hide.details' : 'contentlist.show.details';
  var toggleTitle = page.bundle.getString( toggleTitleKey );
  toggleLink.title = toggleTitle;
  img.alt = toggleTitle;

  ContentListDWRFacade.setItemVisibility( contentList.courseId, contentId, isVisible );
};
