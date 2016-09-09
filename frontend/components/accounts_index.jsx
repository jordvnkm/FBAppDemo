const React = require("react");
const AccountsIndexItem = require("./accounts_index_item");




const AccountsIndex = React.createClass({
  render: function(){
    return (
      <div id="accountsIndex">
        <ul>
          {
            this.props.accounts.map((account) => {
              console.log(account);
              return <AccountsIndexItem key={account.id} account={account}/>
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = AccountsIndex;
