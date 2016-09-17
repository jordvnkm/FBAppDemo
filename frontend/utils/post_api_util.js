


const PostApiUtil = {

  deleteComment: function(commentId, postId, pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${commentId}`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response){
          errorCB("ERROR Occurred");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
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
        if (!response){
          errorCB("ERROR Occured");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB();
        }
      })
    }.bind(this))
  },

  fetchPost: function(postId, successCB, errorCB){
    let url = `${postId}?fields=from,message,id,caption,source,full_picture,is_published`
    FB.api(url, function(response){
      if (!response){
        errorCB("ERROR Occured");
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response , postId);
      }
    }.bind(this))
  },

  fetchPostInsights: function(postId, successCB, errorCB) {
    let url = `${postId}/insights/post_engaged_users,post_video_views,post_impressions,post_consumptions`;
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
