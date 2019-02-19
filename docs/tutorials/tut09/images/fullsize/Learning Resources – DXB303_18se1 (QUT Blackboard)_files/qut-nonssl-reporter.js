/** 
 * IE origin polyfill (very hacky)
 * http://tosbourn.com/2013/08/javascript/a-fix-for-window-location-origin-in-internet-explorer/
 */
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + ((window.location.port && (window.location.port != 443 && window.location.port != 80)) ? ':' + window.location.port : '');
}

Event.observe(document, "dom:loaded", function() {

  /**
   * attempt to import options from window._qutbb
   * @type {Object}
   */
  var opts = window._qutbb ? window._qutbb.sslReporter.opts : undefined;

  /**
   * default options
   * @type {Object}
   */
  var defaultopts = {

    /**
     * elems to check for bad 'src' or 'href' properties
     * @type {HTMLElement[]}
     */
    elems: $$('img, video, audio, object, script, link'),

    /**
     * what origins are okay
     * @type {String[]}
     */
    originWhitelist: ["https://ajax.googleapis.com", "https://www.youtube.com", "https://google-analytics.com"],

    /**
     * want to use google analytics?
     * @type {Boolean}
     */
    useGA: false,

    /**
     * want to use local analytics?
     * @type {Boolean}
     */
    useLocal: false,

    /**
     * want to use the console?
     * @type {Boolean}
     */
    useConsole: true,

    /**
     * if using local analytics, where's a one pixel gif
     * @type {String}
     */
    localPixelGif: "/pixel.gif",

    /**
     * what console level (error, warn, info, log, debug)
     * @type {String}
     */
    consoleLevel: 'warn'

  };

  // set defaults if options were not imported
  if (!opts) {
    opts = defaultopts;
  }

  var sources = [];
  var loggedcount = 0;

  /**
   * returns a HTMLAnchorElement with all the good propeties
   * @param  {String} href        a well-formed URL to use as the href
   * @return {HTMLAnchorElement}
   */
  var makeElemA = function(href, originaltag) {
    var tmpa = document.createElement('a');
    tmpa.href = href;

    // IE origin support... again
    if (!tmpa.origin) {
      tmpa.origin = tmpa.protocol + "//" + tmpa.hostname + ((tmpa.port && (tmpa.port != 443 && tmpa.port != 80)) ? ':' + tmpa.port : '');
    }

    // munge in the original tag name as a property for stats later on
    tmpa.originaltag = originaltag;

    return tmpa;
  };

  /**
   * adds the source (or href) of an element to an array
   * @param {HTMLElement} elem    a list of various elements that have either a
   */
  var addElemSourcesToArray = function(elem) {
    var source;

    // js etc
    if (elem.src) {
      source = elem.src;
    }

    // css etc
    else if (elem.href) {
      source = elem.href;
    }

    // ignore onload hack for IE, otherwise we end up logging 
    // pretty sure this is dynamically injected by prototype or something
    if (elem.id === "__ie_onload" && (elem.src === "https://0.0.0.0/" || elem.src === "http://0.0.0.0/")) {
      source = undefined;
    }

    // others are probably inline scripts, won't worry about these for now
    // else {
    //   console.error('unable to find href or src for element', elem.innerHTML);
    // }

    // add valid sources to array
    if (typeof(source) !== 'undefined') {
      sources.push(makeElemA(source, elem.tagName.toLowerCase()));
    }
  };

  /**
   * records sources that don't match document's origin
   * @param  {HTMLAnchorElement[]} sources
   */
  var logCrossOriginViolations = function(sources) {
    var docorigin = document.location.origin;
    var isInWhitelist;
    sources.each(function(source) {
      isInWhitelist = false;

      opts.originWhitelist.each(function(goodorigin) {
        if (isInWhitelist === false && source.origin === goodorigin) {
          isInWhitelist = true;
        }
      });

      if (isInWhitelist === false && source.origin !== docorigin) {
        message = 'Origin "' + source.origin + '" does not match document origin "' + docorigin + '" and is not whitelisted';
        logger(source.originaltag + '-origin-violation', message, source.href, opts);
      }
    });
  };

  /**
   * records sources that don't match document's protocol
   * @param  {HTMLAnchorElement[]} sources
   */
  var logProtocolMismatch = function(sources) {
    var docproto = document.location.protocol;
    var message;
    sources.each(function(source) {
      if (docproto === 'http:' || docproto === 'https:') {
        if (source.protocol !== docproto) {
          message = 'Resource with protocol "' + source.protocol + '" does not match document protocol "' + docproto + '"';
          logger(source.originaltag + '-protocol-violation', message, source.href, opts);
        }
      }
    });
  };

  var logger = function(category, message, resource, opts) {
    loggedcount = loggedcount + 1;
    if (opts.useConsole) console[opts.consoleLevel](category, message, resource, loggedcount);
    if (opts.useGA) _gaq.push(['_trackEvent', category, message, resource, loggedcount, false]);
    if (opts.useLocal) {
      var query = $H({
          category: category,
          message: message,
          resource: resource,
          loggedcount: loggedcount
        })
        .toQueryString();
      var img = new Element('img', {
        'id': 'qut-nonssl-reporter-pixelgif' + loggedcount,
        src: opts.localPixelGif + '?' + query
      });
      $(document.body)
        .insert(img);
    }
  };

  // /**
  //  * various browser checks
  //  */
  // var sanityCheck = function() {
  //   var a = document.createElement('a');
  //   a.href = '//www.google.com/';

  //   var docproto = document.location.protocol;
  //   var docorigin = document.location.origin;
  //   var aproto = a.protocol;
  //   var aorigin = a.origin;

  //   if (a.protocol && a.protocol.length > 0) {
  //     if (aproto === docproto) {
  //       console.log('protocol match for "//" resource tests okay: "' + aproto + '" !== "' + docproto + '"');
  //     }
  //   } else {
  //     console.error('browser is missing support for protocol property');
  //   }

  //   if (a.origin && a.origin.length > 0) {
  //     if (aorigin !== docorigin) {
  //       console.log('origin mismatch tests okay: "' + aorigin + '" !== "' + docorigin + '"');
  //     }
  //   } else {
  //     console.error('browser is missing support for origin property');
  //   }
  // };

  // /**
  //  * spams console with everything
  //  * @param  {HTMLAnchorElement[]} sources
  //  */
  // var logAllSources = function(sources) {
  //   sources.each(function(source) {
  //     console.log({
  //       'host': source.host,
  //       'hostname': source.hostname,
  //       'origin': source.origin,
  //       'pathname': source.pathname,
  //       'port': source.port,
  //       'protocol': source.protocol,
  //       'search': source.search,
  //       'username': source.username,
  //       'password': source.password
  //     });
  //   });
  // };

  var init = function() {
    // sanityCheck();
    sources = [];
    $$(opts.elems)
      .each(addElemSourcesToArray);

    // logAllSources(sources);
    logProtocolMismatch(sources);
    logCrossOriginViolations(sources);
  };

  // FIRE.
  init();

});