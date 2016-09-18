const CommentApiUtil = require("../utils/comment_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const CommentConstants = require("../constants/comment_constants");
const ErrorConstants = require("../constants/error_constants");



const CommentActions = {

  fetchProfileImage: function(userId, commentId){
    CommentApiUtil.fetchProfileImage(userId, commentId, CommentActions.receiveUserImage, CommentActions.handleError);
  },


  createCommentAsPage: function(postId, content){
    let pageId = postId.split("_")[0];
    CommentApiUtil.createCommentAsPage(postId, pageId, content, CommentActions.receiveCommentCreated, CommentActions.handleError);
  },

  createCommentAsPerson: function(postId, content, accessToken){
    CommentApiUtil.createCommentAsPerson(postId, content, accessToken, CommentActions.receiveCommentCreated, CommentActions.handleError);
  },

  receiveCommentCreated: function(response, postId){
    CommentApiUtil.fetchComment(response.id, postId, CommentActions.receiveComment);
  },


  receiveUserImage: function(response, commentId){
    AppDispatcher.dispatch({
      actionType: CommentConstants.USER_IMAGE_RECEIVED,
      imageData: {commentId: commentId, data: response.data}
    });
  },

  receiveComment: function(response, postId){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_RECEIVED,
      comment: response,
      postId: postId
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


module.exports = CommentActions;
