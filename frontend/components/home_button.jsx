const React = require("react");


const HomeButton = React.createClass({
  render: function(){
    return (
      <span className="navText" onClick={this.props.onClick}>Home</span>
    )
  }
});



module.exports = HomeButton;
