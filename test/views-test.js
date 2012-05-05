var vows = require('vows'),
    assert = require('assert');

var Views = require('../lib/views');

vows.describe('Views').addBatch({
    'when displaying views': {
        topic: Views.viewsDir,
        'path should be correct': function (topic) {
            assert.equal (topic, __dirname.replace('test','lib') + '/../views');
        }
    }
}).export(module);
