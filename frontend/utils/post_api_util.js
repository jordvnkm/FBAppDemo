


const PostApiUtil = {
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
        successCB(response)
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
        successCB(response)
      }
    });
  }
};


module.exports = PostApiUtil;
