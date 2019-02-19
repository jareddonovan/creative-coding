eesy.define(['jquery-private', 'sessionInfo', 'json!monitor-data'], function($, sessionInfo, contextmonitors) {
  /*
   * Private functions
   */
  function eesy_setMonitorCookie(value) {
    document.cookie = "eesymonitorcookie" + value + "_" + sessionInfo.sessionKey() + "=" + value + "; path=/;";
  }

  function eesy_deleteMonitorCookie(value) {
      document.cookie = "eesymonitorcookie" + value + "_" + sessionInfo.sessionKey()
          + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  }
  
  function checkMonitorCookies() {
      var ca = document.cookie.split(';');
  
      for (var i=0; i < ca.length; i++) {
          var c = ca[i].split('=');
  
          if (c[0].indexOf("eesymonitorcookie") != -1) {
              for (ii = 0; ii < contextmonitors.length; ii++) {
                  if(parseInt(c[1]) == contextmonitors[ii].id) {
                      var cp = c[0].split('_');
  
                      if (cp.length > 1) {
                          if (cp[1] == sessionInfo.sessionKey()) {
                              handleMonitor(contextmonitors[ii], -1);
                          }
                      }
                  }
              }
          }
      }
  }
  
  /*
   * Public functions
   */
  
  function handleMonitor(m, courseId) {
    if (m.token != sessionInfo.sessionKey()) {
        eesy_setMonitorCookie("" + m.id);

        var url = sessionInfo.dashboardUrl() + "/Scripts/MonitorVisited.jsp?id=" + m.id + "&key="
                + sessionInfo.sessionKey() + "&courseid=" + courseId + "&stmp="+(new Date().getTime());

        m.token = sessionInfo.sessionKey();

        $.ajax({
            type: 'GET',
            url: url,
            async: true,
            jsonpCallback: 'jsonMonitorVisited'+m.id,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                eesy_deleteMonitorCookie("" + m.id);
            }
        });
    } else {
        eesy_deleteMonitorCookie("" + m.id);
    }
  }
  
  function clearTokens() {
    for (var ii = 0; ii < contextmonitors.length; ii++) {
      contextmonitors[ii].token = "";
    }
  }
  
  return {
    handleMonitor: handleMonitor,
    checkMonitorCookies: checkMonitorCookies,
    clearTokens: clearTokens
  };
});