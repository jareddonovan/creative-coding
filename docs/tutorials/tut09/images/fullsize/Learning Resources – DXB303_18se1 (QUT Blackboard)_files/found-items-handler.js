eesy.define(['presentation'], function(presentation) {
  
  return {
    create: foundItemsHandler
  };
  
  function foundItemsHandler() {
    var __foundItems = [];
    
    return {
      addFoundItem: addFoundItem,
      clearFoundItems: clearFoundItems,
      removeFoundItemsWithSource: removeFoundItemsWithSource,
      getFoundItemsString: getFoundItemsString
    };
      
    //
    
    function addFoundItem(id,src) {
      for (var ihi = 0; ihi < __foundItems.length; ihi++ ) {
        if (__foundItems[ihi].id == id) return;
      }
  
      __foundItems[__foundItems.length] = {
        id: id,
        src: src
      };
      
      presentation.helpAvailableNotify();
    }
    
    function clearFoundItems() {
        __foundItems = [];
        presentation.helpAvailableNotify();
    }
    
    function removeFoundItemsWithSource(src) {
        var tmpFoundItems = [];
        for (var ihi = 0; ihi < __foundItems.length; ihi++ ) {
            if(__foundItems[ihi].src != src){
                tmpFoundItems.push(__foundItems[ihi]);
            }
        }
        __foundItems = tmpFoundItems;
    }
    
    function getFoundItemsString() {
        res = "";
    
        for (var ihi = 0; ihi < __foundItems.length; ihi++ ) {
            if (ihi != 0)
                res += ",";
    
            res += __foundItems[ihi].id;
        }
    
        return res;
    }  
  }
});