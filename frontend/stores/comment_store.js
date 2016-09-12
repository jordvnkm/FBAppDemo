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
  }
};



const receiveComments = function(payload){
  _comments[payload.postId] = payload.comments;
}


const receivePaging = function(payload){
  _paging[payload.postId] = payload.paging;
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
