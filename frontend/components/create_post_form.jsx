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
        <div id="publishedRadioButtons" className="radioButtons">
            <input id="publishedRadio" type="radio" name="published" value={true} checked={this.state.isPublished == "true"} onChange={this.publishChange}/>
            <label htmlFor="publishedRadio">Published</label>

            <input id="unpublishedRadio" type="radio" name="published" value={false} checked={this.state.isPublished == "false"} onChange={this.publishChange}/>
            <label htmlFor="unpublishedRadio">Unpublished</label>
        </div>
      );
    }
    else {
      return (
        <div id="publishedRadioButtons" className="radioButtons">
          <input id="publishedRadio" type="radio" name="published" value={true} checked={this.state.isPublished == "true"} onChange={this.publishChange}/>
          <label htmlFor="publishedRadio">Published</label>
        </div>
      );
    }
  },

  asPageRadioButtons: function(){
    return (
      <div id="asPageRadioButtons" className="radioButtons">
        <span>Post As</span>
        <input id="asPage" type="radio" name="asPage" value={true} checked={this.state.asPage == "true"} onChange={this.sourceChange} />
        <label htmlFor="asPage">Page</label>

        <input id="asPerson" type="radio" name="asPage" value={false} checked={this.state.asPage == "false"} onChange={this.sourceChange} />
        <label htmlFor="asPerson">Person</label>
      </div>
    );
  },

  fileUpload: function(event){
    event.preventDefault();
    let self = this;
    cloudinary.openUploadWidget(window.cloudinary_options,
      function(error, images){
        if (error === null){
          self.setState({image: images[0]})
        }
    });
  },

  uploadUrl: function(){

    if (this.state.image){
      if (this.isPhoto(this.state.image)){
        return <img className="postFormImage" src={this.state.image.url}/>
      }
      else if (this.isVideo(this.state.image)){
        return <img className="postFormImage" src={this.state.image.thumbnail_url} />
      }
    }
  },

  isVideo: function(image){
    let acceptedFormats = ["3g2", "3gp", "3gpp", "asf", "avi", "dat", "divx", "dv", "f4v", "flv",
                            "m2ts", "m4v", "mkv", "mod", "mov","mp4", "mpe", "mpeg","mpeg4", "mpg",
                          "mts", "nsv", "ogm", "ogv", "qt","tod", "ts", "vob", "wmv"];
    if (acceptedFormats.includes(image.format.toLowerCase())){
      return true;
    }
    return false;
  },

  isPhoto: function(image){
    let acceptedFormats = ["jpg", "bmp", "png","gif","tiff"];
    if (acceptedFormats.includes(image.format.toLowerCase())){
      return true;
    }
    return false;
  },

  render: function(){
    return (
      <div id="createPostForm">
        <div className="postFormHeader">
          <span>Status</span>
          <span className="uploadButton" onClick={this.fileUpload}>Photo/video</span>
          {this.asPageRadioButtons()}
        </div>
        <div className="postFormImageContainer">
          {this.uploadUrl()}
        </div>
        <form className="postForm" onSubmit={this.submitPost}>
          <input className="statusInput" type="text" value={this.state.postContent}
                onChange={this.contentChange} placeholder="Say hi to your fans..." />


          {this.publishedRadioButtons()}
          <input className="submitButton" type="submit" value="Post" />
        </form>

      </div>
    );
  }
});



module.exports = CreatePostForm;
