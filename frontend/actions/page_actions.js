const PageApiUtil = require("../utils/page_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const PageConstants = require("../constants/page_constants");
const ErrorConstants = require("../constants/error_constants");

const PageActions = {
  fetchProfileImage: function(userId, postId){
    PageApiUtil.fetchProfileImage(userId, postId, PageActions.receiveProfileImage, PageActions.handleError);
  },

  createPostAsPage: function(pageId, image, content, isPublished){
    if (image == undefined){
      PageApiUtil.createPostAsPage(pageId, content, isPublished, PageActions.receivePostCreated, PageActions.handleError);
    }
    else {
      PageApiUtil.uploadFileAsPage(pageId, image, content, isPublished, PageActions.receiveFileUploaded, PageActions.handleError);
    }
  },

  createPostAsPerson: function(pageId, image, content, access_token){
    if (image == undefined){
      PageApiUtil.createPostAsPerson(pageId, content, access_token, PageActions.receivePostCreated, PageActions.handleError);
    }
    else {
      PageApiUtil.uploadFileAsPerson(pageId, image, content, access_token, PageActions.receiveFileUploaded, PageActions.handleError);
    }
  },

  fetchPublishedPosts: function(pageId){
    PageApiUtil.fetchPublishedPosts(pageId, PageActions.receivePublishedPosts, PageActions.handleError);
  },

  fetchUnpublishedPosts: function(pageId){
    PageApiUtil.fetchUnpublishedPosts(pageId, PageActions.receiveUnpublishedPosts, PageActions.handleError);
  },

  fetchFeed: function(pageId){
    PageApiUtil.fetchFeed(pageId, PageActions.receiveFeed, PageActions.handleError);
  },

  receivePostCreated: function(post, isPublished){
    PageApiUtil.fetchPost(post.id, isPublished, PageActions.receivePost, PageActions.handleError);
  },

  receiveFileUploaded: function(response, postId){
    console.log(response);
  },

  receiveProfileImage: function(postId, response){
    AppDispatcher.dispatch({
      actionType: PageConstants.PROFILE_IMAGE_RECEIVED,
      imageData: {postId: postId, data: response.data}
    })
  },

  receiveFeed: function(response){
    AppDispatcher.dispatch({
      actionType: PageConstants.FEED_RECEIVED,
      posts: response.data,
      paging: response.paging
    })
  },

  receivePublishedPosts: function(response){
    console.log(response);
    AppDispatcher.dispatch({
      actionType: PageConstants.PUBLISHED_POSTS_RECEIVED,
      posts: response.data,
      paging: response.paging
    });
  },

  receiveUnpublishedPosts: function(response){
    AppDispatcher.dispatch({
      actionType: PageConstants.UNPUBLISHED_POSTS_RECEIVED,
      posts: response.data,
      paging: response.paging
    });
  },


  receivePost: function(post, isPublished){
    console.log(post);
    AppDispatcher.dispatch({
      actionType: PageConstants.POST_RECEIVED,
      post: post,
      isPublished: isPublished
    });
  },


  handleError: function(error){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERROR,
      errors: error
    });
  }

};



module.exports = PageActions;
