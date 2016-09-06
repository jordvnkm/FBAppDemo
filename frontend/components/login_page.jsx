const React = require("react");
const LoginButton = require("./login_button");

const LoginPage = React.createClass({
  render: function(){
    return (
      <div>
        <h3> Manage your Facebook Pages</h3>
        <LoginButton />
      </div>
    );
  }
});



module.exports = LoginPage;
