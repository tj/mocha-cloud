var jssn = require('jssn');

/**
 * Listen to `runner` events to populate a global
 * `.stream()` function which may be used by selenium
 * to report on results.
 *
 *    cloud(mocha).run();
 *
 * @param {Mocha} mocha
 * @api public
 */

module.exports = function mochaCloud(mocha) {
  var Mocha = mocha.constructor;
  
  var events = [];
  window.stream = function () {
    var e = jssn.stringify(events);
    events = [];
    return e;
  };

  var HTML = Mocha.reporters.HTML;
  function SauceLabs(runner, root) {
    var emit = runner.emit;
    runner.emit = function () {
      emit.apply(this, arguments);
      events.push(arguments)
    };
    HTML.call(this, runner, root);
  }
  SauceLabs.prototype = HTML.prototype;

  return mocha.reporter(SauceLabs);
}