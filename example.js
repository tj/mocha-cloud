
var Cloud = require('./');
var fs = require('fs');
var auth = fs.readFileSync('.auth', 'ascii').trim().split(':');

var cloud = new Cloud('domify', auth[0], auth[1]);
cloud.browser('iphone', '5.0', 'Mac 10.6');
cloud.browser('ipad', '6', 'Mac 10.8');
cloud.url('http://localhost:3000/test/');

cloud.on('init', function(browser){
  console.log('  init : %s %s', browser.browserName, browser.version);
});

cloud.on('start', function(browser){
  console.log('  start : %s %s', browser.browserName, browser.version);
});

cloud.on('end', function(browser, res){
  console.log('  end : %s %s : %d failures', browser.browserName, browser.version, res.failures);
});

cloud.start();