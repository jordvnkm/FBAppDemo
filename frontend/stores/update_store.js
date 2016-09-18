const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const UpdateConstants = require("../constants/update_constants");


const UpdateStore = new Store(AppDispatcher)





UpdateStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case UpdateConstants.UPDATE_RECEIVED:
      UpdateStore.__emitChange();
      break;
  }
}


module.exports = UpdateStore;
