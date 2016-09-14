


const PostApiUtil = {
  deleteComment: function(commentId, postId, pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${commentId}`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response || response.error){
          console.log(response);
          errorCB("ERROR Occured");
          console.log("error occured");
        }
        else {
          console.log("success cb");
          successCB(postId);
        }
      })
    }.bind(this))
  },



  deletePost: function(postId, pageId, successCB, errorCB){
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
          successCB();
        }
      })
    }.bind(this))
  },

  fetchPost: function(postId, successCB, errorCB){
    let url = `${postId}?fields=from,message,id,picture,caption,source`
    FB.api(url, function(response){
      if (!response || response.error){
        console.log(response);
        errorCB("ERROR Occured");
        console.log("error occured");
      }
      else {
        successCB(response , postId);
      }
    })
  },

  fetchPostInsights: function(postId, successCB, errorCB) {
    let url = `${postId}/insights/post_engaged_users`;
    FB.api(url, (response) => {
      if (!response){
        errorCB("No response from fetch fetch post insights")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response, postId);
      }
    });
  },


  fetchComments: function(postId, successCB, errorCB){
    let url = `${postId}/comments`;
    FB.api(url, (response)=>{
      if (!response){
        errorCB("No response from fetch fetch comments")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(postId, response)
      }
    });
  }
};


module.exports = PostApiUtil;
