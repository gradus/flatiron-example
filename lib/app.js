var flatiron = require('flatiron'),
    app = flatiron.app,
    ecstatic = require('ecstatic'),
    fs = require('fs'),
    plates = require('plates'),
    resourceful = require('resourceful')

//uncomment for couchdb instead of in memory store
//resourceful.use('couchdb', {database: 'gists'} );

var Gist = resourceful.define('gist', function () {
  this.string('name');
  this.string('description');
  this.string('gist')
});

app.use(flatiron.plugins.http)
app.http.before = [
  ecstatic(__dirname + '/../assets', { autoIndex : false})
]

viewsDir = __dirname + '/../views'

var index = ''
indexPage = fs.readFile(viewsDir + '/index.html', 'utf8', function (err, data) {
  index += data
});

var create = ''
newPage = fs.readFile(viewsDir + '/new.html', 'utf8', function (err, data) {
  create += data
});

var list = ''
createPage = fs.readFile(viewsDir + '/list.html', 'utf8', function (err, data) {
  list += data
});


app.router.get('/', function () {
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(index);
});

app.router.get('/new', function () {
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(create);
});

app.router.get('/list', function () {
  var res = this.res
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  Gist.all( function (err, result) {
    res.end(plates.bind(list, {"list": result.join()}))
  });
});


app.router.post('/', function () {
  Gist.create({
    name: this.req.body.name,
    description: this.req.body.description,
    gist: this.req.body.gist
  })
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(plates.bind(index,
       {"gist": 'Created gist: '
       + this.req.body.name +' <br/>'
       + this.req.body.gist}
  ));
});

app.start(9090);

app.log.info('Web app started on port 9090');

