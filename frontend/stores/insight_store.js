const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const InsightConstants = require("../constants/insight_constants");

let InsightStore = new Store(AppDispatcher);

let _insights = {};
let _paging = {};


InsightStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case InsightConstants.INSIGHTS_RECEIVED:
      receiveInsights(payload);
      receivePaging(payload);
      InsightStore.__emitChange();
      break;
    case InsightConstants.PAGE_INSIGHTS_RECEIVED:
      receivePageInsights(payload.insights);
      InsightStore.__emitChange();
      break;
  }
};

const receivePageInsights = function(data){
  _insights[data.pageId] = data.insights
}

const receiveInsights = function(payload){
  _insights[payload.postId] = payload.insights;
};


const receivePaging = function(payload){
  _paging[payload.postId] = payload.paging;
};

InsightStore.getInsights = function(postId){
  if (_insights[postId] !== undefined){
    return Object.assign({}, _insights[postId]);
  }
};

InsightStore.getPageInsights = function(pageId){
  if (_insights[pageId] !== undefined){
    return _insights[pageId];
  }
}



module.exports = InsightStore;
