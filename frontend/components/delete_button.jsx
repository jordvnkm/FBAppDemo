const React = require("react");


const DeleteButton = React.createClass({

  render: function(){
    return (
      <div className="deleteButton">
        <button onClick={this.props.deleteClicked}>delete</button>
      </div>
    );
  }
});


module.exports = DeleteButton;
