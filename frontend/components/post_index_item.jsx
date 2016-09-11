const React = require("react");
const PageActions = require("../actions/page_actions");
const PostStore = require("../stores/post_store");

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

  render: function(){
    return (
      <li className="postIndexItem">
        <img src={this.state.profileImageUrl}/>
        {this.props.post.from.name}<br></br>
        {this.props.post.message}
      </li>
    );
  }
});



module.exports = PostIndexItem;
