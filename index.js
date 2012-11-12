
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
  this.name = name;
  this.user = user;
  this.key = key;
  this.browsers = [];
  this._url = 'http://localhost:3000/';
  this._tags = [];
}

/**
 * Inherits from `Emitter.prototype`.
 */

Cloud.prototype.__proto__ = Emitter.prototype;

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
 * Set test `url`.
 *
 * @param {String} url
 * @api public
 */

Cloud.prototype.url = function(url){
  this._url = url;
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

Cloud.prototype.start = function(fn){
  var self = this;
  var batch = new Batch;
  fn = fn || function(){};

  this.browsers.forEach(function(conf){
    conf.tags = self.tags;
    conf.name = self.name;

    batch.push(function(done){
      debug('running %s %s %s', conf.browserName, conf.version, conf.platform);
      var browser = wd.remote('ondemand.saucelabs.com', 80, self.user, self.key);

      browser.init(conf, function(){
        debug('open %s', self._url);
        browser.get(self._url, function(err){
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
