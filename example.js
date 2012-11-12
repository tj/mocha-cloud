
var Cloud = require('./');
var fs = require('fs');
var auth = fs.readFileSync('.auth', 'ascii').trim().split(':');

var cloud = new Cloud('domify', auth[0], auth[1]);
cloud.browser('iphone', '5.0', 'Mac 10.6');
cloud.url('http://localhost:3000/test/');
cloud.start();