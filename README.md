Remote Address for JSX [![Build Status](https://travis-ci.org/yosuke-furukawa/remote_address_parser.svg?branch=master)](https://travis-ci.org/yosuke-furukawa/remote_address_parser)
=======================

client IP address parser for JSX

Getting Started
=======================

```shell
$ npm install remote_address_parser
```

For JS developers

```javascript
var RemoteAddressParser = require("remote_address_parser").RemoteAddressParser;
// require http/request
var ip = RemoteAddressParser.getAddress(request);
```

For JSX developers

```javascript
import "remote_address_parser/remote_address_parser.jsx";
// require http/request
var ip = RemoteAddressParser.getAddress(req);
```
