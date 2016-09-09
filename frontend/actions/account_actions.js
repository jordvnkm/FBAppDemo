const AccountApiUtil = require("../utils/account_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const AccountConstants = require("../constants/account_constants");
const ErrorConstants = require("../constants/error_constants");

const AccountActions = {
  fetchAllAccounts: function(){
    AccountApiUtil.fetchAllAccounts(AccountActions.receiveAllAccounts, AccountActions.handleError);
  },

  fetchAccountInfo: function(pageId){
    AccountApiUtil.fetchAccountInfo(pageId, AccountActions.receiveAccount, AccountActions.handleError);
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
