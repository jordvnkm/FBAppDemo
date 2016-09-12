const AccountApiUtil = require("../utils/account_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const AccountConstants = require("../constants/account_constants");
const ErrorConstants = require("../constants/error_constants");

const AccountActions = {
  fetchAccountImage: function(accountId){
    AccountApiUtil.fetchAccountImage(accountId, AccountActions.receiveImage, AccountActions.handleError);
  },

  fetchAllAccounts: function(){
    AccountApiUtil.fetchAllAccounts(AccountActions.receiveAllAccounts, AccountActions.handleError);
  },

  fetchAccountInfo: function(pageId){
    AccountApiUtil.fetchAccountInfo(pageId, AccountActions.receiveAccount, AccountActions.handleError);
  },

  receiveImage: function(accountId, response){
    AppDispatcher.dispatch({
      actionType: AccountConstants.ACCOUNT_IMAGE_RECEIVED,
      imageData: {accountId: accountId, data: response.data},
    })
  },

  receiveAccount: function(response){
    AppDispatcher.dispatch({
      actionType: AccountConstants.ACCOUNT_RECEIVED,
      account: response,
    })
  },

  receiveAllAccounts: function(response){
    AppDispatcher.dispatch({
      actionType: AccountConstants.ACCOUNTS_RECEIVED,
      accounts: response.data,
      paging: response.paging
    })
  },

  handleError: function(error){
    console.log(error);
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERROR,
      errors: error
    });
  }
};


module.exports = AccountActions;
