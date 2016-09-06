const PageApiUtil = require("../utils/page_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const PageConstants = require("../constants/page_constants");
const ErrorConstants = require("../constants/error_constants");

const PageActions = {
  postMessage: function(params){
    console.log(params);
    PageApiUtil.postMessage(params, PageActions.receiveMessage, PageActions.handleError);
  },

  receivePost: function(post){
    console.log(post);
    // AppDispatcher.dispatch({
    //   actionType: PageConstants.POST_RECEIVED,
    //   post: post
    // });
  },

  fetchAllAccounts: function(){
    PageApiUtil.fetchAllAccounts(PageActions.receiveAllAccounts, PageActions.handleError);
  },

  receiveAllAccounts: function(accounts){
    AppDispatcher.dispatch({
      actionType: PageConstants.ACCOUNTS_RECEIVED,
      accounts: accounts.data
    })
  },

  handleError: function(error){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERROR,
      errors: error
    });
  }

};



module.exports = PageActions;
