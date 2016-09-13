const React = require("react");

const CreatePostForm = React.createClass({
  getInitialState: function(){
    return {postContent: "", isPublished: "true", asPage: "true",
            image: undefined};
  },

  contentChange: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({postContent: event.target.value})
  },

  submitPost: function(event){
    event.preventDefault();
    event.stopPropagation();
    let asPage;
    let published;
    if (this.state.isPublished == "true"){
      published = true;
    }
    else {
      published = false;
    }

    if (this.state.asPage == "true"){
      asPage = true;
    }
    else {
      asPage = false;
    }
    this.props.onsubmit(this.state.postContent, this.state.image, published, asPage);
    this.setState({postContent: "", image: undefined});
  },

  publishChange: function(event){
    this.setState({isPublished: event.target.value});
  },

  sourceChange: function(event){
    if (event.target.value == "true"){
      this.setState({asPage: event.target.value});
    }
    else {
      this.setState({asPage: "false", isPublished: "true"});
    }
  },

  publishedRadioButtons: function(){
    if (this.state.asPage == "true"){
      return (
        <div id="publishedRadioButtons">
          <input type="radio" name="published" value={true} checked={this.state.isPublished == "true"} onChange={this.publishChange}/> published
          <input type="radio" name="published" value={false} checked={this.state.isPublished == "false"} onChange={this.publishChange}/> unpublished
        </div>
      );
    }
    else {
      return (
        <div id="publishedRadioButtons">
          <input type="radio" name="published" value={true} checked={true} onChange={this.publishChange}/> published
        </div>
      );
    }
  },

  asPageRadioButtons: function(){
    return (
      <div className="asPageRadioButtons">
        Post As
        <input type="radio" name="asPage" value={true} checked={this.state.asPage == "true"} onChange={this.sourceChange} /> Page
        <input type="radio" name="asPage" value={false} checked={this.state.asPage == "false"} onChange={this.sourceChange} /> Individual
      </div>
    );
  },

  fileUpload: function(event){
    event.preventDefault();
    let self = this;
    cloudinary.openUploadWidget(window.cloudinary_options,
      function(error, images){
        if (error === null){
          console.log(images);
          self.setState({image: images[0]})
        }
    });
  },

  uploadUrl: function(){

    if (this.state.image){
      return <img src={this.state.image.thumbnail_url}/>
    }
  },

  render: function(){
    return (
      <div id="createPostForm">
        <span>Create Post</span>
        <button onClick={this.fileUpload}> Upload photo/video </button>
        {this.uploadUrl()}
        <form onSubmit={this.submitPost}>
          <input type="text" value={this.state.postContent}
                onChange={this.contentChange} placeholder="Say hi to your fans" />


          {this.publishedRadioButtons()}
            <br></br>
          {this.asPageRadioButtons()}
          <input type="submit" value="Post" />
        </form>

      </div>
    );
  }
});



module.exports = CreatePostForm;
