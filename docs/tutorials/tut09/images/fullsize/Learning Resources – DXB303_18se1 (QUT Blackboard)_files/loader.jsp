


//sessionkey
var var_key = "bb671439-3c79-474d-a73f-bf0c22d67b5b";
var var_dashboard_url = "https://qut.eesysoft.com";
var var_loadfile = "https://qut.eesysoft.com/loadFile";
var var_style_path = "https://qut.eesysoft.com/resources/";
var var_stamp = "20180501092145";
var var_eesy_build = "2919";
var var_eesy_dbUpdateCount = "345";
var var_eesy_userUpdated = undefined;
var var_eesy_style_checksum = "fee015e5630ba6bece284f283c3a9f66";
var var_show_tab_initial = false;
var var_show_tab = var_show_tab_initial;
var var_open_dashboard_in_new_window = false;
var var_tab_version = 2;
var var_open_as_chat = false;
var var_language = -1;
var templates;
//var contextlinks = new Array();
//var contextmonitors = new Array();
var waitforload = false;
var supportTabMinimized = undefined;
var scrollbarRightAdjust = '19px';
var eesy_minimizedTabWidth = '8px';
var eesy_maximizedTabWidth = '';
var attemptUnobscure = true;
var doNotLoadEngineForUserAgentPattern = 'ANGEL Secure;';
//var var_eesy_hipa = undefined;
var var_eesy_lang = undefined;
var var_eesy_hiddenHelpItems = undefined;
var var_eesy_sac = undefined;
var var_eesy_helpitemsSeen = undefined;

/////////////////////////////////////////////////////////////////////////////
// loader.js

var eesyRequestCount = 0;
var systrayHandled;
var var_hasReportAccess = undefined;

if (!window.console) console = { log: function(){} };

function eesy_load_js(jsUrl) {
  var fileref = document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", jsUrl);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

//
// added checks to prevent the engine to load under ie < 11
//
function getIEVersion() {
  var ua = window.navigator.userAgent;
  var index = ua.indexOf("MSIE");
  
  if (index > 0) {
    return parseInt(ua.substring(index + 5, ua.indexOf(".", index)));
  } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
    return 11;
  } else {
    return 0; //It is not IE
  }
}

function allowedBrowserBasedOnAgentPattern() {
  if (!window.doNotLoadEngineForUserAgentPattern || doNotLoadEngineForUserAgentPattern == "")
    return true;
  
  return !navigator.userAgent.match(doNotLoadEngineForUserAgentPattern); 
}


function allowedBrowser() {
  if (!allowedBrowserBasedOnAgentPattern())
    return false;
  
  var ieVersion = getIEVersion();
  return ieVersion == 0 || ieVersion >= 10;
}


if (allowedBrowser()) {
  eesy_load_js(var_dashboard_url + "/require-with-callback.jsp");
}

function handleHelpItem(itemId) {
  var event;
  if (window.CustomEvent) {
    event = new CustomEvent("helpitemHandle", {detail: itemId});
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent("helpitemHandle", true, true, {detail: itemId});
  }
  document.dispatchEvent(event);
}

/**
 * Example:
 *
 * eesyRequire(['dep1', 'dep2'], function(dep1, dep2) {
 *   // init module
 * })
 */
function eesy_init_require() {
  window.eesyRequire = function(dependencies, initializer) {
    __eesyRequire(var_key, var_eesy_build, var_eesy_dbUpdateCount)(['require'], function(require) {
      require(dependencies, initializer);
    });
  };
  
  eesyRequire( ['jquery-private', 'sessionInfo', 'engine_core'], function($, sessionInfo, engineCore) {

    //$.support.cors = true;

    $(document).ajaxError(function(e, xhr, settings, exception) {
        console.log('error in: ' + settings.url + ' \n'+'error:\n' + exception );
    });

    //
    //  Load the CSS
    //
    eesy_load_css(var_style_path + "/proactiveresources/style.css"
        + "?styleChecksum=" + var_eesy_style_checksum);

    eesy_load_css(var_dashboard_url
        + "/dashboardstyles/base/style_v2/eesysoft-template/assets/css/supportCenter.min.css"
        + "?v=" + var_eesy_build);

    eesy_load_css(var_dashboard_url + "/Scripts/LoadProactiveOverrideCss.jsp"
        + "?styleChecksum=" + var_eesy_style_checksum);


    //
    //  Load the templates
    //
    $.ajaxSetup({
      cache: true
    });



    var eesy_url_load_templates = var_dashboard_url + "/Scripts/LoadTemplates.jsp"
      + "?callback=jsonTemplates"
      + "&language=" + var_language
      + "&styleChecksum=" + var_eesy_style_checksum;

    var eesy_url_language = var_dashboard_url + '/rest/language/proactive?'
        + "v=" + var_eesy_build + "&"
        + "u=" + var_eesy_dbUpdateCount;

    eesy_initUserValues(function() {
      var requests = [
        $.ajax({
          type: 'GET',
          url: eesy_url_load_templates,
          async: true,
          jsonpCallback: 'jsonTemplates',
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json) {
            templates = json;
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log("error:" + textStatus);
          }
        }),
        //$.getScript(eesy_url_contextRuleClass),
        //$.getScript(eesy_url_monitors),
        //$.getScript(eesy_url_engine_core),
        //$.getJSON(eesy_url_hipa, function(hipa) { var_eesy_hipa = hipa; }),
        /* 
        $.getJSON(eesy_url_contextNodeLinks, function(contextNodeLinks) {
          var_eesy_contextNodeLinks = contextNodeLinks;
        }),
        */
        $.getJSON(eesy_url_language, function(language) { var_eesy_lang = language; })
      ];
      
      $.when.apply($, requests).then(function() {
        //eesy_init_monitors();
        sessionInfo.init(var_dashboard_url, var_style_path, var_key, var_hasReportAccess);  
        engineCore.start();
      });
    });
  });
  
  function __eesyRequire(sessionKey, build, dbUpdateCount) {
    return eesy.requirejs.config({
      context: "eesy",
      urlArgs: "_=" + var_eesy_build,
      baseUrl: var_dashboard_url,
      paths: {
      
        // internal modules
        
        'field-decorator':
          'resources/style_v2/js_require_modules/field-decorator',
          
        'sessionInfo':
          'resources/style_v2/js_require_modules/sessionInfo',
          
        'supportCenter':
          'resources/style_v2/js_require_modules/supportCenter',
          
        'system-information':
          'resources/style_v2/js_require_modules/system-information',
          
        'utils':
          'resources/style_v2/js_require_modules/utils',
          
        'contact-options':
          'resources/style_v2/js_require_modules/contact-options',
          
        'contact-options-handler':
          'resources/style_v2/js_require_modules/contact-options-handler',

        'session-events':
            'resources/style_v2/js_require_modules/session-events',
  
        'templates':
          'resources/style_v2/js_require_modules/templates',
          
        'osage-app':
          'resources/style_v2/eesysoft-template/assets/js/app',
          
        'osage-results':
          'resources/style_v2/eesysoft-template/assets/js/results',
          
        'osage-selector':
          'resources/style_v2/eesysoft-template/assets/js/selector',
          
        'osage-contact':
          'resources/style_v2/eesysoft-template/assets/js/contact',
          
        'context-probe':
          'static/js/context-probe',
          
        'context-handling':
          'static/js/context-handling',
          
        'monitor-handling':
          'static/js/monitor-handling',
            
        'engine-state':
          'static/js/engine-state',
          
        'found-items-handler':
          'static/js/found-items-handler',
          
        'events-urlchange':
          'static/js/events-urlchange',

        'events-iframe':
          'static/js/events-iframe',
          
        'context-rules':
          'static/js/context-rules',
            
        'context-links':
          'static/js/context-links',
    
        'keep-alive':
          'static/js/keep-alive',

        'helpitem-handling':
          'static/js/helpitem-handling',
          
        'presentation':
          'static/js/presentation',

        'helpitem-loader':
          'static/js/helpitem-loader',
          
        'mouse':
          'static/js/mouse',

        'engine_core':
          'static/js/engine_core',

        // resources
        
        'language-supportcenter':
          'rest/language/supportcenter?sessionkey=' + sessionKey,
          
        'settings-supportcenter':
          'rest/settings/supportcenter?sessionkey=' + sessionKey,
          
        'context-rule-data':
          'rest/proactive/context-rules?v=' + build + "&u=" + dbUpdateCount,

        'context-link-data':
          'rest/proactive/context-links?v=' + build + "&u=" + dbUpdateCount,
            
        'context-node-link-data':
          'rest/proactive/contextNodeLinks?v=' + build + "&u=" + dbUpdateCount,

        'user-context-variables':
          'rest/proactive/userContextVariables?v=' + build + "&u=" + dbUpdateCount + '&sessionkey=' + sessionKey,
          
        'monitor-data':
          'rest/proactive/monitors?v=' + build + "&u=" + dbUpdateCount,
          
        'hipa':
          'rest/proactive/hipa?v=' + build + "&u=" + dbUpdateCount,

        // external dependencies
        'jquery-private':
          'dashboardstyles/base/style_v2/js_require_modules/jquery-private.jsp?noext',
          
        'mustachejs':
          'dashboardstyles/base/style_v2/js_require_modules/mustachejs-private.jsp?noext',
          //'webjars/mustachejs/2.2.1/mustache.min',
          
        'bootstrap':
          'bootstrap-js-as-define.jsp?noext',
          
        'datepicker':
          'dashboardstyles/base/style_v2/js_require_modules/bootstrap-datepicker.jsp?noext',
          
        // require plugins
        
        'text':
          //'webjars/requirejs-text/2.0.14/text',
          'static/js/compiled/text',
          
        'json':
          //'webjars/requirejs-plugins/1.0.2/json',
          'static/js/compiled/json'
          
      },
      
      shim: {
        'jquery-private': {
          exports: '$'
        },
        bootstrap: {
          deps: ['jquery-private'] 
        },
        datepicker: {
          deps: ['bootstrap', 'jquery-private']
        }//,
//        mustachejs: {
//          exports: 'Mustache'
//        } 
        
      },
  
      map: {
        '*': { 'jquery': 'jquery-private' }
      }
    });
  }
}



function eesy_load_css(url) {
  if (document.createStyleSheet) {
    document.createStyleSheet(url);
  } else {
    var fileref = document.createElement("link");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", url);
    fileref.setAttribute("rel", "stylesheet");
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}

function eesy_set_role_inactive(rolename) {
  for (var prop in var_eesy_sac) { 
    if(var_eesy_sac[prop].rolename == rolename) {
      var_eesy_sac[prop].enabled = false;
    }
  }
}

function eesy_issueUserRequests() {
    var $ = $j_eesy;

    return [
        $.getJSON(var_dashboard_url + '/rest/proactive/hiddenHelpItems?sessionkey=' 
                + var_key + '&userUpdated=' 
                + var_eesy_userUpdated, function(hiddenHelpItems) {
                
            var_eesy_hiddenHelpItems = hiddenHelpItems;
        }),
        
        $.getJSON(var_dashboard_url + '/rest/proactive/sessionAccessCache?sessionkey=' 
                + var_key, function(sac) {
                
            var_eesy_sac = sac;
            //
            // check if any of the roles in the sac should be deactivated
            //
            if(!(typeof var_eesy_inactive_roles === 'undefined')) {
              for (var i=0; i < var_eesy_inactive_roles.length; i++) {
                eesy_set_role_inactive(var_eesy_inactive_roles[i]);
              }
            }
        }),
        
        $.getJSON(var_dashboard_url + '/rest/proactive/helpItemsSeen?sessionkey=' 
                + var_key + '&userUpdated=' 
                + var_eesy_userUpdated, function(helpitemsSeen) {
                
            var_eesy_helpitemsSeen = helpitemsSeen;
        })
    ];
}

function eesy_setUser(params) {
    var $ = $j_eesy;
    $(document).trigger("target_application.user_changed", [params]);
}

function eesy_initUserValues(onUserValuesInited) {
    var $ = $j_eesy;

    $.getJSON(var_dashboard_url + "/rest/proactive/userValues?sessionkey=" 
            + var_key + '&stamp=' 
            + var_stamp, function(userValues) {
            
        var_show_tab = (!!var_key) && (var_show_tab_initial || userValues.isShowTab);
        var_eesy_userUpdated = userValues.userUpdatedStamp;
        var_language = userValues.languageId;
        supportTabMinimized = userValues.isSupportTabMinimized;
        var_hasReportAccess = userValues.hasReportAccess;

        $.when.apply($, eesy_issueUserRequests()).then(onUserValuesInited);
    });
}

