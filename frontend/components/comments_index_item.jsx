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
    console.log("here");
    this.props.deleteComment(this.props.comment.id);
  },

  render: function(){
    return (
      <div className="commentsIndexItem">
        <img src={this.state.profileImageUrl}/>
        <span>{this.props.comment.from.name}</span>
        <span>{this.props.comment.message}</span>
        <DeleteButton text={"delete comment"} deleteClicked={this.deleteComment}/>
      </div>
    );
  }
});


module.exports = CommentsIndexItem;
