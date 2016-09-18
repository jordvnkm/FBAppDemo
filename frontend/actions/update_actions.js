const UpdateStore = require("../stores/update_store");
const UpdateConstants = require('../constants/update_constants');
const AppDispatcher = require("../dispatcher/dispatcher");

const UpdateActions = {
  updateReceived: function(){
    AppDispatcher.dispatch({
      actionType: UpdateConstants.UPDATE_RECEIVED
    })
  }
};


module.exports = UpdateActions;
