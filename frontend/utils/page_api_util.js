

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

  fetchPost: function(postId, isPublished, successCB, errorCB){
    FB.api(postId, function(response){
      if (!response || response.error){
        console.log(response);
        errorCCB("ERROR Occured");
        console.log("error occured");
      }
      else {
        console.log(response);
        successCB(response , isPublished)
      }
    })
  },


  createPostAsPage: function(pageId, content, isPublished, successCallback, errorCallback){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/feed`;
      FB.api( url, 'post', {access_token: token, published: isPublished, message: content}, (response) =>{
        if (!response || response.error){
          console.log(response);
          errorCallback("ERROR Occured");
          console.log("error occured");
        }
        else {
          console.log("success cb");
          successCallback(response , isPublished)
        }
      })
    }.bind(this))

  }
};


module.exports = PageApiUtil;
