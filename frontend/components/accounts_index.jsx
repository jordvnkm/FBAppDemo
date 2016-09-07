const React = require("react");


// TODO add accounts index item to return in map function


const AccountsIndex = React.createClass({
  render: function(){
    return (
      <ul>
        {
          this.props.accounts.map((account) => {
            return <li key={account.id}>{account.name} {account.category}</li>
          })
        }
      </ul>
    );
  }
});

module.exports = AccountsIndex;
