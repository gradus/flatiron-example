var vows = require('vows'),
    assert = require('assert');

var Gist = require('../lib/gist');
var newGist = Gist.new({
             name: "Test",
             description: "Description",
             gist: "Gist"
           })

vows.describe('Gist').addBatch({
    'when creating a gist': {
        topic: newGist.name,
        'name is saved': function (topic) {
            assert.equal (topic, 'Test');
        }
    }
}).addBatch({
    'when creating a gist': {
        topic: newGist.description,
        'description is saved': function (topic) {
            assert.equal (topic, 'Description');
        }
    }
}).addBatch({
    'when creating a gist': {
        topic: newGist.gist,
        'gist is saved': function (topic) {
            assert.equal (topic, 'Gist');
        }
    }
}).export(module);
