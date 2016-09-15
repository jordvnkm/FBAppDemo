const React = require("react");
const PostIndexItem = require("./post_index_item");


const PostsIndex = React.createClass({
  render: function(){
    return (
      <div id="postsIndex">
        <ul className="postsList">
          {
            this.props.posts.map((post)=>{
              return <PostIndexItem deleteClicked={this.props.deletePost} key={post.id} post={post}/>
            })
          }
        </ul>
      </div>
    );
  }
});



module.exports = PostsIndex;
