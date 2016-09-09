const React = require("react");
const hashHistory = require("react-router").hashHistory;
const PostStore = require("../stores/post_store");
const PageActions = require("../actions/page_actions");
const AccountStore = require("../stores/account_store");
const AccountActions = require("../actions/account_actions");


const NavBar = require("./navbar");
const CreatePostForm = require("./create_post_form");

const AccountPage = React.createClass({
  getInitialState: function(){
    return {feed : [], account: AccountStore.getAccount()};
  },

  componentWillMount: function(){
    this.postListener = PostStore.addListener(this.postChange);
    this.accountListener = AccountStore.addListener(this.accountChange);
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      this.checkLoginState();
    }
  },

  componentWillUnmount: function(){
    this.postListener.remove();
    this.accountListener.remove();
  },

  accountChange: function(){
    this.setState({account: AccountStore.getAccount()});
  },

  postChange: function(){
    this.setState({feed: PostStore.getFeed()});
  },

  statusChangeCallback: function(response){
    if (response.status == "connected"){
      console.log("logged in from account");
      PageActions.fetchFeed(this.props.params.account_id);
      if (this.state.account == undefined){
        AccountActions.fetchAccountInfo(this.props.params.account_id);
      }
    }
    else {
      console.log("not connected from account page");

    }
  },

  checkLoginState: function(){
      FB.getLoginStatus(function(response){
        this.statusChangeCallback(response);
      }.bind(this));
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
      this.checkLoginState();
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

  submitPost: function(content, published){
    PageActions.createPost(this.props.params.account_id, content, published);
  },

  accountInfo: function(){
    if (this.state.account){
      return (
        <div>
          {this.state.account.name}
        </div>
      );
    }
  },

  render: function(){
    return(
      <div className="accountPage">
        <NavBar />
        {this.accountInfo()}
        <CreatePostForm onsubmit={this.submitPost}/>
        <ul>
          {
            this.state.feed.map((post)=>{
              return <li key={post.id}> {post.message}</li>
            })
          }
        </ul>
      </div>
    )
  }
});


module.exports = AccountPage;
