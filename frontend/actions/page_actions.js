const PageApiUtil = require("../utils/page_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const PageConstants = require("../constants/page_constants");
const ErrorConstants = require("../constants/error_constants");

const PageActions = {
  createPostAsPage: function(pageId, content, isPublished){
    PageApiUtil.createPostAsPage(pageId, content, isPublished, PageActions.receivePostCreated, PageActions.handleError);
  },

  createPostAsPerson: function(pageId, content, access_token){
    PageApiUtil.createPostAsPerson(pageId, content, access_token, PageActions.receivePostCreated, PageActions.handleError);
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

  receiveFeed: function(response){
    AppDispatcher.dispatch({
      actionType: PageConstants.FEED_RECEIVED,
      posts: response.data,
      paging: response.paging
    })
  },

  receivePublishedPosts: function(response){
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
    console.log(post, isPublished);
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
