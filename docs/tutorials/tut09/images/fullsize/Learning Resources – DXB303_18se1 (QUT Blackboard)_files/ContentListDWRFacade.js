
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (ContentListDWRFacade == null) var ContentListDWRFacade = {};
ContentListDWRFacade._path = '/webapps/blackboard/dwr_open';
ContentListDWRFacade.setItemVisibility = function(p0, p1, p2, callback) {
  dwr.engine._execute(ContentListDWRFacade._path, 'ContentListDWRFacade', 'setItemVisibility', p0, p1, p2, callback);
}
ContentListDWRFacade.initContextFromRequestHeader = function(callback) {
  dwr.engine._execute(ContentListDWRFacade._path, 'ContentListDWRFacade', 'initContextFromRequestHeader', false, callback);
}
