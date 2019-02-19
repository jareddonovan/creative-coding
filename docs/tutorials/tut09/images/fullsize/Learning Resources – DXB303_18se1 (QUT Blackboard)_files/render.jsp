
if (typeof(osc_BasicLTI_openBasicLTI) == 'undefined') {
  osc_BasicLTI_openBasicLTI = function(event) {
    var ok = false;
    var resp;
    var url = this.href;
    var query = '';
    var p = url.indexOf('?');
    var errormsg = 'Error: Unable to connect to tool, please try again or contact support';
    if (p >= 0) {
      query = url.substr(p);
      url += '&';
    } else {
      url += '?';
    }
    url += 'ajax=true';
    new Ajax.Request('/webapps/osc-BasicLTI-bb_bb60/openin.jsp' + query, {
      asynchronous: false,
      onSuccess: function(response) {
        if (response.status === 200) {
          if (response.responseJSON.response === 'Success') {
            ok = true;
            resp = response;
          } else {
            errormsg = response.responseJSON.reason;
          }
        }
      }
    });
    if (!ok) {
      alert(errormsg);
      event.stop();
    } else if (resp.responseJSON.available && ((resp.responseJSON.openin === 'O') || (resp.responseJSON.openin === 'P'))) {
      var dimensions = document.viewport.getDimensions();
      var width;
      var height;
      if (resp.responseJSON.hasOwnProperty('width')) {
        width = resp.responseJSON.width;
      } else {
        width = Math.round(dimensions.width * 0.8);
      }
      if (resp.responseJSON.hasOwnProperty('height')) {
        height = resp.responseJSON.height;
      } else {
        height = Math.round(dimensions.height * 0.8);
      }
      if (resp.responseJSON.openin === 'O') {
        var el_if = document.getElementById('osc-BasicLTI-overlay');
        var osc_lbParam = {
          defaultDimensions : { w : width, h : height },
          title : resp.responseJSON.name,
          openLink : el_if,
          contents : '<iframe src="' + url + '" width="100%" height="' + height + '" />',
          closeOnBodyClick : false,
          showCloseLink : true,
          useDefaultDimensionsAsMinimumSize : true,
          ajax: false
        };
        var osc_lightbox = new lightbox.Lightbox(osc_lbParam);
        osc_lightbox.open();
      } else if (resp.responseJSON.openin === 'P') {
        var w = window.open(url, resp.responseJSON.window, 'width=' + width + ',height=' + height + ',menubar=no,toolbar=no,scrollbars=yes,resizable=yes');
        w.focus();
      }
      event.stop();
    }
  }
}

if (typeof(osc_BasicLTI_popup) == 'undefined') {
  osc_BasicLTI_popup = function(event) {
    var name = osc_BasicLTI_getParamValue(this.href, 'name');
    var url = osc_BasicLTI_getParamValue(this.href, 'url');
    var width = osc_BasicLTI_getParamValue(this.href, 'width');
    var height = osc_BasicLTI_getParamValue(this.href, 'height');
    var dimensions = document.viewport.getDimensions();
    if (!width || (width <= 0)) {
      width = Math.round(dimensions.width * 0.8);
    }
    if (!height || (height <= 0)) {
      height = Math.round(dimensions.height * 0.8);
    }
    var w = window.open(url, name, 'width=' + width + ',height=' + height + ',menubar=no,toolbar=no,scrollbars=yes,resizable=yes');
    w.focus();
    event.stop();
  }
}

if (typeof(osc_BasicLTI_overlay) == 'undefined') {
  osc_BasicLTI_overlay = function(event) {
    var name = osc_BasicLTI_getParamValue(this.href, 'name');
    var url = osc_BasicLTI_getParamValue(this.href, 'url');
    var width = osc_BasicLTI_getParamValue(this.href, 'width');
    var height = osc_BasicLTI_getParamValue(this.href, 'height');
    var dimensions = document.viewport.getDimensions();
    if (!width || (width <= 0)) {
      width = Math.round(dimensions.width * 0.8);
    }
    if (!height || (height <= 0)) {
      height = Math.round(dimensions.height * 0.8);
    }
    var el_if = document.getElementById('osc-BasicLTI-overlay');
    var osc_lbParam = {
      defaultDimensions : { w : width, h : height },
      title : name,
      openLink : el_if,
      contents : '<iframe src="' + url + '" width="100%" height="' + height + '" />',
      closeOnBodyClick : false,
      showCloseLink : true,
      useDefaultDimensionsAsMinimumSize : true,
      ajax: false
    };
    var osc_lightbox = new lightbox.Lightbox(osc_lbParam);
    osc_lightbox.open();
    event.stop();
  }
}

if (typeof(osc_BasicLTI_lightbox) == 'undefined') {
  osc_BasicLTI_lightbox = function(name, url, width, height) {
    var dimensions = document.viewport.getDimensions();
    if (!width || (width <= 0)) {
      width = Math.round(dimensions.width * 0.8);
    }
    if (!height || (height <= 0)) {
      height = Math.round(dimensions.height * 0.8);
    }
    var el_if = document.getElementById('osc-BasicLTI-overlay');
    var osc_lbParam = {
      defaultDimensions : { w : width, h : height },
      title : name,
      openLink : el_if,
      contents : '<iframe src="' + url + '" width="100%" height="' + height + '" />',
      closeOnBodyClick : false,
      showCloseLink : true,
      useDefaultDimensionsAsMinimumSize : true,
      ajax: false
    };
    var osc_lightbox = new lightbox.Lightbox(osc_lbParam);
    osc_lightbox.open();
  }
}

if (typeof(osc_BasicLTI_getParamValue) == 'undefined') {
  osc_BasicLTI_getParamValue = function(url, paramName) {
    url = url.replace('&amp;', '&');
    var paramValue = '';
    var pos = url.indexOf('?');
    if (pos >= 0) {
      var query = url.substr(pos) + '&';
      var regex = new RegExp('.*?[&\\?]' + paramName + '=(.*?)&.*');
      var value = query.replace(regex, "$1");
      if (value != query) {
        paramValue = decodeURIComponent(value);
      }
    }
    return paramValue;
  }
}