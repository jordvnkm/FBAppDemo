const React = require("react");
const hashHistory = require("react-router").hashHistory;
const AccountActions = require("../actions/account_actions");
const AccountStore = require("../stores/account_store");


const AccountsIndexItem = React.createClass({
  getInitialState: function(){
    return {accountImageUrl: ""};
  },

  componentDidMount: function(){
    this.accountListener = AccountStore.addListener(this.accountChange);
    AccountActions.fetchAccountImage(this.props.account.id);
  },

  componentWillUnmount: function(){
    this.accountListener.remove();
  },

  accountChange: function(){
    this.setState({accountImageUrl: AccountStore.getPageImage(this.props.account.id)})
  },

  handleClick: function(){
    let url = `account/${this.props.account.id}`;
    hashHistory.push(url);
  },

  render: function(){
    return (
      <li onClick={this.handleClick} className="accountItem">
        <img className="accountImage"src={this.state.accountImageUrl}/>
        <span className="objectName">{this.props.account.name}</span>

        <span>Category: {this.props.account.category}</span>

        <span>Your permissions for this page:</span>
        <ul>
          {
            this.props.account.perms.map((permission)=>{
              let mykey = this.props.account.id + permission;
              return <li key={mykey} className="indexItemText">{permission.toLowerCase()}</li>
            })
          }
        </ul>
      </li>
    )
  }
});



module.exports = AccountsIndexItem;
