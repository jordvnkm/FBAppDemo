const UpdateStore = require("../stores/update_store");
const UpdateConstants = require('../constants/update_constants');
const AppDispatcher = require("../dispatcher/dispatcher");

const UpdateActions = {
  broadcastUpdate: function(){
    AppDispatcher.dispatch({
      actionType: UpdateConstants.UPDATE_RECEIVED
    })
  }
};


module.exports = UpdateActions;
