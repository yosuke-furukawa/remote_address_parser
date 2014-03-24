import "test-case.jsx";
import "remote_address_parser.jsx";
import "nock.jsx/nock.jsx";
import "nodejs.jsx/http.jsx";
import "timer.jsx";

native class app {
  static var router : variant;
  static function use(router : variant) : void;
  static function use(callback : function(:ServerRequest, :ServerResponse, :()->void) : void) : void;
  static function get(url : string, callback : function(:ServerRequest, :ServerResponse, :()->void) : void) : void;
} = "require('express')()";

native __fake__ class TimeoutServer extends HTTPServer {
  var timeout : number;
}

native class http_express {
  static function createServer(express:app) : TimeoutServer;

  static function request(url : string, callback : function(:ClientResponse):void) : ClientRequest;
  static function request(options : Map.<variant>, callback : function(:ClientResponse):void) : ClientRequest;
  static function get(url : string, callback : function(:ClientResponse):void) : ClientRequest;
} = "require('http')";


class _Test extends TestCase {
  function testRemoteAddressParser() :void {
    this.async(function(async : AsyncContext) : void {
      app.use(app.router);
      app.get("/", function(req, res, next) {
        this.expect(RemoteAddressParser.getAddress(req)).toBe('127.0.0.1');
        res.write("test");
        res.end();
      });
      var httpd = http_express.createServer(app);
      httpd.timeout = 1000;
      httpd.listen(9099);
      http.get("http://localhost:9099/", function(response){
        httpd.close();
        async.done();
      });

    }, 3000);
  }
  function testRemoteAddressParserXForwardedFor() :void {
    this.async(function(async : AsyncContext) : void {
      app.use(app.router);
      app.get("/", function(req, res, next) {
        req.headers["x-forwarded-for"] = "127.0.0.0,127.0.0.1";
        this.expect(RemoteAddressParser.getAddress(req)).toBe('127.0.0.0,127.0.0.1');
        res.write("test");
        res.end();
      });
      var httpd = http_express.createServer(app);
      httpd.timeout = 1000;
      httpd.listen(9099);
      http.get("http://localhost:9099/", function(response){
        httpd.close();
        async.done();
      });

    }, 3000);
  }
}


