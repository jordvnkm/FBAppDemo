const React = require("react");
const NavBar = require("./navbar");


const AccountPage = React.createClass({
  getInitialState: function(){

  },

  componentWillMount: function(){

  },
  render: function(){
    return(
      <div className="accountPage">
        <NavBar />
      </div>
    )
  }
});


module.exports = AccountPage;
