eesy.define(['jquery-private', 'context-probe', 'monitor-handling', 'helpitem-handling'], 
    function($, ctxProbe, monitorhandling, helpitemhandling) {

  return {
  
    /*
     * Some funny nesting here. Use like: 
     * ctxHandling.withUrl(url).handlePresentContext
     * to make a handler function.
     */
  
    withUrl: function(inUrl) {
      return {
        handlePresentContext: handlePresentContext,
        handleContextLinks: handleContextLinks,
        handleMonitors: handleMonitors
      };
      
      function handlePresentContext(contextRule, element) {
        //
        //  check if any monitors is connected
        //
        handleMonitors(contextRule);
        
        //
        //  check if any helpitems is connected
        //
        handleContextLinks(contextRule, element, 1); // Context Rule Mode 1: By presence
      }
      
      function handleMonitors(contextRule) {
        $.each(ctxProbe.connectedMonitors(contextRule), function(j, monitor) {
          monitorhandling.handleMonitor(monitor,  
              !(typeof eesy_course_id === 'undefined') ? eesy_course_id : -1);
        });
      }
      
      function handleContextLinks(contextRule, element, mode) {
        $.each(ctxProbe.connectedContextLinks(contextRule), function(j, contextLink) {
          helpitemhandling.handleContextLink(contextLink, mode, element, inUrl);
        });
      }
      
    },   

  };
});