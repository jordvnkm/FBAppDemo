const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const UserConstants = require("../constants/user_constants");


let UserStore = new Store(AppDispatcher);


let _currentUser = null;


UserStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case UserConstants.LOGIN:
      loginUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.LOGOUT:
      logoutUser();
      UserStore.__emitChange();
      break;
  }
};

UserStore.currentUser = function(){
  if (_currentUser){
    return Object.assign({}, _currentUser);
  }
  return null;
}


const loginUser = function(user){
  _currentUser = user;
}

const logoutUser = function(){
  _currentUser = null;
}


module.exports = UserStore;
