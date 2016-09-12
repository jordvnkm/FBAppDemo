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
  }
};


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



module.exports = InsightStore;
