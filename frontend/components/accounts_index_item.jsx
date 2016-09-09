const React = require("react");
const hashHistory = require("react-router").hashHistory;


const AccountsIndexItem = React.createClass({

  handleClick: function(){
    let url = `account/${this.props.account.id}`;
    hashHistory.push(url);
  },

  render: function(){
    return (
      <li onClick={this.handleClick} className="accountItem">
        <span>{this.props.account.name}</span>

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
