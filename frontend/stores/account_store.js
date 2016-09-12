const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const AccountConstants = require("../constants/account_constants");

let AccountStore = new Store(AppDispatcher);

let _accounts = [];
let _paging = {};
let _images = {};
let _currentAccount = undefined;


AccountStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case AccountConstants.ACCOUNTS_RECEIVED:
      receiveAccounts(payload.accounts);
      receivePaging(payload.paging);
      AccountStore.__emitChange();
      break;
    case AccountConstants.ACCOUNT_RECEIVED:
      receiveAccount(payload.account);
      AccountStore.__emitChange();
      break;
    case AccountConstants.ACCOUNT_IMAGE_RECEIVED:
      receiveImage(payload.imageData);
      AccountStore.__emitChange();
      break;
  }
};

const receiveImage = function(imageData){
  _images[imageData.accountId] = imageData.data;
};

const receiveAccount = function(account){
  _currentAccount = account;
};

const receivePaging = function(paging){
  _paging = paging;
};

const receiveAccounts = function(accounts){
  _accounts = accounts;
};


AccountStore.getPageImage = function(accountId){
  if (_images[accountId] !== undefined){
    return _images[accountId].url;
  }
};

AccountStore.getAccount = function(){
  return _currentAccount;
};

AccountStore.getAccounts = function(){
  if (_accounts.length > 0){
    return _accounts.slice();
  }
  else {
    return [];
  }
};


AccountStore.getPaging = function(){
  return Object.assign({}, _paging);
}



module.exports = AccountStore;
