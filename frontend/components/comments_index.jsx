const React = require("react");



const CommentsIndex = React.createClass({
  render: function(){
    return (
      <ul className="commentsIndex">
        {
          this.props.comments.map((comment)=>{
            return <li key={comment.id}>{comment.message}</li>
          })
        }
      </ul>
    );
  }
});



module.exports = CommentsIndex;
