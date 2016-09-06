

const PageApiUtil = {
  fetchAllAccounts: function(success, error){

  },

  postMessage: function(params, successCallback, errorCallback){
    let page_id = params.page_id;
    let access_token = params.access;
    let text = params.text;
    let url = `${page_id}`
    FB.api( url, 'post', {message: text}, function(response){
      if (!response || response.error){
        errorCallback("ERROR Occured");
      }
      else {
        successCallback(response)
      }
    })
  }
};


module.exports = PageApiUtil;
