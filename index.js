
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;

/**
 * Expose `Cloud`.
 */

module.exports = Cloud;

/**
 * Initialize a cloud test with your saucelabs username / key.
 *
 * @param {String} user
 * @param {String} key
 * @api public
 */

function Cloud(user, key) {
  this.user = user;
  this.key = key;
  this.browsers = [];
  // this.browser = wd.remote('ondemand.saucelabs.com', 80, user, key);
}

/**
 * Add browser for testing.
 *
 * View https://saucelabs.com/docs/browsers for details.
 *
 * @param {String} name
 * @param {String} version
 * @param {String} platform
 * @return {Cloud} self
 * @api public
 */

Cloud.prototype.browser = function(name, version, platform){
  this.browsers.push({
    browserName: name,
    version: version,
    platform: platform
  });
};