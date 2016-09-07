const React = require("react");
const UserStore = require("../stores/user_store");
const AccountStore = require("../stores/account_store");
const AccountActions = require("../actions/account_actions");
const hashHistory = require("react-router").hashHistory;
const UserActions = require("../actions/user_actions");


const AccountsIndex = require("./accounts_index");


const HomePage = React.createClass({
  getInitialState: function(){
    return {accounts: [], currentUser: UserStore.currentUser()};
  },

  componentDidMount: function(){
    if (currentUser == null){
      hashHistory.push("/");
      return;
    }
    this.accountListener = AccountStore.addListener(this.accountChange)
    this.userListener = UserStore.addListener(this.userChange);
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      AccountActions.fetchAllAccounts();
    }
  },

  componentWillUnmount: function(){
    this.userListener.remove();
    this.accountListener.remove();
  },

  userChange: function(){
    this.setState({currentUser: UserStore.currentUser()});
  },


  accountChange: function(){
    console.log(AccountStore.getAccounts());
    this.setState({accounts: AccountStore.getAccounts()});
  },

  loginOrCreateUser: function(response){
    let user = {fb_id: response.authResponse.userID};
    UserActions.logIn(user);
    AccountActions.fetchAllAccounts();
  },


  statusChangeCallback: function(response){
    if (response.status === 'connected'){
      // let url = `user/${response.authResponse.userID}`;
      //
      // hashHistory.push(url)
      console.log("FB INITIALIZED AND USER CONNECTED")
      this.loginOrCreateUser(response);
    }
    else {
      console.log("not connected");
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


  render: function(){
    return (
      <div>
        hello from homepage
        <AccountsIndex accounts={this.state.accounts}/>
      </div>
    );
  }
});


module.exports = HomePage;
