const AccountApiUtil = require("../utils/account_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const AccountConstants = require("../constants/account_constants");
const ErrorConstants = require("../constants/error_constants");

const AccountActions = {
  fetchAllAccounts: function(){
    AccountApiUtil.fetchAllAccounts(AccountActions.receiveAllAccounts, AccountActions.handleError);
  },

  receiveAllAccounts: function(accounts){
    console.log(accounts);
    // AppDispatcher.dispatch({
    //   actionType: PageConstants.ACCOUNTS_RECEIVED,
    //   accounts: accounts.data
    // })
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
