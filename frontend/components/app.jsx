const React = require("react");
const LoginButton = require("./login_button");

const App = React.createClass({
  render: function(){
      return (
        <div>
          <h1>Page Manager</h1>
          {this.props.children}
        </div>
      );
  }
});


module.exports = App;
