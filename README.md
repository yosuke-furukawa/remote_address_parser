Remote Address for JSX
=======================

client IP address parser for JSX

Getting Started
=======================

```shell
$ npm install remote_address
```

For JS developers

```javascript
var RemoteAddressParser = require("remote_address").RemoteAddressParser;
// require http/request
var ip = RemoteAddressParser.getAddress(request);
```

For JSX developers

```javascript
import "remote_address/remote_address_parser.jsx";
// require http/request
var ip = RemoteAddressParser.getAddress(req);
```
