const React = require("react");
const hashHistory = require("react-router").hashHistory;
const PageActions = require("../actions/page_actions");
const UserActions = require("../actions/user_actions");
const UserStore = require("../stores/user_store");

const LoginButton = React.createClass({

  componentWillMount: function(){
    window['checkLoginState'] = this.checkLoginState;
  },

  componentWillUnmount: function(){
    delete window['checkLoginState'];
    let div = document.getElementById("loginButton");
    div.innerHTML = "";
  },

  componentDidMount: function(){
    let button = '<div onlogin="checkLoginState" class="fb-login-button" data-max-rows="1" data-size="xlarge" ' +
      'data-show-faces="false" data-scope="public_profile,email,manage_pages,publish_actions,publish_pages" data-auto-logout-link="false"></div>';

    let div = document.getElementById("loginButton");
    div.innerHTML = button;
    if (window.FB != undefined){
      FB.XFBML.parse();
    }
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


  checkLoginState: function(){
    this.props.checkLoginState();
  },

  render: function(){
    return(
      <div id="loginButton"></div>
    )

  }
});



module.exports = LoginButton;
