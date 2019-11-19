function createUser(execlib, ParentUser) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  var localsinkinfo = require('../localsinkinfo'),
    remotesinkinfo = require('../remotesinkinfo'),
    visiblefields = [];
  localsinkinfo.forEach(function(localsink){
    visiblefields.push('have'+localsink.name);
  });
  remotesinkinfo.forEach(function(remotesink){
    visiblefields.push('have'+execlib.execSuite.userServiceSuite.nameOfRemoteSinkDescriptor(remotesink));
  });
  ParentUser.inherit(User, require('../methoddescriptors/user'), visiblefields.concat([/*visible state fields here*/]));
  
    visiblefields = null;
  User.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };

  User.prototype.sendSingleMessage = function(recipient, subject, body, notbefore, notafter, defer){
    execlib.lib.qlib.promise2defer(this.__service.sendSingleMessage(recipient, subject, body, notbefore, notafter), defer);
  };

  return User;
}

module.exports = createUser;
