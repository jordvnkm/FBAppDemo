
const AccountApiUtil = {
  fetchAccountImage: function(accountId, successCB, errorCB){
    FB.api(`/${accountId}/picture?type=large`, function(response){
      if (!response){
        errorCB("No response from fetch account image")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(accountId, response)
      }
    }.bind(this))
  },

  fetchAllAccounts: function(successCB, errorCB){
    FB.api('/me/accounts', function(response) {
      if (!response){
        errorCB("No response from fetch all accounts")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response)
      }
    }.bind(this));
  },

  fetchAccountInfo: function(pageId, successCB, errorCB){
    let url = `/${pageId}?fields=id,name,about,cover,engagement`
    FB.api(url, function(response){
      if (!response){
        errorCB("No response from fetch account info")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response);
      }
    }.bind(this))
  }
}

module.exports = AccountApiUtil;
