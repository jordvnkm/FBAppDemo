const React = require("react");

const InsightItem = React.createClass({
  render: function(){
    let lastIndex = this.props.insight.values.length - 1;
    return (
      <li className="insightItem">
        <span>{this.props.insight.title}</span>
        <span>{this.props.insight.values[lastIndex].value}</span>
      </li>
    )
  }
});

module.exports = InsightItem;
