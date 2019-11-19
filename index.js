function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex:standaloneuser']
    },
    sinkmap: {
      dependencies: ['allex:standaloneuser']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
