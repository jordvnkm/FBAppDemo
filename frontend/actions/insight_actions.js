const AppDispatcher = require("../dispatcher/dispatcher");
const InsightConstants = require("../constants/insight_constants");
const InsightApiUtil = require("../utils/insight_api_util");
const ErrorConstants = require("../constants/error_constants");


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

  handleError: function(error){
    let message;
    if (error.message){
      message = error.message;
    }
    else {
      message = error;
    }

    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERRORS_RECEIVED,
      errors: message
    });
  }
};


module.exports = InsightActions;
