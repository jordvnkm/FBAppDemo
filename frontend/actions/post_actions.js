const PostApiUtil = require("../utils/post_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");



const PostActions = {
  fetchPostInsights: function(postId){
    PostApiUtil.fetchPostInsights(postId, PostActions.receiveInsights, PostActions.handleError);
  },

  fetchPostAuthorImage: function(userId, postId){

  },

  fetchComments: function(postId){
    PostApiUtil.fetchComments(postId, PostActions.receiveComments, PostActions.handleError);
  },

  receiveComments: function(response){
    console.log(response);
  },


  receiveInsights: function(response){
    console.log(response);
  },

  handleError: function(error){
    console.log(error);
  }
};



module.exports = PostActions;
