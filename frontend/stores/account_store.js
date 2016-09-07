const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const AccountConstants = require("../constants/account_constants");

let UserStore = new Store(AppDispatcher);

let _accounts = [];


AccountStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case AccountConstants.ACCOUNTS_RECEIVED:
      receiveAccounts(payload.accounts);
      AccountStore.__emitChange();
      break;
  }
};

const receiveAccounts = function(accounts){
  _accounts = accounts;
};

AccountStore.getAccounts = function(){
  if (_accounts.length > 0){
    return _accounts.slice();
  }
  else{
    return [];
  }
};




module.exports = AccountStore;
