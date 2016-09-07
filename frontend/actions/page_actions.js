const PageApiUtil = require("../utils/page_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const PageConstants = require("../constants/page_constants");
const ErrorConstants = require("../constants/error_constants");

const PageActions = {
  postMessage: function(params){
    PageApiUtil.postMessage(params, PageActions.receivePost, PageActions.handleError);
  },

  receivePost: function(post){
    AppDispatcher.dispatch({
      actionType: PageConstants.POST_RECEIVED,
      post: post
    });
  },


  handleError: function(error){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERROR,
      errors: error
    });
  }

};



module.exports = PageActions;
