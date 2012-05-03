  var flatiron = require('flatiron'),
      app = flatiron.app;

  app.use(flatiron.plugins.http)

  app.router.get('/', function () {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' })
    this.res.end('flatiron ' + flatiron.version);
  });

  app.start(9090);
  console.log("Web app started on port 9090")

