const React = require("react");


const HomeButton = React.createClass({
  render: function(){
    return (
      <span onClick={this.props.onClick}>Home</span>
    )
  }
});



module.exports = HomeButton;
