const React = require("react");
const AccountsIndexItem = require("./accounts_index_item");


// TODO add accounts index item to return in map function

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
