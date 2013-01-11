
# mocha-cloud

  Mocha testing in the cloud with [SauceLabs](https://saucelabs.com).

## Links

  - Terminal [grid view](https://github.com/visionmedia/mocha-cloud-grid-view) for results

## Installation

  npm server client:

```
$ npm install mocha-cloud
```

  If you use [component](https://github.com/component/component)
  you may simply execute the following to get the client script:

```
$ component install visionmedia/mocha-cloud
```

  Otherwise use the ./build/build.js file,
  and pass `mocha.run()` to the cloud function
  allowing it to attach event handlers:

```js
cloud(mocha.run());
```

## Example

```js

var Cloud = require('mocha-cloud');
var cloud = new Cloud('your project name', 'username', 'access key');
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
```

## License

  MIT
