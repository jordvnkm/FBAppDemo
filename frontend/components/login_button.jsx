const React = require("react");
const hashHistory = require("react-router").hashHistory;
const PageActions = require("../actions/page_actions");
const UserActions = require("../actions/user_actions");
const UserStore = require("../stores/user_store");

const LoginButton = React.createClass({

  componentWillMount: function(){
    // window['statusChangeCallback'] = this.statusChangeCallback;
    window['checkLoginState'] = this.checkLoginState;
    console.log("componentwillmount login button")
  },

  componentWillUnmount: function(){
    // delete window['statusChangeCallback'];
    delete window['checkLoginState'];
    let div = document.getElementById("loginButton");
    console.log("componenet will un mount login_button");
    div.innerHTML = "";
  },

  componentDidMount: function(){
    // if (window.FB != undefined){
    //   this.checkLoginState();
    // }

    let button = '<div onlogin="checkLoginState" class="fb-login-button" data-max-rows="1" data-size="xlarge" ' +
      'data-show-faces="false" data-scope="public_profile,email,manage_pages, publish_pages" data-auto-logout-link="false"></div>';

    console.log("component did mount login button")
    let div = document.getElementById("loginButton");
    div.innerHTML = button;
    if (window.FB != undefined){
      FB.XFBML.parse();
    }
    console.log(div);
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
      let url = `user/${response.authResponse.userID}`;

      hashHistory.push(url)
      console.log("connected from login button");
      // this.loginOrCreateUser(response);
    }
    else {
      console.log("not connected from login Button");
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
