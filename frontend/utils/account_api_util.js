
const AccountApiUtil = {
  fetchAllAccounts: function(successCB, errorCB){
    FB.api('/me/accounts', function(response) {
      if (!response){
        errorCB("No response from fetch all accounts")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response.data)
      }
    }.bind(this));
  }
}

module.exports = AccountApiUtil;
