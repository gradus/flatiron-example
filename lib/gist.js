resourceful = require('resourceful');

//uncomment for couchdb instead of in memory store
resourceful.use('couchdb', {database: 'gists'} );

var Gist = resourceful.define('gist', function () {
  this.string('name');
  this.string('description');
  this.string('gist')
});

module.exports = Gist
