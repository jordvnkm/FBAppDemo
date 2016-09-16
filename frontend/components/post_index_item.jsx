const React = require("react");
const PageActions = require("../actions/page_actions");
const PostStore = require("../stores/post_store");
const hashHistory = require("react-router").hashHistory;
const DeleteButton = require("./delete_button");
const CreateCommentForm = require("./create_comment_form");
const CommentStore = require("../stores/comment_store");
const CommentsIndex = require("./comments_index");
const PostActions = require("../actions/post_actions");
const CommentActions = require("../actions/comment_actions");

const PostIndexItem = React.createClass({
  getInitialState: function(){
    return {profileImageUrl: "", comments : []};
  },

  componentDidMount: function(){
    this.postListener = PostStore.addListener(this.postChange);
    this.commentListener = CommentStore.addListener(this.commentChange);
    PageActions.fetchProfileImage(this.props.post.from.id, this.props.post.id);
    PostActions.fetchComments(this.props.post.id);
  },

  componentWillUnmount: function(){
    this.postListener.remove();
    this.commentListener.remove();
  },

  commentChange: function(){
    this.setState({comments: CommentStore.getComments(this.props.post.id)});
  },

  postChange: function(){
    this.setState({profileImageUrl: PostStore.getProfileImage(this.props.post.id)})
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
    let url = `post/${this.props.post.from.id}/${this.props.post.id}`
    hashHistory.push(url);
  },

  postPhotoOrVideo: function(){
    if (this.props.post.source){
      return <video src={this.props.post.source} controls/>
    }
    else if (this.props.post.picture){
      return <img className="postPicture" src={this.props.post.picture}/>
    }
  },

  deleteClicked: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteClicked(this.props.post.id);
  },

  deleteComment: function(commentId){
    let pageId = this.props.post.id.split("_")[0];
    PostActions.deleteComment(commentId, this.props.post.id, pageId);
  },

  postComment: function(content, asPage){
    if (asPage){
      CommentActions.createCommentAsPage(this.props.post.id, content)
    }
    else {
      CommentActions.createCommentAsPerson(this.props.post.id, content, this.props.myToken);
    }
  },

  comments: function(){
    if (this.state.comments){
      return <CommentsIndex comments={this.state.comments} deleteComment={this.deleteComment}/>
    }
  },

  submitComment: function(content, asPage){
    if (asPage){
      CommentActions.createCommentAsPage(this.props.post.id, content)
    }
    else {
      CommentActions.createCommentAsPerson(this.props.post.id, content, this.props.myToken);
    }
  },

  render: function(){
    return (
      <li className="postIndexItem">
        <div className="postIndexItemHeader">
          <div className="postAuthorMiniInfo">
            <img className="postAuthorPic" src={this.state.profileImageUrl}/>
            <span>{this.props.post.from.name}</span>
          </div>
          <div className="postButtons">
            <button className="normalButton" onClick={this.handleClick}>View Details</button>
            <DeleteButton text={"Delete Post"} deleteClicked={this.deleteClicked} postId={this.props.post.id}/>
          </div>
        </div>
        <div className="postMessage">
          <span>{this.props.post.message}</span>
        </div>
        <div className="postIndexItemContent">
          {this.postPhotoOrVideo()}
        </div>
        <div className="commentsDiv">
          {this.comments()}
          <CreateCommentForm className="postIndexItemForm" onsubmit={this.submitComment}/>
        </div>
      </li>
    );
  }
});



module.exports = PostIndexItem;
