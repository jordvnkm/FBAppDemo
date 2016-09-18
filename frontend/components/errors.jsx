const React = require("react");



const Errors = React.createClass({
  render: function(){
    return (
      <div className="errors">
        <span>ERRORS: </span>
        <ul >
          {
            this.props.errors.map((error)=>{
              return <li key={error}>{error}</li>
            })
          }
        </ul>
      </div>
    )
  }
});


module.exports = Errors;
