const React = require("react");
const hashHistory = require("react-router").hashHistory;


const LogoutButton = require("./logout_button");
const HomeButton = require("./home_button");

const NavBar = React.createClass({

  logout: function(){
    if (window.FB != undefined){
      FB.logout(function(response){
        hashHistory.push('/');
      });
    }
  },

  homeButtonClicked: function(){
    if (window.FB !== undefined){
      FB.api('/me', function(response){
        let url = `user/${response.id}`
        hashHistory.push(url)
      })
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
