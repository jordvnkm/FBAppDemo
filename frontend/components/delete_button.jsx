const React = require("react");


const DeleteButton = React.createClass({

  render: function(){
    return (
      <div className="deleteButton">
        <button className="normalButton" onClick={this.props.deleteClicked}>{this.props.text}</button>
      </div>
    );
  }
});


module.exports = DeleteButton;
