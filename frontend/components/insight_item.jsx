const React = require("react");

const InsightItem = React.createClass({
  render: function(){
    return (
      <li className="insightItem">
        <span>{this.props.insight.title}</span>
        <span>{this.props.insight.values[2].value}</span>
      </li>
    )
  }
});

module.exports = InsightItem;
