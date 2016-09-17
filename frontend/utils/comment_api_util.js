

const CommentApiUtil = {
  fetchProfileImage: function(userId, commentId, successCB, errorCB){
    FB.api(`/${userId}/picture?`, function(response){
      if (!response){
        errorCB("No response from fetch fetch profile image comment")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response, commentId);
      }
    }.bind(this));
  },

  fetchComment: function(commentId, postId, successCB, errorCB){
    FB.api(`${commentId}?fields=id,from,message,created_time`, (response)=>{
      if (!response){
        errorCB("No response from fetchComment")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response, postId)
      }
    })
  },


  createCommentAsPage: function(postId, pageId, content, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, (access) =>{
      let url = `${postId}/comments`;
      let token = access.access_token;
      FB.api(url, "post", {access_token: token, message: content}, (response)=>{
        if (!response){
          errorCB("No response from create comment as page")
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          successCB(response, postId)
        }
      })
    })
  },

  createCommentAsPerson: function(postId, content, accessToken, successCB, errorCB){
    let url = `${postId}/comments`;
    FB.api(url, "post", {message: content, access_token: accessToken}, (response)=>{
      if (!response){
        errorCB("No response from create comment as person")
      }
      else if (response.error){
        errorCB(response.error);
      }
      else {
        successCB(response, postId)
      }
    });
  }
};


module.exports = CommentApiUtil;
