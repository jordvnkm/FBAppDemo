const React = require("react");
const ReactDOM = require("react-dom");


const reactRouter = require("react-router");
const Router = reactRouter.Router;
const Route = reactRouter.Route;
const hashHistory = reactRouter.hashHistory;
const IndexRoute = reactRouter.IndexRoute;
const UserActions = require("./actions/user_actions");

const App = require("./components/app");
const LoginPage = require("./components/login_page");
const HomePage = require("./components/home_page");
const AccountPage = require("./components/account_page");
const PostDetail = require("./components/post_detail");

let routes = (<Router history={hashHistory}>
  <Route path="/" component = {App}>
    <IndexRoute component={LoginPage}/>
    <Route path="user/:fbId" component={HomePage}></Route>
    <Route path="account/:account_id" component={AccountPage}></Route>
    <Route path="post/:userId/:postId" component={PostDetail}></Route>
  </Route>
</Router> );


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(routes, document.getElementById("content"));
})
