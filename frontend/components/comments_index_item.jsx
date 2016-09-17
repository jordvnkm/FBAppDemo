const React = require("react");
const PageActions = require("../actions/page_actions");
const CommentStore = require("../stores/comment_store");
const CommentActions = require("../actions/comment_actions");
const DeleteButton = require("./delete_button");

const CommentsIndexItem = React.createClass({
  getInitialState: function(){
    return {profileImageUrl: ""};
  },

  componentDidMount: function(){
    this.commentListener = CommentStore.addListener(this.commentChange);
    CommentActions.fetchProfileImage(this.props.comment.from.id, this.props.comment.id)
  },


  componentWillUnmount: function(){
    this.commentListener.remove();
  },

  commentChange: function(){
    this.setState({profileImageUrl: CommentStore.getUserImage(this.props.comment.id)});
  },

  deleteComment: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteComment(this.props.comment.id);
  },

  render: function(){
    return (
      <div className="commentsIndexItem">
        <div className="commentStuff">
          <img src={this.state.profileImageUrl}/>
          <div>
            <span className="commentAuthor">{this.props.comment.from.name}</span>
            <span className="commentText">{this.props.comment.message}</span>
          </div>
        </div>
        <DeleteButton text={"delete"} deleteClicked={this.deleteComment}/>
      </div>
    );
  }
});


module.exports = CommentsIndexItem;
