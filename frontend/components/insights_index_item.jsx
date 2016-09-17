const React = require("react");
const InsightItem = require("./insight_item");

const InsightsIndexItem = React.createClass({
  render: function(){
    return (
      <ul className="insightIndexItem">
        {
          this.props.insight.data.map((insight)=>{
            return <InsightItem key={insight.title} insight={insight}/>;
          })
        }
      </ul>
    )
  }
});


module.exports = InsightsIndexItem;
