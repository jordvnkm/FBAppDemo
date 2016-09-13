const PostApiUtil = require("../utils/post_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const CommentConstants = require("../constants/comment_constants");
const PostConstants = require("../constants/post_constants");
const InsightConstants = require("../constants/insight_constants");


const PostActions = {
  fetchPost: function(postId){
    PostApiUtil.fetchPost(postId, PostActions.receivePost, PostActions.handleError);
  },

  fetchPostInsights: function(postId){
    PostApiUtil.fetchPostInsights(postId, PostActions.receiveInsights, PostActions.handleError);
  },

  fetchPostAuthorImage: function(userId, postId){

  },

  fetchComments: function(postId){
    PostApiUtil.fetchComments(postId, PostActions.receiveComments, PostActions.handleError);
  },

  receiveComments: function(postId, response){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENTS_RECEIVED,
      comments: response.data,
      postId: postId,
      paging: response.paging
    })
  },

  receivePost: function(response, postId){
    AppDispatcher.dispatch({
      actionType: PostConstants.POST_DETAIL_RECEIVED,
      post: response
    })
  },


  receiveInsights: function(response, postId){
    console.log(response);
    AppDispatcher.dispatch({
      actionType: InsightConstants.INSIGHTS_RECEIVED,
      insights: response.data[0],
      postId: postId,
      paging: response.paging
    })
  },

  handleError: function(error){
    console.log(error);
  }
};



module.exports = PostActions;
