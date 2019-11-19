function createClusterStandaloneUserService(execlib, ParentService) {
  'use strict';
  
  var lib = execlib.lib,
    qlib = lib.qlib,
    execSuite = execlib.execSuite;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function ClusterStandaloneUserService(prophash) {
    ParentService.call(this, prophash);
    this.askForRemote('Sender');
  }
  
  ParentService.inherit(ClusterStandaloneUserService, factoryCreator, void 0, {
    local: require('./localsinkinfo'),
    remote: require('./remotesinkinfo')
  });
  
  ClusterStandaloneUserService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };

  ClusterStandaloneUserService.prototype.sendSingleMessage = execSuite.dependentServiceMethod(['Sender'], [], function (sendersink, recipient, subject, body, notbefore, notafter, defer) {
    qlib.promise2defer(sendersink.call('sendSingleMessage', recipient, subject, body, notbefore, notafter), defer);
  });
  
  return ClusterStandaloneUserService;
}

module.exports = createClusterStandaloneUserService;
