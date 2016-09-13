const CommentApiUtil = require("../utils/comment_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const CommentConstants = require("../constants/comment_constants");

const CommentActions = {
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

  receiveComment: function(response, postId){
    console.log(response);
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_RECEIVED,
      comment: response,
      postId: postId
    })
  },

  handleError: function(response){
    console.log(response)
  }
};


module.exports = CommentActions;
