const React = require("react");
const LoginButton = require("./login_button");
const hashHistory = require("react-router").hashHistory;
const UserStore = require("../stores/user_store");

const LoginPage = React.createClass({
  componentDidMount: function(){
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      this.checkLoginState();
    }
  },

  statusChangeCallback: function(response){
    if (response.status === 'connected'){
      let url = `user/${response.authResponse.userID}`;

      hashHistory.push(url)
      console.log("connectedFromLoginPage")
    }
    else {
      console.log("not connected from loginPage");
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
      <div id="loginPage">
        <div id= "loginHeaderContainer">
          <div id="loginHeaderContent">
            <h1 id="FBHeader">facebook</h1>
            <h1 id="loginHeader"> page manager</h1>
          </div>
        </div>

        <div id="loginPageContent">
          <div id="loginPageDescription">
            <h2 className="descriptionText">Connect with your target audience</h2>
            <div className="loginAppDescription">
              <img id="loginPostImage" />
              <span className="loginText">Create posts</span>
              <span className="loginSubText">to your page feed</span>
            </div>
            <div className="loginAppDescription">
              <img id="loginMonitorImage"/>
              <span className="loginText">Monitor post views</span>
              <span className="loginSubText">both published and unpublished</span>
            </div>
          </div>
          <div id="loginButtonContainer">
            <h2 className="descriptionText">Login with your facebook account to get started</h2>
            <LoginButton checkLoginState= {this.checkLoginState}/>
          </div>

        </div>

      </div>
    );
  }
});



module.exports = LoginPage;
