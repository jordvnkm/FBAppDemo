

const PageApiUtil = {
  subscribeToUpdates: function(pageId, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/subscribed_apps`;
      FB.api( url, 'post', {access_token: token}, (response) =>{
        if (!response){
          errorCB("No response from subscribeToUpdates");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          console.log("subscribed to page");
        }
      })
    }.bind(this))
  },

  unsubscribeToUpdates: function(pageId, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/subscribed_apps`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response){
          errorCB("No response from unsubscribeToUpdates");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          console.log("unsubsubscribed to page");
        }
      })
    }.bind(this))
  },

  fetchMorePosts: function(type, paging, successCB, errorCB){
    $.ajax({
      url: paging.next,
      success: function(response){
        successCB(type, response);
      },
      error: function(response){
        errorCB(response.error);
      }
    })
  },

  deletePublishedPost: function(postId, pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${postId}`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response){
          errorCB("No response from deletePublishedPosts");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(pageId);
        }
      })
    }.bind(this))
  },

  deleteUnpublishedPost: function(postId, pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${postId}`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response){
          errorCB("No response from deleteUnpublishedPost");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(pageId);
        }
      })
    }.bind(this))
  },

  fetchProfileImage: function(userId, postId, successCB, errorCB){
    FB.api(`/${userId}/picture?type=large`, function(response){
      if (!response){
        errorCB("No response from fetch fetch profile image")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(postId ,response)
      }
    }.bind(this));
  },

  fetchPublishedPosts: function(pageId, successCB, errorCB){
    let url = `${pageId}/posts?fields=from,message,id,full_picture,caption,source,is_published`;
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
    let url = `${pageId}/promotable_posts?fields=from,message,id,full_picture,caption,source,is_published`;
    let params = {is_published: false, include_hidden: true};
    FB.api(url, params, (response) => {
      if (!response){
        errorCB("No response from fetch unpublished posts");
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response);
      }
    });
  },

  fetchFeed: function(pageId, successCB, errorCB){
    let url = `${pageId}/feed?fields=from,message,id,full_picture,caption,source,is_published`;
    FB.api(url, {include_hidden: true} , function(response){
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

  fetchPost: function(postId, isPublished, successCB, errorCB, retryCount){
    let pageId = postId.split("_")[0];
    FB.api(`${pageId}?fields=access_token`, (access)=>{
      let token = access.access_token;
      let url = `${postId}?fields=from,message,id,full_picture,caption,source,is_published`
      FB.api(url, {access_token: token, is_published: isPublished} , function(response){
        if (!response){
          errorCB("No response from fetch post");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          console.log(response);
          successCB(response , isPublished)
        }
      }.bind(this));
    })
  },

  uploadVideoAsPerson: function(pageId, image, content, accessToken, successCB, errorCB){
    let url = `${pageId}/videos`;
    let isPublished = true;
    FB.api( url, 'post', {access_token: accessToken, file_url: image.url, published: isPublished, description: content}, (response) =>{
      if (!response){
        errorCB("No response from upload video as person");
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response, isPublished, pageId)
      }
    })
  },

  uploadVideoAsPage: function(pageId, image, content, isPublished, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/videos`;
      FB.api( url, 'post', {access_token: token, file_url: image.url, published: isPublished, description: content}, (response) =>{
        if (!response){
          errorCB("No response from upload video as page");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(response, isPublished, pageId)
        }
      })
    }.bind(this))
  },


  uploadPhotoAsPage: function(pageId, image, content, isPublished, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/photos`;
      FB.api( url, 'post', {access_token: token, url: image.url, published: isPublished, caption: content}, (response) =>{
        if (!response){
          errorCB("No response from upload photo as page");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(response , isPublished, pageId)
        }
      })
    }.bind(this))

  },

  uploadPhotoAsPerson: function(pageId, image, content, accessToken, successCB, errorCB){
    FB.api(`${pageId}/photos`, 'post', {access_token: accessToken, url: image.url, caption: content}, (response) =>{
      let isPublished = true;
      if (!response){
        errorCB("No response from upload photo as person");
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response , isPublished, pageId);
      }
    })
  },

  createPostAsPage: function(pageId, content, isPublished, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/feed`;
      FB.api( url, 'post', {access_token: token, published: isPublished, message: content}, (response) =>{
        if (!response){
          errorCB("No response from create post as page");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(response , isPublished, pageId)
        }
      })
    }.bind(this))

  },

  createPostAsPerson: function(pageId, content, accessToken, successCallback, errorCallback){
    FB.api(`${pageId}/feed`, 'post', {access_token: accessToken, message: content}, (response) =>{
      let isPublished = true;
      if (!response){
        errorCB("No response from create post as person");
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCallback(response , isPublished);
      }
    })
  },

};


module.exports = PageApiUtil;
