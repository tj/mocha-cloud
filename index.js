
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter
  , debug = require('debug')('mocha-cloud');

/**
 * Expose `Cloud`.
 */

module.exports = Cloud;

/**
 * Initialize a cloud test with
 * project `name`, your saucelabs username / key.
 *
 * @param {String} name
 * @param {String} user
 * @param {String} key
 * @api public
 */

function Cloud(name, user, key) {
  this.name = namel
  this.user = user;
  this.key = key;
  this.browsers = [];
  this._tags = [];
  // this.browser = wd.remote('ondemand.saucelabs.com', 80, user, key);
}

/**
 * Set tags to `tags`.
 *
 * @param {Array} tags
 * @return {Cloud} self
 * @api public
 */

Cloud.prototype.tags = function(tags){
  this._tags = tags;
  return this;
};

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
  debug('add %s %s %s', name, version, platform);
  this.browsers.push({
    browserName: name,
    version: version,
    platform: platform
  });
};

