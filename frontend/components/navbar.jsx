const React = require("react");
const hashHistory = require("react-router").hashHistory;
const PageActions = require("../actions/page_actions");


const LogoutButton = require("./logout_button");
const HomeButton = require("./home_button");

const NavBar = React.createClass({

  logout: function(){
    if (window.FB != undefined){
      FB.logout(function(response){
        PageActions.unsubscribeToUpdates(this.props.pageid)
        hashHistory.push('/')
      }.bind(this));
    }
  },

  homeButtonClicked: function(){
    if (window.FB !== undefined){
      FB.api('/me', function(response){
        PageActions.unsubscribeToUpdates(this.props.pageId)
        let url = `user/${response.id}`
        hashHistory.push(url);
      }.bind(this))
    }
  },

  render: function(){
    return (
      <div id="homeNavContainer">
        <div id="homeNav">
          <img onClick={this.homeButtonClicked} id="facebookLogo" />

          <div id="navButtons">
            <HomeButton onClick={this.homeButtonClicked}/>
            <LogoutButton onClick={this.logout}/>
          </div>
        </div>
      </div>
    )
  },
});



module.exports = NavBar;
