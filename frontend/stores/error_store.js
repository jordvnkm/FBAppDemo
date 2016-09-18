const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const ErrorConstants = require("../constants/error_constants");

let ErrorStore = new Store(AppDispatcher);

let _errors = [];

ErrorStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case ErrorConstants.ERRORS_RECEIVED:
      receiveErrors(payload.errors);
      ErrorStore.__emitChange();
      break;
  }
};


const receiveErrors = function(errors){
  _errors = [errors];
};


ErrorStore.getErrors = function(){
  return _errors.slice();
};

module.exports = ErrorStore;
