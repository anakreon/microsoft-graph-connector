const Rsync = require('rsync');
const serversettings = require('./src/environments/serversettings.json');
 
const rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .set('delete')
  .source('./dist/microsoft-graph-connector/')
  .source('./docs/')
  .exclude('.htaccess')
  .destination(serversettings.destination);
 
rsync.execute(function(error, code, cmd) {});
