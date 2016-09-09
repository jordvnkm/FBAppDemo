

const PageApiUtil = {

  fetchPublishedPosts: function(pageId, successCB, errorCB){
    let url = `${pageId}/posts`;
    let params = {include_hidden: true};
    FB.api(url, params, function(response){
      if (!response){
        errorCB("No response from fetch published posts")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response)
      }
    }.bind(this))
  },

  fetchUnpublishedPosts: function(pageId, successCB, errorCB){
    let url = `${pageId}/promotable_posts`;
    let params = {is_published: false, include_hidden: true}
    FB.api(url, params, function(response){
      if (!response){
        errorCB("No response from fetch unpublished posts")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response)
      }
    }.bind(this))
  },

  fetchFeed: function(pageId, successCB, errorCB){
    let url = `${pageId}/feed`;
    FB.api(url, function(response){
      if (!response){
        errorCB("No response from fetch feed")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response)
      }
    }.bind(this))
  },


  createPost: function(content, isPublished, successCallback, errorCallback){
    let url = `${page_id}/feed`;
    FB.api( url, 'post', {published: isPublished, message: content}, (response) =>{
      if (!response || response.error){
        console.log(response);
        errorCallback("ERROR Occured");
        console.log("error occured");
      }
      else {
        console.log("success callback");
        successCallback(response , isPublished)
      }
    })
  }
};


module.exports = PageApiUtil;
