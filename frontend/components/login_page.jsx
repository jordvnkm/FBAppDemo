const React = require("react");
const LoginButton = require("./login_button");

const LoginPage = React.createClass({
  render: function(){
    return (
      <div id="loginPage">
        <div id= "loginHeaderContainer">
          <h1 id="FBHeader">facebook</h1>
          <h1 id="loginHeader"> page manager</h1>
        </div>

        <div id="loginPageContent">

          <div id="loginPageDescription">
            <div id="loginPosts">
              <img id="loginPostImage" />
              <h5 className="loginText">Create published and unpublished posts</h5>
            </div>
            <h5 className="loginText">Monitor post views</h5>
            <img id="loginMainImage"/>
          </div>
          <div className="loginButtonContainer">
            <h5>Login with your Facebook Account to get started</h5>
            <LoginButton />
          </div>

        </div>

      </div>
    );
  }
});



module.exports = LoginPage;
