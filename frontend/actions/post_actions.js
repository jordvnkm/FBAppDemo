const PostApiUtil = require("../utils/post_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const CommentConstants = require("../constants/comment_constants");
const PostConstants = require("../constants/post_constants");
const InsightConstants = require("../constants/insight_constants");
const ErrorConstants = require("../constants/error_constants");

const PostActions = {
  publishPost: function(post){
    PostApiUtil.publishPost(post, PostActions.fetchPost, PostActions.handleError);
  },

  deleteComment(commentId, postId, pageId){
    PostApiUtil.deleteComment(commentId, postId, pageId, PostActions.receiveCommentDeleted, PostActions.handleError);
  },


  deletePost: function(postId, pageId){
    PostApiUtil.deletePost(postId, pageId, PostActions.deleteCurrentPost, PostActions.handleError);
  },

  fetchPost: function(postId){
    PostApiUtil.fetchPost(postId, PostActions.receivePost, PostActions.handleError);
  },

  fetchPostInsights: function(postId){
    PostApiUtil.fetchPostInsights(postId, PostActions.receivePostInsights, PostActions.handleError);
  },


  fetchComments: function(postId){
    PostApiUtil.fetchComments(postId, PostActions.receiveComments, PostActions.handleError);
  },


  unpublishedPostDeleted: function(response, pageId){
    if (response["success"] !== undefined){
      PageApiUtil.fetchUnpublishedPosts()
    }
  },

  receiveCommentDeleted: function(postId){
    PostApiUtil.fetchComments(postId, PostActions.receiveComments, PostActions.handleError);
  },


  receivePostUpdated: function(postId){
    PostApiUtil.fetchPost(postId, PostActions.receivePost, PostActions.handleError);
  },

  receivePost: function(response, postId){
    AppDispatcher.dispatch({
      actionType: PostConstants.POST_DETAIL_RECEIVED,
      post: response
    })
  },

  deleteCurrentPost: function(){
    AppDispatcher.dispatch({
      actionType: PostConstants.CURRENT_POST_DELETED
    })
  },

  receiveComments: function(postId, response){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENTS_RECEIVED,
      comments: response.data,
      postId: postId,
      paging: response.paging
    })
  },

  receivePostInsights: function(response, postId){
    AppDispatcher.dispatch({
      actionType: InsightConstants.INSIGHTS_RECEIVED,
      insights: response.data,
      postId: postId,
      paging: response.paging
    })
  },

  handleError: function(error){
    let message;
    if (error.message){
      message = error.message;
    }
    else {
      message = error;
    }

    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERRORS_RECEIVED,
      errors: message
    });
  }
};



module.exports = PostActions;
