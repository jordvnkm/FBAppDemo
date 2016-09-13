


const PostApiUtil = {
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
