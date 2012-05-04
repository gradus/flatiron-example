  var flatiron = require('flatiron'),
      app = flatiron.app,
      ecstatic = require('ecstatic'),
      fs = require('fs')

  app.use(flatiron.plugins.http)
  app.http.before = [
    ecstatic(__dirname + '/../assets', { autoIndex : false})
  ]

  viewsDir = __dirname + '/../views'

  index = ''
  indexPage = fs.readFile(viewsDir + '/index.html', 'utf8', function (err, data) {
    index += data
  });

  app.router.get('/', function () {
    this.res.writeHead(200, { 'Content-Type': 'text/html' })
    this.res.end(index);
  });

  app.router.post('/create', function () {
    this.res.writeHead(200, { 'Content-Type': 'text/html' })
    this.res.end(index + "posted " +this.req.body.text);
  });

  app.start(9090);

  app.log.info('Web app started on port 9090');

