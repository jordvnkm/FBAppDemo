const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const PageConstants = require("../constants/page_constants");
const PostConstants = require("../constants/post_constants");

let PostStore = new Store(AppDispatcher);

let _publishedPosts = [];
let _unpublishedPosts = [];
let _feed = [];
let _images = {};
let _paging = {};
let _currentPost = undefined;
let _postDeleted = false;


PostStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case PageConstants.PUBLISHED_POSTS_RECEIVED:
      receivePublishedPosts(payload.posts);
      receivePaging(payload.paging);
      PostStore.__emitChange();
      break;
    case PageConstants.UNPUBLISHED_POSTS_RECEIVED:
      receiveUnpublishedPosts(payload.posts);
      receivePaging(payload.paging);
      PostStore.__emitChange();
      break;
    case PageConstants.FEED_RECEIVED:
      receiveFeed(payload.posts);
      receivePaging(payload.paging);
      PostStore.__emitChange();
      break;
    case PageConstants.POST_RECEIVED:
      if (payload.isPublished){
        addToPublished(payload.post);
        addToFeed(payload.post);
      }
      else {
        addToUnpublished(payload.post);
      }
      PostStore.__emitChange();
      break;
    case PageConstants.PROFILE_IMAGE_RECEIVED:
      receiveProfileImage(payload.imageData);
      PostStore.__emitChange();
      break;
    case PostConstants.POST_DETAIL_RECEIVED:
      receiveCurrentPost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.CURRENT_POST_DELETED:
      resetCurrentPost();
      setPostDeleted();
      PostStore.__emitChange();
      break;
  }
};

const setPostDeleted = function(){
  _postDeleted = true;
};

const resetCurrentPost = function(){
  _currentPost = undefined;
};

const receiveCurrentPost = function(post){
  _currentPost = post;
};

const receiveProfileImage = function(imageData){
  _images[imageData.postId] = imageData.data;
};

const addToPublished = function(post){
  _publishedPosts.unshift(post);
};

const addToUnpublished = function(post) {
  _unpublishedPosts.unshift(post);
};

const addToFeed = function(post){
  _feed.unshift(post);
};

const receivePaging = function(paging){
  _paging = paging;
};

const receivePublishedPosts = function(posts){
  _publishedPosts = posts;
};

const receiveUnpublishedPosts = function(posts){
  _unpublishedPosts = posts;
};

const receiveFeed = function(posts){
  console.log(posts);
  _feed = posts;
};

PostStore.getPostDeleted = function(){
  if (_postDeleted){
    _postDeleted = false
    return true;
  }
  else {
    return false;
  }
};

PostStore.getCurrentPost = function(){
  if (_currentPost !== undefined){
    return Object.assign({}, _currentPost);
  }
};

PostStore.resetCurrentPost = function(){
  _currentPost = undefined;
};

PostStore.getProfileImage = function(postId){
  if (_images[postId] !== undefined){
    return _images[postId].url;
  }
};

PostStore.getPaging = function(){
  return Object.assign({}, _paging);
};


PostStore.getFeed = function(){
  if (_feed.length > 0){
    return _feed.slice();
  }
  else {
    return [];
  }
};

PostStore.getPublishedPosts = function(){
  if (_publishedPosts.length > 0){
    return _publishedPosts.slice();
  }
  else {
    return [];
  }
};


PostStore.getUnpublishedPosts = function(){
  if (_unpublishedPosts.length > 0){
    return _unpublishedPosts.slice();
  }
  else {
    return [];
  }
}

module.exports = PostStore;
