resourceful = require('resourceful');

//uncomment for couchdb instead of in memory store
//resourceful.use('couchdb', {database: 'gists'} );

var User = resourceful.define('user', function () {
  this.string('username').required(true);
  this.string('password').required(true);
  this.string('email').required(true);
});

module.exports = User
