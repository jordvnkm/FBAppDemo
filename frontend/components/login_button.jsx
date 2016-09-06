const React = require("react");
const hashHistory = require("react-router").hashHistory;

const LoginButton = React.createClass({

  componentWillMount: function(){
    window['statusChangeCallback'] = this.statusChangeCallback;
    window['checkLoginState'] = this.checkLoginState;
  },

  componentWillUnmount: function(){
    delete window['statusChangeCallback'];
    delete window['checkLoginState'];
  },

  componentDidMount: function(){
    let button = '<div onlogin="checkLoginState" class="fb-login-button" data-max-rows="1" data-size="xlarge" ' +
      'data-show-faces="false" data-auto-logout-link="false"></div>';

    let div = document.getElementById("loginButton");
    div.innerHTML = button;
  },

  statusChangeCallback: function(response){
    console.log(response);
    if (response.status === 'connected'){
      hashHistory.push("/users/")
    }
    else {
      console.log("SADFACE");
    }
  },


  checkLoginState: function(){
    FB.getLoginStatus(function(response){
      this.statusChangeCallback(response);
    }.bind(this));
  },

  handleClick: function(){
    FB.login(this.checkLoginState());
  },

  render: function(){
    return(
      <div id="loginButton"></div>
    )

  }
});



module.exports = LoginButton;
