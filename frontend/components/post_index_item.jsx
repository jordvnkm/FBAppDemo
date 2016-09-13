const React = require("react");
const PageActions = require("../actions/page_actions");
const PostStore = require("../stores/post_store");
const hashHistory = require("react-router").hashHistory;

const PostIndexItem = React.createClass({
  getInitialState: function(){
    return {profileImageUrl: ""};
  },

  componentDidMount: function(){
    this.postListener = PostStore.addListener(this.postChange);
    PageActions.fetchProfileImage(this.props.post.from.id, this.props.post.id);
  },

  componentWillUnmount: function(){
    this.postListener.remove();
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

  render: function(){
    return (
      <li onClick={this.handleClick} className="postIndexItem">
        <img src={this.state.profileImageUrl}/>
        {this.props.post.from.name}<br></br>
        {this.postPhotoOrVideo()}
        {this.props.post.message}
      </li>
    );
  }
});



module.exports = PostIndexItem;
