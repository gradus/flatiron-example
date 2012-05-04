var flatiron = require('flatiron'),
    app = flatiron.app,
    ecstatic = require('ecstatic'),
    fs = require('fs'),
    plates = require('plates')

Gist = require('./gist');

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
listPage = fs.readFile(viewsDir + '/list.html', 'utf8', function (err, data) {
  list += data
});

var show = ''
showPage = fs.readFile(viewsDir + '/show.html', 'utf8', function (err, data) {
  show += data
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
  Gist.all( function (err, results) {
    var r;
    var resultList = ''
    for (r in results) {
      resultList += '<a href="show/'
      + results[r].id + '">'
      + results[r].name + ' '
      + results[r].description
      + '</a><br />'
    }
    res.end(plates.bind(list, {"list": resultList}))
  });
});

app.router.get('/show/:id', function () {
  var res = this.res;
  var id = this.req.url.replace('/show/','');
  var resultShow = '';
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  Gist.get(id, function (err, result) {
    resultShow += 'name: ' + result.name + '<br />'
    + 'description: ' + result.description + '<br />'
    + 'Gist: ' + result.gist
    res.end(plates.bind(show, {"show": resultShow}));
  });
});

app.router.post('/', function () {
  Gist.create({
    name: this.req.body.name,
    description: this.req.body.description,
    gist: this.req.body.code
  })
  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(plates.bind(index,
       {"gist": 'Created gist: '
       + this.req.body.name +' <br/>'
       + this.req.body.code}
  ));
});

app.start(9090);

app.log.info('Web app started on port 9090');

