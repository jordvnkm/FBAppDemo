const React = require("react");
const PostIndexItem = require("./post_index_item");


const PostsIndex = React.createClass({
  componentWillReceiveProps: function(newProps){
    this.props = newProps;
    console.log("will receive props posts index")
  },


  render: function(){
    return (
      <div id="postsIndex">
        <ul className="postsList">
          {
            this.props.posts.map((post)=>{
              return <PostIndexItem myToken={this.props.myToken} deleteClicked={this.props.deletePost} key={post.id} post={post}/>
            })
          }
        </ul>
      </div>
    );
  }
});



module.exports = PostsIndex;
