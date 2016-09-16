const React = require("react");
const InsightsIndexItem = require("./insights_index_item");
const InsightItem = require("./insight_item");

const InsightsIndex = React.createClass({
  render: function(){
    console.log(this.props.insights);
    return(
      <div className="insightsIndex">
        <li>
          <ul>
            {
              this.props.insights.map((insight)=>{
                return <InsightItem key={insight.description} insight={insight}/>;
              })
            }
          </ul>
        </li>
      </div>
    )
  }
});

module.exports = InsightsIndex;
