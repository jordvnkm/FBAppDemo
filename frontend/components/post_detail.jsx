const React = require("react");
const PostActions = require("../actions/post_actions");
const CommentStore = require("../stores/comment_store");
const PostStore = require("../stores/post_store");
const PageActions = require("../actions/page_actions");
const InsightStore = require("../stores/insight_store");
const CommentActions = require("../actions/comment_actions");
const hashHistory = require("react-router").hashHistory;

const CommentsIndex = require("./comments_index");
const NavBar = require("./navbar");
const CreateCommentForm = require("./create_comment_form");
const DeleteButton = require("./delete_button");

const PostDetail = React.createClass({

  getInitialState: function(){
    return {insights: [], authorImageUrl: "", comments: [], post: PostStore.getCurrentPost()};
  },


  componentDidMount: function(){
    this.commentListener = CommentStore.addListener(this.commentChange);
    this.postListener = PostStore.addListener(this.postChange);
    this.insightListener = InsightStore.addListener(this.insightChange);
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      this.checkLoginStatus();
    }
  },

  componentWillUnmount: function(){
    this.commentListener.remove();
    this.postListener.remove();
    this.insightListener.remove();
    PostStore.resetCurrentPost();
  },

  insightChange: function(){
    this.setState({insights: InsightStore.getInsights(this.props.params.postId)});
  },

  postChange: function(){
    if (PostStore.getPostDeleted()){
      let pageId = this.props.params.postId.split("_")[0];
      let url = `account/${pageId}`;
      hashHistory.push(url);
    }
    else {
      this.setState({authorImageUrl: PostStore.getProfileImage(this.props.params.postId) ,
        post: PostStore.getCurrentPost()});
    }

  },

  commentChange: function(){
    this.setState({comments: CommentStore.getComments(this.props.params.postId)});
    PostActions.fetchPostInsights(this.props.params.postId);
  },

  statusChangeCallback: function(response){
    if (response.status == "connected"){
      this.accessToken = response.authResponse.accessToken;


      PostActions.fetchPostInsights(this.props.params.postId);
      PostActions.fetchComments(this.props.params.postId);
      if (this.state.post == undefined){
        PostActions.fetchPost(this.props.params.postId)
        PageActions.fetchProfileImage(this.props.params.userId, this.props.params.postId);
      }
    }
    else {
      console.log("not connected from post detail");
    }
  },

  checkLoginStatus: function(){
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  },

  loadFBSDK: function(){
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '1586369955001720',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });
      this.checkLoginStatus();
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  postImageOrVideo: function(){
    if (this.state.post.source){
      return (
        <video src={this.state.post.source} controls/>
      );
    }
    else if (this.state.post.picture){
      return <img src={this.state.post.picture}/>
    }
  },


  postInfo: function(){
    if (this.state.post !== undefined){
      return (
        <div className="postInfo">
          <img src={this.state.authorImageUrl}/>
          {this.state.post.from.name}
          {this.state.insights.title}
          {this.state.insights.values[0].value}
        </div>
      );
    }
  },

  postComment: function(content, asPage){
    if (asPage){
      console.log("create as page");
      CommentActions.createCommentAsPage(this.props.params.postId, content)
    }
    else {
      CommentActions.createCommentAsPerson(this.props.params.postId, content, this.accessToken);
    }
  },

  deletePost: function(event){
    event.preventDefault();
    event.stopPropagation();
    let pageId = this.props.params.postId.split("_")[0];
    PostActions.deletePost(this.props.params.postId, pageId);
  },

  deleteComment: function(commentId){
    let pageId = this.props.params.postId.split("_")[0];
    PostActions.deleteComment(commentId, this.props.params.postId, pageId);
  },

  postContent: function(){
    if (this.state.post){
      return (
        <div>
          {this.postImageOrVideo()}
          {this.state.post.message}
        </div>
      )
    }
  },

  render: function(){
    return (
      <div className="postDetail">
        <NavBar />
        <div className="postDetailContent">
          <div className="postDetailInfoContainer">
            <div className="postDetailInfo">
              {this.postInfo()}
            </div>
          </div>
          <div className="postDetailForms">
            {this.postContent()}
            <DeleteButton text={"Delete Post"} deleteClicked={this.deletePost}/>
            <CommentsIndex deleteComment={this.deleteComment} comments={this.state.comments}/>
            <CreateCommentForm onsubmit={this.postComment}/>
          </div>
        </div>

      </div>
    );
  }
});


module.exports = PostDetail;
