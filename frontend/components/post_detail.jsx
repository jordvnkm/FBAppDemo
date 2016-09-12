const React = require("react");
const PostActions = require("../actions/post_actions");
const CommentStore = require("../stores/comment_store");
const PostStore = require("../stores/post_store");
const PageActions = require("../actions/page_actions");

const CommentsIndex = require("./comments_index");
const NavBar = require("./navbar");

const PostDetail = React.createClass({

  getInitialState: function(){
    return {insights: {}, authorImageUrl: "", comments: [], post: PostStore.getCurrentPost()};
  },


  componentWillMount: function(){
    this.commentListener = CommentStore.addListener(this.commentChange);
    this.postListener = PostStore.addListener(this.postChange);
    this
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
    PostStore.resetCurrentPost();
  },

  postChange: function(){
    this.setState({authorImageUrl: PostStore.getProfileImage(this.props.params.postId) ,
                  post: PostStore.getCurrentPost()});
  },

  commentChange: function(){
    this.setState({comments: CommentStore.getComments(this.props.params.postId)});
  },

  statusChangeCallback: function(response){
    if (response.status == "connected"){
      this.accessToken = response.authResponse.accessToken;


      PostActions.fetchPostInsights(this.props.params.postId);
      if (this.state.post == undefined){
        PostActions.fetchPost(this.props.params.postId)
        PostActions.fetchComments(this.props.params.postId);
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

  postInfo: function(){
    if (this.state.post !== undefined){
      return (
        <div className="postInfo">
          <img src={this.state.authorImageUrl}/>
          {this.state.post.from.name}
          {this.state.post.message}
        </div>
      );
    }
  },

  render: function(){
    return (
      <div className="postDetail">
        <NavBar />
        {this.postInfo()}
        <CommentsIndex comments={this.state.comments}/>
      </div>
    );
  }
});


module.exports = PostDetail;
