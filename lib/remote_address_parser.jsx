import "nodejs.jsx/http.jsx";

__export__ class RemoteAddressParser {
  static function getAddress(request : ServerRequest) : string {
    var req = request as __noconvert__ HttpServerRequest;
    var ip =
      req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] :
      req.connection.remoteAddress ? req.connection.remoteAddress :
      req.socket.remoteAddress ? req.socket.remoteAddress :
      req.connection.socket.remoteAddress ? req.connection.socket.remoteAddress : "";
    return ip as string;
  }
}

native __fake__ class HttpServerRequest extends ServerRequest {
  __readonly__ var connection : NetSocket;
  __readonly__ var socket : NetSocket;
}

native __fake__ class NetSocket {
  __readonly__ var remoteAddress : string;
  __readonly__ var socket : NetSocket;
}
