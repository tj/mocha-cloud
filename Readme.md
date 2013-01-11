# mocha-cloud

  Mocha testing in the cloud with [SauceLabs](https://saucelabs.com). If you plan
  on running the tests from the terminal check out the terminal [grid view](https://github.com/visionmedia/mocha-cloud-grid-view).

  ![](https://a248.e.akamai.net/camo.github.com/5de44b460b7f81c02497bec587a1b53832150c28/687474703a2f2f662e636c2e6c792f6974656d732f31653043304c3374317831753377334a323033752f6d6f6368612d677269642d7061737365732e706e67)

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
