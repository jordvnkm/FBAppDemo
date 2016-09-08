const React = require("react");
const LoginButton = require("./login_button");

const LoginPage = React.createClass({
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
            <LoginButton />
          </div>

        </div>

      </div>
    );
  }
});



module.exports = LoginPage;
