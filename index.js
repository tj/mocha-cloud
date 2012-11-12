
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter
  , debug = require('debug')('mocha-cloud')
  , Batch = require('batch')
  , wd = require('wd');

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

Cloud.prototype.run = function(fn){
  var self = this;
  var batch = new Batch;
  var url = 'http://localhost:3000/test/';

  this.browsers.forEach(function(conf){
    conf.tags = self.tags;
    conf.name = self.name;

    batch.push(function(done){
      debug('running %s %s %s', conf.browserName, conf.version, conf.platform);
      browser.init(conf, function(){
        debug('open %s', url);
        browser.get(url, function(err){
          if (err) return done(err);

          wait();

          function wait() {
            browser.eval('window.mochaResults', function(err, res){
              if (err) return done(err);
              if (!res) return debug('waiting for results'), wait();
              debug('results %j', res);
              browser.quit();
            });
          }
        });
      });
    });
  });

  batch.end(fn);
};
