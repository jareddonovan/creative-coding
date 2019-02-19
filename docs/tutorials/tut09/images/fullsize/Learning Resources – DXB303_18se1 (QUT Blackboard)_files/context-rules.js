eesy.define(['jquery-private','json!context-rule-data'], function($, contextRuleData) {
  var contextrules = [];

  $.each(contextRuleData, function(i, contextRule) {
    contextrules.push(new ContextRule(contextRule.id, contextRule.pattern, contextRule.mode));
  });
  
  return contextrules;
  
  
  
  function RemoveCP(s){
    return s.replace("CP_","");
  }
  
  function Tag(name, val, mt) {
    this.tagName = name.toUpperCase();
    this.tagValue = this.tagName == "CHILDSELECTOR" ? val : RemoveCP(val.toUpperCase());
    this.tagMatchType = mt.toUpperCase();
  }
  
  function Tags (s) {
    this.FTags = new Array();
  
    var w = s.split("{;}");
    for (var spi = 0; spi < w.length; spi++ ) {
      var w2 = w[spi].split("{MT}");
     
      if (w2.length == 1) {
        var t = w2[0].split("{-}");
        this.FTags[this.FTags.length] = new Tag(t[0],t[1],'C');
      } else {
        var t2 = w2[1].split("{-}");
        this.FTags[this.FTags.length] = new Tag(t2[0],t2[1],w2[0]);
      }
    }
  
  
    this.CompareToElement = function(element) {
      for (var cti = 0; cti < this.FTags.length; cti++ ) {
        var rulePart = this.FTags[cti];
      
        if (rulePart.tagName == "CHILDSELECTOR") {
          var l = $j_eesy(element).find(rulePart.tagValue).length;
        
          if (l == 0) return false;
        } else {
          var val;
          
          if (rulePart.tagName == "TAG") { // ("tagName" is more like "rule type")
            val = $j_eesy(element).prop('tagName');
          } else if (rulePart.tagName == "INNERHTML" && $j_eesy(element).children().size() == 0) {
            val = $j_eesy(element).html();
          } else {
            val = $j_eesy(element).attr(rulePart.tagName);
          }
        
          if (("a" + val + "b") == "aundefinedb") return false;
          
          val = RemoveCP(val.toUpperCase());
          
          if (rulePart.tagMatchType == "C" && val.indexOf(rulePart.tagValue) == -1) return false;
          if (rulePart.tagMatchType == "E" && rulePart.tagValue != val) return false;
        }
      }
    
      return true;
    }
  }
  
  
  function ContextRule (id,rec,mode) {
    rec = decodeURIComponent(rec);
  
    this.id = id;
    this.recognition = rec;
    this.mode = mode;
  
    var parts = rec.split("{urlend}");
    var urlparts = parts[0].split("{url}");
  
  
    this.urlMatchType = urlparts[0];
    if (this.urlMatchType == "M") {
      this.url = urlparts[1].split("{-}");
      for (var cti = 0; cti < this.url.length; cti++ ) {
        this.url[cti] = RemoveCP(this.url[cti].toUpperCase());
      }
    } else {
      this.url = urlparts[1];
      this.url = RemoveCP(this.url.toUpperCase());
    }
  
    this.tags = new Tags(parts[1]);
  
    this.isGlobal = function() {
     return this.urlMatchType == "N";
    };
  
    this.CompareUrl = function(iurl) {
      var res = false;
      if(this.urlMatchType == "M") {
        res = true;
        for (var cti = 0; cti < this.url.length; cti++ ) {
          if(RemoveCP(iurl.toUpperCase()).indexOf(this.url[cti]) == -1) {
            res = false;
          }
        }
      }
      else if(this.urlMatchType == "C") {
        if(RemoveCP(iurl.toUpperCase()).indexOf(this.url) >= 0) {
          res = true;
        }
      }
      else if(this.urlMatchType == "E") {
        if(this.url == RemoveCP(iurl.toUpperCase()) ) {
          res = true;
        }
      }
      else if(this.urlMatchType == "N") {
        res = true;
      }
      return res;
    };
  
  }
  
});