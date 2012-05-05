var fs = require('fs')
var Views = module.exports;

Views.viewsDir = __dirname + '/../views'

Views.index = ''
indexPage = fs.readFile(Views.viewsDir + '/index.html', 'utf8', function (err, data) {
  Views.index += data
});

Views.create = ''
newPage = fs.readFile(Views.viewsDir + '/new.html', 'utf8', function (err, data) {
  Views.create += data
});

Views.list = ''
listPage = fs.readFile(Views.viewsDir  + '/list.html', 'utf8', function (err, data) {
  Views.list += data
});

Views.show = ''
showPage = fs.readFile(Views.viewsDir  + '/show.html', 'utf8', function (err, data) {
  Views.show += data
});

