const React = require("react");
const hashHistory = require("react-router").hashHistory;
const PageActions = require("../actions/page_actions");
const UserActions = require("../actions/user_actions");


const LoginButton = React.createClass({

  componentWillMount: function(){
    // window['statusChangeCallback'] = this.statusChangeCallback;
    window['checkLoginState'] = this.checkLoginState;
  },

  componentWillUnmount: function(){
    // delete window['statusChangeCallback'];
    delete window['checkLoginState'];
  },

  componentDidMount: function(){
    let button = '<div onlogin="checkLoginState" class="fb-login-button" data-max-rows="1" data-size="xlarge" ' +
      'data-show-faces="false" data-scope="public_profile,email,manage_pages, publish_pages" data-auto-logout-link="false"></div>';

    let div = document.getElementById("loginButton");
    div.innerHTML = button;
  },
  //
  // testApi: function(){
  //   // FB.api('/me/permissions', function(response){
  //   //   console.log(JSON.stringify(response));
  //   // })
  //   // console.log('here');
  //   // let page_id;
  //   // let access_token;
  //   // FB.api('/me/accounts', (response) => {
  //   //   page_id = (response.data[0].id);
  //   //   access_token = response.data[0].access_token;
  //   //   let message = {access: access_token, page_id: page_id, text: "hello world from api call"}
  //   //   PageActions.postMessage(message)
  //   // });
  //
  // },

  loginOrCreateUser: function(response){
    let user = {fb_id: response.authResponse.userID};
    UserActions.logIn(user);

    let url = `user/${response.authResponse.userID}`;
    hashHistory.push(url)
  },

  statusChangeCallback: function(response){
    console.log(response);
    if (response.status === 'connected'){
      // let url = `user/${response.authResponse.userID}`;
      //
      // hashHistory.push(url)
      this.loginOrCreateUser(response);
    }
    else {
      console.log("not connected");
    }
  },


  checkLoginState: function(){
    FB.getLoginStatus(function(response){
      this.statusChangeCallback(response);
    }.bind(this));
  },

  render: function(){
    return(
      <div id="loginButton"></div>
    )

  }
});



module.exports = LoginButton;
