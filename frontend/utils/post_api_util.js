


const PostApiUtil = {

  publishPost: function(post, successCB , errorCB){
    let pageId = post.id.split("_")[0];
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${post.id}`;
      FB.api( url, 'post', {access_token: token, is_published: true}, (response) =>{
        if (!response){
          errorCB("No response from publishPost");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(post.id);
        }
      })
    }.bind(this))
  },

  deleteComment: function(commentId, postId, pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let url = `${commentId}`;
      FB.api( url, 'delete', {access_token: token}, (response) =>{
        if (!response){
          errorCB("No response from delete comment");
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
          errorCB("No response from delete post");
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
        errorCB("No response from fetch Post");
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
