const AppDispatcher = require("../dispatcher/dispatcher");
const InsightConstants = require("../constants/insight_constants");
const InsightApiUtil = require("../utils/insight_api_util");


const InsightActions = {
  fetchPageInsights: function(pageId){
    InsightApiUtil.fetchPageInsights(pageId, InsightActions.receivePageInsights, InsightActions.handleError);
  },

  receivePageInsights: function(response){
    AppDispatcher.dispatch({
      actionType: InsightConstants.PAGE_INSIGHTS_RECEIVED,
      insights: response
    });
  },

  handleError: function(response){
    console.log(response);
  }
};


module.exports = InsightActions;
