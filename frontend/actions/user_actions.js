const UserApiUtil = require("../utils/user_api_util");
const AppDispatcher = require("../dispatcher/dispatcher");
const UserConstants = require("../constants/user_constants");
const ErrorConstants = require("../constants/error_constants");


const UserActions = {
  fetchCurrentUser: function(){
    UserApiUtil.fetchCurrentUser(UserActions.receiveCurrentUser, UserActions.handleError);
  },

  // fetchAllUsers: function(){
  //   UserApiUtil.fetchAllUsers(UserActions.receiveAllUsers, UserActions.handleError);
  // },
  //
  // receiveAllUsers: function(users){
  //   AppDispatcher.dispatch({
  //     actionType: UserConstants.USERS_RECEIVED,
  //     users: users
  //   })
  // },

  // signUp: function(user){
  //   UserApiUtil.signUp(user, UserActions.receiveCurrentUser, UserActions.handleError);
  // },

  logIn: function(user){
    UserApiUtil.logIn(user, UserActions.receiveCurrentUser, UserActions.handleError);
  },

  // guestLogin: function(){
  //   UserActions.logIn({username: "guest", password: "password"});
  // },

  // updateUser: function(user){
  //   UserApiUtil.updateUser(user, UserActions.receiveCurrentUser, UserActions.handleError);
  // },

  receiveCurrentUser: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGIN,
      user: user
    });
  },

  handleError: function(error){
    console.log(error);
    AppDispatcher.dispatch({
      actionType: ErrorConstants.ERROR,
      errors: error
    });
  },

  removeCurrentUser: function(){
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGOUT,
    });
  },

  logout: function(){
    UserApiUtil.logOut(UserActions.removeCurrentUser, UserActions.handleError);
  }
};



module.exports = UserActions;
