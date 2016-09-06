const React = require("react");
const UserStore = require("../stores/user_store");




const HomePage = React.createClass({
  getInitialState: function(){
    return {currentUser: UserStore.currentUser()}
  }
});
