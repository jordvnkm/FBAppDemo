const React = require("react");
const PostActions = require("../actions/post_actions");
const CommentStore = require("../stores/comment_store");

const CommentsIndex = require("./comments_index");

const PostDetail = React.createClass({

  getInitialState: function(){
    return {insights: {}, authorImageUrl: "", comments: []};
  },


  componentWillMount: function(){
    this.commentListener = CommentStore.addListener(this.commentChange);
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      this.checkLoginStatus();
    }
  },


  componentWillUnmount: function(){
    this.commentListener.remove();
  },

  commentChange: function(){
    this.setState({comments: CommentStore.getComments(this.props.params.postId)});
  },

  statusChangeCallback: function(response){
    if (response.status == "connected"){
      this.accessToken = response.authResponse.accessToken;
      PostActions.fetchPostInsights(this.props.params.postId);
      if (this.state.post == undefined){
        PostActions.fetchComments(this.props.params.postId);
        PostActions.fetchPostAuthorImage(this.props.params.userId, this.props.params.postId);
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

  render: function(){
    return (
      <div className="postDetail">
        <CommentsIndex comments={this.state.comments}/>
      </div>
    );
  }
});


module.exports = PostDetail;
