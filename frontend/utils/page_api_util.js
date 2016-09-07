

const PageApiUtil = {


  postMessage: function(params, successCallback, errorCallback){
    let page_id = params.page_id;
    let access_token = params.access;
    let text = params.text;
    let url = `${page_id}/feed`;
    FB.api( url, 'post', {access_token: access_token, message: text}, (response) =>{
      if (!response || response.error){
        console.log(response);
        errorCallback("ERROR Occured");
        console.log("error occured");
      }
      else {
        console.log("success callback");
        successCallback(response)
      }
    })
  }
};


module.exports = PageApiUtil;
