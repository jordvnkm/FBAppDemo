const React = require("react");

const CreatePostForm = React.createClass({
  getInitialState: function(){
    return {postContent: "", isPublished: "true"}
  },

  contentChange: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({postContent: event.target.value})
  },

  submitPost: function(event){
    event.preventDefault();
    event.stopPropagation();
    let bool;
    if (this.state.isPublished == "true"){
      bool = true;
    }
    else {
      bool = false;
    }
    this.props.onsubmit(this.state.postContent, bool);
  },

  publishChange: function(event){
    this.setState({isPublished: event.target.value});
  },
  render: function(){
    return (
      <div id="createPostForm">
        <span>Create Post</span>
        <form onSubmit={this.submitPost}>
          <input type="text" value={this.state.postContent}
                onChange={this.contentChange} placeholder="Enter comment" />


              <input type="radio" name="published" value={true} checked={this.state.isPublished == "true"} onChange={this.publishChange}/> published
              <input type="radio" name="published" value={false} checked={this.state.isPublished == "false"} onChange={this.publishChange}/> unpublished
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});



module.exports = CreatePostForm;
