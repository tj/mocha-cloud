
var Cloud = require('./');
var fs = require('fs');
var auth = fs.readFileSync('.auth', 'ascii').trim().split(':');
var cloud = new Cloud('domify', auth[0], auth[1]);