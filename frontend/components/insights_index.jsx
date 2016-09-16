const React = require("react");
const InsightsIndexItem = require("./insights_index_item");


const InsightsIndex = React.createClass({
  render: function(){
    return(
      <div className="insightsIndex">
        <li>
          <ul>
            {
              this.props.insights.map((insight)=>{
                console.log(insight);
                return <InsightsIndexItem key={insight.data[0].name} insight={insight}/>;
              })
            }
          </ul>
        </li>
      </div>
    )
  }
});

module.exports = InsightsIndex;
