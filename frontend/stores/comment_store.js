const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const CommentConstants = require("../constants/comment_constants");


let CommentStore = new Store(AppDispatcher);

let _comments = {};
let _paging = {};
let _images = {};


CommentStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case CommentConstants.COMMENTS_RECEIVED:
      receiveComments(payload);
      receivePaging(payload);
      CommentStore.__emitChange();
      break;
    case CommentConstants.COMMENT_RECEIVED:
      receiveComment(payload.comment, payload.postId);
      CommentStore.__emitChange();
      break;
    case CommentConstants.USER_IMAGE_RECEIVED:
      receiveUserImage(payload.imageData);
      CommentStore.__emitChange();
      break;
  }
};

const receiveUserImage = function(imageData){
  _images[imageData.commentId] = imageData.data;
};

const receiveComment = function(comment, postId){
  if (_comments[postId] == undefined){
    _comments[postId] = [comment];
  }
  else {
    _comments[postId].push(comment);
  }
};



const receiveComments = function(payload){
  _comments[payload.postId] = payload.comments;
}


const receivePaging = function(payload){
  _paging[payload.postId] = payload.paging;
};

CommentStore.getUserImage = function(commentId){
  if (_images[commentId] !== undefined){
    return _images[commentId].url;
  }
};

CommentStore.getComments = function(postId){
  if (_comments[postId] !== undefined){
    return _comments[postId].slice();
  }
};


CommentStore.getPaging = function(postId){
  return Object.assing({}, _paging[postId]);
};


module.exports = CommentStore;
