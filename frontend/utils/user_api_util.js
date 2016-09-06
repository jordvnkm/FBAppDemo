

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

  fetchAllUsers: function(successCallback, errorCallback){
    $.ajax({
      url: `/api/users`,
      success: function(users){
        successCallback(users);
      },

      error: function(error){
        errorCallback(error);
      }
    })
  },

  updateUser: function(user, successCallback, errorCallback){
    let params = {user: {username: user.username,
                  password: user.password, email: user.email,
                  profile_img_url: user.profile_img_url,
                  home_location_id: user.home_location_id}};
    $.ajax({
      url: `/api/users/${user.id}`,
      type: "PATCH",
      data: params,
      success: function(user){
        successCallback(user);
      },
      error: function(errorResp){
        errorCallback(errorResp);
      }
    });
  },

  signUp: function(user, successCallback, errorCallback){
    let params = {user: user};
    $.ajax({
      url: '/api/users',
      type: "POST",
      data: params,
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
