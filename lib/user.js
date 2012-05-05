resourceful = require('resourceful');

//uncomment for couchdb instead of in memory store
//resourceful.use('couchdb', {database: 'gists'} );

var User = resourceful.define('user', function () {
  this.string('username');
  this.string('password');
  this.string('email')
});

module.exports = User
