const React = require("react");
const PostIndexItem = require("./post_index_item");


const PostsIndex = React.createClass({
  render: function(){
    return (
      <div id="postsIndex">
        <ul>
          {
            this.props.posts.map((post)=>{
              return <PostIndexItem key={post.id} post={post}/>
            })
          }
        </ul>
      </div>
    );
  }
});



module.exports = PostsIndex;
