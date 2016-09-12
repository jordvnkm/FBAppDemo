const React = require("react");

const CreateCommentForm = React.createClass({
  getInitialState: function(){
    return {commentContent: "", asPage: "true"};
  },


  contentChange: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({commentContent: event.target.value});
  },

  sourceChange: function(event){
    this.setState({asPage: event.target.value});
  },

  asPageRadioButtons: function(){
    return (
      <div className="asPageRadioButtons">
        <span>Post as</span>
        <input type="radio" name="asPage" value={true} checked={this.state.asPage == "true"} onChange={this.sourceChange} /> Page
        <input type="radio" name="asPage" value={false} checked={this.state.asPage == "false"} onChange={this.sourceChange} /> Individual
      </div>
    );
  },

  submitComment: function(event){
    event.preventDefault();
    event.stopPropagation();
    let asPage;
    if (this.state.asPage == "true"){
      asPage = true;
    }
    else {
      asPage = false;
    }
    this.props.onsubmit(this.state.commentContent, asPage);
  },

  render: function(){
    return (
      <div className="createCommentForm">
        <form onSubmit={this.submitComment} className="commentForm">
          <input type="textarea" value={this.state.commentContent} onChange={this.contentChange} placeholder="Enter Comment"/>

          {this.asPageRadioButtons()}
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});

module.exports = CreateCommentForm;
