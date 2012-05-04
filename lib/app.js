  var flatiron = require('flatiron'),
      app = flatiron.app,
      ecstatic = require('ecstatic'),
      fs = require('fs'),
      plates = require('plates')

  app.use(flatiron.plugins.http)
  app.http.before = [
    ecstatic(__dirname + '/../assets', { autoIndex : false})
  ]

  viewsDir = __dirname + '/../views'

  var index = ''
  indexPage = fs.readFile(viewsDir + '/index.html', 'utf8', function (err, data) {
    index += data
  });

  app.router.get('/', function () {
    this.res.writeHead(200, { 'Content-Type': 'text/html' })
    this.res.end(index);
  });

  app.router.post('/', function () {
    var data = { "post": this.req.body.gist};
    var output = plates.bind(index, data);
    this.res.end(output);
  });

  app.start(9090);

  app.log.info('Web app started on port 9090');

