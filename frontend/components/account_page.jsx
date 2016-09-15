const React = require("react");
const hashHistory = require("react-router").hashHistory;
const PostStore = require("../stores/post_store");
const PageActions = require("../actions/page_actions");
const AccountStore = require("../stores/account_store");
const AccountActions = require("../actions/account_actions");


const NavBar = require("./navbar");
const CreatePostForm = require("./create_post_form");
const PostsIndex = require("./posts_index");
const AccountInformation = require("./account_information");


const AccountPage = React.createClass({
  getInitialState: function(){
    return {feed : [], feedOption: "pageFeed" , account: AccountStore.getAccount()};
  },

  componentDidMount: function(){
    this.postListener = PostStore.addListener(this.postChange);
    this.accountListener = AccountStore.addListener(this.accountChange);

    Pusher.logToConsole = true;

    var pusher = new Pusher('f0ed6004e66da55f7fbf', {
      encrypted: true
    });


    var channel = pusher.subscribe('account_update');
    channel.bind('account_update', function(data) {
      console.log("pusher update");
      PageActions.fetchFeed(this.props.params.account_id);
      PageActions.fetchPublishedPosts(this.props.params.account_id);
    }.bind(this));


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
    if (this.state.feedOption == "pageFeed"){
      this.setState({feed: PostStore.getFeed()});
    }
    else if (this.state.feedOption == "published") {
      this.setState({feed: PostStore.getPublishedPosts()});
    }
    else if (this.state.feedOption === "unpublished") {
      this.setState({feed: PostStore.getUnpublishedPosts()});
    }
  },

  statusChangeCallback: function(response){
    if (response.status == "connected"){
      console.log("logged in from account");

      this.accessToken = response.authResponse.accessToken;
      PageActions.fetchFeed(this.props.params.account_id);
      AccountActions.fetchAccountInfo(this.props.params.account_id);
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

  submitPost: function(content, image, published, asPage){
    if (asPage){
      PageActions.createPostAsPage(this.props.params.account_id, image, content, published);
    }
    else {
      PageActions.createPostAsPerson(this.props.params.account_id, image, content, this.access_token);
    }
  },

  accountInfo: function(){
    if (this.state.account){
      return (
        <AccountInformation account={this.state.account}/>
      );
    }
  },

  feedOptionChange: function(event){
    if (event.target.value !== this.state.feedOption){
      if (event.target.value == "pageFeed"){
        PageActions.fetchFeed(this.props.params.account_id);
      }
      else if (event.target.value == "published") {
        PageActions.fetchPublishedPosts(this.props.params.account_id);
      }
      else if (event.target.value == "unpublished") {
        PageActions.fetchUnpublishedPosts(this.props.params.account_id);
      }
      this.setState({feedOption: event.target.value})

    }
  },

  feedOptions: function(){
    return (
      <div id="feedOptions" className="radioButtons">
        <input id="pageFeedRadio" type="radio" name="feedOption" value="pageFeed" checked={this.state.feedOption == "pageFeed"} onChange={this.feedOptionChange} />
        <label htmlFor="pageFeedRadio">MyFeed</label>

        <input id="publishedFeedRadio" type="radio" name="feedOption" value="published" checked={this.state.feedOption == "published"} onChange={this.feedOptionChange} />
        <label htmlFor="publishedFeedRadio">Published</label>

        <input id="unpublishedFeedRadio" type="radio" name="feedOption" value="unpublished" checked={this.state.feedOption == "unpublished"} onChange={this.feedOptionChange} />
        <label htmlFor="unpublishedFeedRadio">Unpublished</label>
      </div>
    );
  },

  deletePost: function(postId){
    if (this.state.feedOption == "pageFeed" || this.state.feedOption == "published"){
      PageActions.deletePublishedPost(postId, this.props.params.account_id);
    }
    else {
      console.log("unpublished delete clicked");
      PageActions.deleteUnpublishedPost(postId, this.props.params.account_id);
    }
  },

  coverPhoto: function(){
    if (this.state.account && this.state.account.cover.source){
      return (
        <div className="coverPhotoContainer">
          <img className="coverPhoto" src={this.state.account.cover.source}/>
        </div>
      )
    }
  },

  render: function(){
    return(
      <div className="accountPage">
        <NavBar />
        <div className="accountContent">
          <div className="accountInfoContainer">
            <div className="accountInformation">
              {this.accountInfo()}
              {this.feedOptions()}
            </div>
          </div>
          <div className="postInformation">
            {this.coverPhoto()}
            <CreatePostForm onsubmit={this.submitPost}/>
            <PostsIndex myToken={this.accessToken} deletePost={this.deletePost} posts={this.state.feed}/>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = AccountPage;
