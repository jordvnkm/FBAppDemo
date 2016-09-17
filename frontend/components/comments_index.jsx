const React = require("react");
const CommentsIndexItem = require("./comments_index_item");


const CommentsIndex = React.createClass({
  render: function(){
    return (
      <ul className="commentsIndex">
        {
          this.props.comments.map((comment)=>{
            return <CommentsIndexItem deleteComment={this.props.deleteComment} key={comment.id} comment={comment}/>
          })
        }
      </ul>
    );
  }
});



module.exports = CommentsIndex;
