const React = require("react");
const UserStore = require("../stores/user_store");




const HomePage = React.createClass({
  getInitialState: function(){
    return {accounts: [], currentUser: UserStore.currentUser()};
  },

  componentDidMount: function(){
    this.accountListener = AccountStore.addListener(this.accountChange)
    this.userListener = UserStore.addListener(this.userChange);
  },

  componentWillUnmount: function(){
    this.userListener.remove();
    this.accountListener.remove();
  },

  userChange: function(){
    let id = UserStore.currentUser().fb_id;
    console.log(id);
    this.setState({currentUser: UserStore.currentUser()});
  },


  render: function(){
    return (
      <div>
        hello from homepage
      </div>
    );
  }
});


module.exports = HomePage;
