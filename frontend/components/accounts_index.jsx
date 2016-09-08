const React = require("react");


// TODO add accounts index item to return in map function


const AccountsIndex = React.createClass({
  render: function(){
    return (
      <div id="accountsIndex">
        <ul>
          {
            this.props.accounts.map((account) => {
              console.log(account);
              return <li key={account.id}>{account.name} {account.category}</li>
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = AccountsIndex;
