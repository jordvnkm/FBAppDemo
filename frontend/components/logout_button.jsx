const React = require("react");

const LogoutButton = React.createClass({
  render: function(){
    return(
      <div onClick={this.props.onClick} id="logoutButton">
        <span>Logout</span>
      </div>
    )
  }
});




module.exports = LogoutButton;
