const React = require("react");
const AccountActions = require("../actions/account_actions");
const AccountStore = require("../stores/account_store");
const InsightActions = require("../actions/insight_actions");
const InsightStore = require("../stores/insight_store");

const InsightsIndex = require("./insights_index");


const AccountInformation = React.createClass({
  getInitialState: function(){
    return {accountImageUrl: "", insights: []};
  },

  componentDidMount: function(){
    console.log(this.props.account);
    this.accountListener = AccountStore.addListener(this.accountChange);
    this.insightListener = InsightStore.addListener(this.insightChange);
    AccountActions.fetchAccountImage(this.props.account.id);
    InsightActions.fetchPageInsights(this.props.account.id);
  },

  insightChange: function(){
    this.setState({insights: InsightStore.getPageInsights(this.props.account.id)});
  },

  componentWillUnmount: function(){
    this.accountListener.remove();
    this.insightListener.remove();
  },

  accountChange: function(){
    this.setState({accountImageUrl: AccountStore.getPageImage(this.props.account.id)})
  },


  render: function(){
    return (
      <div className="accountInfo">
        <img className="accountInfoImage" src={this.state.accountImageUrl}/>
        <span className="accountName">{this.props.account.name}</span>
        <InsightsIndex insights={this.state.insights}/>
      </div>
    );
  }
});


module.exports = AccountInformation;
