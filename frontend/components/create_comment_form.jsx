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
      <div id="asPageRadioButtonsComment" className="radioButtons">
        <span>Comment as</span>
        <input id="asPageComment" type="radio" name="asPage" value={true} checked={this.state.asPage == "true"} onChange={this.sourceChange} />
        <label htmlFor="asPageComment">Page</label>

        <input id="asPersonComment" type="radio" name="asPage" value={false} checked={this.state.asPage == "false"} onChange={this.sourceChange} />
        <label htmlFor="asPersonComment">Individual</label>
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
    this.setState({commentContent: ""});
  },

  onclick: function(event){
    event.stopPropagation();
  },

  render: function(){
    return (
      <div onClick={this.onclick} className="createCommentForm">
        <form onSubmit={this.submitComment} className="commentForm">
          <input className="commentInput" type="textarea" value={this.state.commentContent} onChange={this.contentChange} placeholder="Write a comment..."/>

          {this.asPageRadioButtons()}
          <input className="submitButton" type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});

module.exports = CreateCommentForm;
