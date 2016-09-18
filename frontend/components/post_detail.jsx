const React = require("react");
const PostActions = require("../actions/post_actions");
const CommentStore = require("../stores/comment_store");
const PostStore = require("../stores/post_store");
const PageActions = require("../actions/page_actions");
const InsightStore = require("../stores/insight_store");
const CommentActions = require("../actions/comment_actions");
const hashHistory = require("react-router").hashHistory;
const ErrorStore = require("../stores/error_store");

const CommentsIndex = require("./comments_index");
const NavBar = require("./navbar");
const CreateCommentForm = require("./create_comment_form");
const DeleteButton = require("./delete_button");
const InsightsIndex = require("./insights_index");
const Errors = require("./errors");

const PostDetail = React.createClass({

  getInitialState: function(){
    return {insights: [], authorImageUrl: "", comments: [], post: PostStore.getCurrentPost(),
            errors: []};
  },


  componentDidMount: function(){
    this.commentListener = CommentStore.addListener(this.commentChange);
    this.postListener = PostStore.addListener(this.postChange);
    this.insightListener = InsightStore.addListener(this.insightChange);
    this.errorListener = ErrorStore.addListener(this.errorChange);
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      this.checkLoginStatus();
    }

    // Pusher.logToConsole = true;

    window.channel.bind('account_update', this.updateReceived);


  },

  updateReceived: function(){
    PostActions.fetchComments(this.props.params.postId);
  },

  componentWillUnmount: function(){
    window.channel.unbind('account_update', this.updateReceived);

    this.commentListener.remove();
    this.postListener.remove();
    this.insightListener.remove();
    this.errorListener.remove();
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
      PostActions.fetchPost(this.props.params.postId)
      PageActions.fetchProfileImage(this.props.params.userId, this.props.params.postId);


      let pageId = this.props.params.postId.split("_")[0];
      PageActions.subscribeToUpdates(pageId);
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
    else if (this.state.post.full_picture){
      return <img className="postPicture" src={this.state.post.full_picture}/>
    }
  },

  backToAccount: function(event){
    event.preventDefault();
    event.stopPropagation();
    let pageId = this.state.post.id.split("_")[0];
    hashHistory.push(`account/${pageId}`);
  },


  postInfo: function(){
    if (this.state.post !== undefined){
      return (
        <div className="postInfo">
          <img className="infoImage" src={this.state.authorImageUrl}/>
          <span className="accountName">{this.state.post.from.name}</span>
          <InsightsIndex insights={this.state.insights}/>
          <button className="normalButton" id="backButton" onClick={this.backToAccount}>Back to account</button>
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
        <div className="postContent">
          <span>{this.state.post.message}</span>
          {this.postImageOrVideo()}
        </div>
      )
    }
  },

  publishPost: function(){
    PostActions.publishPost(this.state.post);
  },

  publishButton: function(){
    if (this.state.post && this.state.post.is_published == false){
      return (
        <div>
          <button onClick={this.publishPost}>Publish</button>
        </div>
      );
    }
  },

  errorChange: function(){
    this.setState({errors: ErrorStore.getErrors()});
  },

  errors: function(){
    if (this.state.errors.length > 0){
      return <Errors errors={this.state.errors}/>
    }
  },

  render: function(){
    let pageId = this.props.params.postId.split("_")[0];

    return (
      <div className="postDetail">
        <NavBar pageId={pageId}/>
        <div className="postDetailContent">
          <div className="postDetailInfoContainer">
            <div>
              {this.postInfo()}
              {this.errors()}
            </div>
          </div>
          <div className="postDetailForms">
            <div id="postDeleteButton">
              {this.publishButton()}
              <DeleteButton text={"Delete Post"} deleteClicked={this.deletePost}/>
            </div>
            {this.postContent()}
            <div className="postComments">
              <CommentsIndex deleteComment={this.deleteComment} comments={this.state.comments}/>
              <CreateCommentForm onsubmit={this.postComment}/>
            </div>
          </div>
        </div>

      </div>
    );
  }
});


module.exports = PostDetail;
