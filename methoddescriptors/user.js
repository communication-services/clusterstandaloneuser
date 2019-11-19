module.exports = {
  sendSingleMessage: [{
    title: 'recipient',
    type: 'string'
  },{
    title: 'subject',
    type: 'string'
  },{
    title: 'body',
    type: 'object'
    /*properties: text or html or both*/
  },{
    title: 'Do not Send Before',
    type: 'number',
    required: false
  },{
    title: 'Do not Send After',
    type: 'number',
    required: false
  }]
};
