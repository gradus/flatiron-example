var flatiron = require('flatiron'),
    app = flatiron.app,
    ecstatic = require('ecstatic'),
    fs = require('fs'),
    plates = require('plates')

Gist = require('./gist');
Views = require('./views');

app.use(flatiron.plugins.http)
app.http.before = [
  ecstatic(__dirname + '/../assets', { autoIndex : false})
]

app.router.get('/', function () {
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(Views.index);
});

app.router.get('/new', function () {
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(Views.create);
});

app.router.get('/list', function () {
  var res = this.res
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  Gist.all( function (err, results) {
    var r;
    var resultList = ''
    for (r in results) {
      resultList += '<a href="show/'
      + results[r].id + '"><strong>'
      + results[r].name + '</strong>: '
      + results[r].description
      + '</a><br />'
    }
    res.end(plates.bind(Views.list, {"list": resultList}))
  });
});

app.router.get('/show/:id', function () {
  var res = this.res;
  var id = this.req.url.replace('/show/','');
  var resultShow = '';
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  Gist.get(id, function (err, result) {
    res.end(plates.bind(Views.show, {"code": result.gist}));
  });
});

app.router.post('/', function () {
  Gist.create({
    name: this.req.body.name,
    description: this.req.body.description,
    gist: this.req.body.code
  })
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(plates.bind(Views.index,
       {"code": '<strong>Created:</strong> '
       + this.req.body.name +' <br/>'
       + '<strong>Description:</strong> ' + this.req.body.description 
       }
  ));
});

app.start(9090);

app.log.info('Web app started on port 9090');

