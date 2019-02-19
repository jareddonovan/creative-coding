eesy.define(['jquery-private', 'monitor-handling', 'context-rules', 'context-links', 'json!context-node-link-data', 'json!monitor-data'], 
    function($, monitorHandling, contextRules, contextLinks, contextNodeLinks, monitors) {

  /*
   * This module deals with the relationship between urls, context rules, 
   * context links and monitors.
   */

  return {
    // public API:
    
    withRules: function(contextRules) { return __instance(contextRules, contextLinks, monitors); },
    withLinks: function(contextLinks) { return __instance(contextRules, contextLinks, monitors); },
    withMonitors: function(monitors) { return __instance(contextRules, contextLinks, monitors); },
    probeForPresentContexts: probeForPresentContexts,
    contextRulesMatchingUrlAndMode: contextRulesMatchingUrlAndMode,
    connectedMonitors: connectedMonitors,
    connectedContextLinks: connectedContextLinks,
    connectedContextNodeLinks: connectedContextNodeLinks,
    probeForMonitor: probeForMonitor,
    eesy_traversePathForMatchingContexts: eesy_traversePathForMatchingContexts
  };    
  
  function probeForMonitor(inurl, element) {
    eesy_traversePathForMatchingContexts(inurl, element, 0, function(contextRule) {
    
      // TODO implicit dependencies: dbg_contextFound
      $.each(connectedMonitors(contextRule), function(i, monitor) {
        
        // TODO implicit dependency: eesy_course_id
        monitorHandling.handleMonitor(monitor, 
          !(typeof eesy_course_id === 'undefined') ? eesy_course_id : -1);
      });
    });
  }

  function eesy_traverseMatchingContexts(inurl, element, withMode, matchingContextOperation) {
    $.each(contextRulesMatchingUrlAndMode(inurl, withMode), function(i, rule) {
      if (rule.tags.CompareToElement(element)) {
        matchingContextOperation(rule);
      }
    });
  }
  
  function eesy_traversePathForMatchingContexts(inurl, element, withMode, matchingContextOperation) {
      var parents = $(element).parents("*");
      eesy_traverseMatchingContexts(inurl, element, withMode, matchingContextOperation);
  
      for (var i = 0; i < parents.length; i++) {
          eesy_traverseMatchingContexts(inurl, parents[i], withMode, matchingContextOperation);
      }
  }
  
  function probeForPresentContexts(inUrl, onPresentContext) {
    $.each(contextRulesMatchingUrlAndMode(inUrl, 1), function(i, contextRule) {
      $.each(listElementsMatching(contextRule), function(j, element) {
        onPresentContext(contextRule, element);
      });
    });
  }
  
  function contextRulesMatchingUrlAndMode(url, mode) {
    var res = [];
    $.each(contextRules, function(i, contextRule) {
      if (contextRule.mode == mode && contextRule.CompareUrl(url)) {
        res.push(contextRule);
      }
    });
    return res;
  }
  
  function listElementsMatching(contextRule) {
    return elementsMatchingRule(listPossibleElements(contextRule), contextRule);
  }
      
  function elementsMatchingRule(elements, contextRule) {
    var res = [];
    $.each(elements, function(i, element) {
      if (contextRule.tags.CompareToElement(element)) {
        res.push(element);
      }
    });
    return res;
  }
      
  function listPossibleElements(contextRule) {
    return $(contextRule.tags.FTags[0].tagValue);
  }
  
  function connectedContextLinks(contextRule) {
    var result = [];
    $.each(contextLinks, function(i, contextLink) {
      if (contextLink.contextid == contextRule.id) {
        result.push(contextLink);
      }
    });
    return result;
  }
  
  function connectedContextNodeLinks(contextRule) {
    var result = [];
    $.each(contextNodeLinks, function(i, nodeLink) {
      if (nodeLink.contextId == contextRule.id) {
        result.push(nodeLink);
      }
    });
    return result;
  }
  
  function connectedMonitors(contextRule) {
    var result = [];
    $.each(monitors, function(i, monitor) {
      if (monitor.contextid == contextRule.id) {
        result.push(monitor);
      }
    });
    return result;
  }
  
});