const React = require("react");
const LoginButton = require("./login_button");

const App = React.createClass({
  render: function(){
      return (
        <div>
          {this.props.children}
        </div>
      );
  }
});


module.exports = App;
