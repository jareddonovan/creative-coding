eesy.define(['jquery-private'],
    function($) {

  function replaceLiveHandler(eventName, selector, callback) {
    $(document)
        .off(eventName, selector)
        .on(eventName, selector, callback);
  };
  
  function onClickOrSelectKey(selector, callback) {
    replaceLiveHandler('click', selector, function(e) {
      if (!$(this).hasClass('___is-disabled')) {
        callback(e, this);
      };
    });
    replaceLiveHandler('keypress', selector, function(e) {
      if (!$(this).hasClass('___is-disabled')) {
        if (isSelectKey(e)) {
          callback(e, this);
        };
      };  
    });
  };
  
  // TODO remove? (if not, selector must be scoped - replaceLiveHandler no longer does it.)
  function makeFocusable(selector, focusClass) {
    replaceLiveHandler('focus', selector, function() {
      //$(this).addClass(focusClass);
    });

    replaceLiveHandler('blur', selector, function() {
        //$(this).removeClass(focusClass);
    });
  }
  
  function isSelectKey(e) {
    var code = e.keyCode || e.which;
    return (code === 13) || (code === 32);
  };
  
  return {
    replaceLiveHandler: replaceLiveHandler,
    isSelectKey: isSelectKey,
    onClickOrSelectKey: onClickOrSelectKey,
    makeFocusable: makeFocusable
  };
  
});