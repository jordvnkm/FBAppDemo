const React = require("react");
const NavBar = require("./navbar");
const hashHistory = require("react-router").hashHistory;

const AccountPage = React.createClass({
  getInitialState: function(){
    return {publishedPosts: [], unpublishedPosts: []}
  },

  componentWillMount: function(){
    if (window.FB == undefined){
      this.loadFBSDK();
    }
    else {
      this.checkLoginState();
    }
  },

  statusChangeCallback: function(response){
    if (response.status == "success"){
      
    }
    else {
      console.log("not connected from account page");

    }
  },

  checkLoginState: function(){
      FB.checkLoginState(function(response){
        this.statusChangeCallback(response);
      }.bind(this));
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
