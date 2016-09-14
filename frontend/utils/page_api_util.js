

const PageApiUtil = {
  // fetchVideo: function(pageId, videoId, isPublished, successCB, errorCB){
  //   console.log(videoId);
  //   let url = `${videoId}?fields=source,id,from,description,picture`;
  //   FB.api( url, (response) =>{
  //     if (!response || response.error){
  //       console.log(response);
  //       errorCB("ERROR Occured");
  //       console.log("error occured");
  //     }
  //     else {
  //       console.log("success cb");
  //       successCB(response , isPublished)
  //     }
  //   })
  // },

  deletePublishedPost: function(postId, pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${postId}`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response || response.error){
          console.log(response);
          errorCB("ERROR Occured");
          console.log("error occured");
        }
        else {
          console.log("success cb");
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
        if (!response || response.error){
          console.log(response);
          errorCB("ERROR Occured");
          console.log("error occured");
        }
        else {
          console.log("success cb");
          successCB(pageId);
        }
      })
    }.bind(this))
  },

  fetchProfileImage: function(userId, postId, successCB, errorCB){
    FB.api(`/${userId}/picture`, function(response){
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
    let url = `${pageId}/posts?fields=from,message,id,picture,caption,source`;
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
    let url = `${pageId}/promotable_posts?fields=from,message,id,picture,caption,source`;
    let params = {is_published: false, include_hidden: true};
    FB.api(url, params, (response) => {
      if (!response){
        errorCB("No response from fetch unpublished posts");
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        console.log(response);
        successCB(response);
      }
    });
  },

  fetchFeed: function(pageId, successCB, errorCB){
    let url = `${pageId}/feed?fields=from,message,id,picture,caption,source`;
    FB.api(url, {include_hidden: true} , function(response){
      if (!response){
        errorCB("No response from fetch feed")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        console.log(response);
        successCB(response)
      }
    }.bind(this))
  },

  fetchPost: function(postId, isPublished, successCB, errorCB, retryCount){
    let url = `${postId}?fields=from,message,id,picture,caption,source`
    FB.api(url, {is_published: isPublished} , function(response){
      if (!response || response.error){
        console.log(response);
        if (count < 5){
          this.fetchPost(postId, isPublished, successCB, errorCB, retryCount)
        }
        else{
          errorCB("ERROR Occured");
        }
      }
      else {
        console.log(response);
        successCB(response , isPublished)
      }
    }.bind(this));
  },

  uploadVideoAsPerson: function(pageId, image, content, access_token, successCB, errorCB){

  },

  uploadVideoAsPage: function(pageId, image, content, isPublished, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${pageId}/videos`;
      FB.api( url, 'post', {access_token: token, file_url: image.url, published: isPublished, description: content}, (response) =>{
        if (!response || response.error){
          console.log(response);
          errorCB("ERROR Occured");
          console.log("error occured");
        }
        else {
          console.log("success cb");
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
        if (!response || response.error){
          console.log(response);
          errorCB("ERROR Occured");
          console.log("error occured");
        }
        else {
          console.log("success cb");
          successCB(response , isPublished, pageId)
        }
      })
    }.bind(this))

  },

  uploadPhotoAsPerson: function(pageId, image, content, accessToken, successCB, errorCB){
    FB.api(`${pageId}/photos`, 'post', {access_token: accessToken, url: image.url, caption: content}, (response) =>{
      let isPublished = true;
      if (!response || response.error){
        console.log(response);
        errorCB("ERROR Occured");
        console.log("error occured");
      }
      else {
        console.log("success cb");
        successCB(response , isPublished, pageId);
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
          successCallback(response , isPublished, pageId)
        }
      })
    }.bind(this))

  },

  createPostAsPerson: function(pageId, content, accessToken, successCallback, errorCallback){
    FB.api(`${pageId}/feed`, 'post', {access_token: accessToken, message: content}, (response) =>{
      let isPublished = true;
      if (!response || response.error){
        console.log(response);
        errorCallback("ERROR Occured");
        console.log("error occured");
      }
      else {
        console.log("success cb");
        successCallback(response , isPublished);
      }
    })
  },

};


module.exports = PageApiUtil;
