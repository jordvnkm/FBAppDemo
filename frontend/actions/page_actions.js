const PageApiUtil = require("../utils/page_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const PageConstants = require("../constants/page_constants");
const ErrorConstants = require("../constants/error_constants");

const PageActions = {

  deletePublishedPost: function(postId, pageId){
    PageApiUtil.deletePublishedPost(postId, pageId, PageActions.publishedPostDeleted, PageActions.handleError);
  },

  deleteUnpublishedPost: function(postId, pageId){
    PageApiUtil.deleteUnpublishedPost(postId, pageId, PageActions.unpublishedPostDeleted, PageActions.handleError);
  },

  fetchProfileImage: function(userId, postId){
    PageApiUtil.fetchProfileImage(userId, postId, PageActions.receiveProfileImage, PageActions.handleError);
  },

  createPostAsPage: function(pageId, image, content, isPublished){
    if (image == undefined){
      PageApiUtil.createPostAsPage(pageId, content, isPublished, PageActions.receivePostCreated, PageActions.handleError);
    }
    else {
      if (isVideo(image)){
        PageApiUtil.uploadVideoAsPage(pageId, image, content, isPublished, PageActions.receiveVideoUploaded, PageActions.handleError);
      }
      else if (isPhoto(image)){
        PageApiUtil.uploadPhotoAsPage(pageId, image, content, isPublished, PageActions.receiveFileUploaded, PageActions.handleError);
      }
      else {
        PageApiUtil.handleError({error: "unsupported file format"});
      }
    }
  },

  createPostAsPerson: function(pageId, image, content, access_token){
    if (image == undefined){
      PageApiUtil.createPostAsPerson(pageId, content, access_token, PageActions.receivePostCreated, PageActions.handleError);
    }
    else {
      if (isVideo(image)){
        PageApiUtil.uploadVideoAsPerson(pageId, image, content, access_token, PageActions.receiveVideoUploaded, PageActions.handleError);
      }
      else if (isPhoto(image)){
        PageApiUtil.uploadPhotoAsPerson(pageId, image, content, access_token, PageActions.receiveFileUploaded, PageActions.handleError);
      }
      else {
        PageApiUtil.handleError({error: "unsupported file format"});
      }
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

  publishedPostDeleted: function(pageId){
    PageApiUtil.fetchPublishedPosts(pageId, PageActions.receivePublishedPosts, PageActions.handleError);
    PageApiUtil.fetchFeed(pageId, PageActions.receiveFeed, PageActions.handleError);
  },

  unpublishedPostDeleted: function(pageId){
    PageApiUtil.fetchUnpublishedPosts(pageId, PageActions.receiveUnpublishedPosts, PageActions.handleError);
  },

  receivePostCreated: function(post, isPublished){
    PageApiUtil.fetchPost(post.id, isPublished, PageActions.receivePost, PageActions.handleError, 0);
  },

  receiveVideoUploaded: function(response, isPublished, pageId){
      if (isPublished){
        console.log("published video")
        // console.log(pageId);
        PageApiUtil.envokeRefetch();
        // PageApiUtil.fetchFeed(pageId, PageActions.receiveFeed, PageActions.handleError);
        // PageApiUtil.fetchPublishedPosts(pageId, PageActions.receivePublishedPosts, PageActions.handleError);
      }
      else {
        PageApiUtil.fetchUnpublishedPosts(pageId, PageActions.receiveUnpublishedPosts, PageActions.handleError);
      }
    // let postId = pageId + "_" + response.id;
    // PageApiUtil.fetchPost(postId, isPublished, PageActions.receivePost, PageActions.handleError, 0);
    // PageApiUtil.fetchVideo(pageId, response.id, isPublished, PageActions.receivePost, PageActions.handleError);
  },

  receiveFileUploaded: function(response, isPublished, pageId){
    if (response.post_id){
      PageApiUtil.fetchPost(response.post_id, isPublished, PageActions.receivePost, PageActions.handleError,0);
    }
    else {
      PageApiUtil.fetchUnpublishedPosts(pageId, PageActions.receiveUnpublishedPosts, PageActions.handleError);
    }
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
    console.log("Post received");
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

const isVideo = function(image){
  let acceptedFormats = ["3g2", "3gp", "3gpp", "asf", "avi", "dat", "divx", "dv", "f4v", "flv",
                          "m2ts", "m4v", "mkv", "mod", "mov","mp4", "mpe", "mpeg","mpeg4", "mpg",
                        "mts", "nsv", "ogm", "ogv", "qt","tod", "ts", "vob", "wmv"];
  if (acceptedFormats.includes(image.format.toLowerCase())){
    return true;
  }
  return false;
};

const isPhoto = function(image){
  let acceptedFormats = ["jpg", "bmp", "png","gif","tiff"];
  if (acceptedFormats.includes(image.format.toLowerCase())){
    return true;
  }
  return false;
};



module.exports = PageActions;
