

const UserApiUtil = {
  fetchCurrentUser: function(successCallback, errorCallback){
    $.ajax({
      url: '/api/session',
      success: function(user){
        successCallback(user);
      },
      error: function(errorResp){
        errorCallback(errorResp);
      }
    });
  },



  logIn: function(user, successCallback, errorCallback){
    let params = {user: user};
    $.ajax({
      url: "/api/session",
      type: "POST",
      data: params,
      success: function(user){
        successCallback(user);
      },
      error: function(error){
        errorCallback(error);
      }
    })
  },

  logOut: function(successCallback, errorCallback){
    $.ajax({
      url: "/api/session",
      type: "DELETE",
      success: function(user){
        successCallback(user);
      },
      error: function(error){
        errorCallback(error);
      }
    });
  }
};



module.exports = UserApiUtil;
