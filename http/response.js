const { OutgoingMessage } = require("./outgoingMessage.js");
const { bodyParser } = require("./bodyParser.js");

class ServerResponse extends OutgoingMessage {
  body = "";
  headers = {};
  request
  constructor(sock, request, options) {
    super(sock);
    this.headers.status = request.headers.status;
    this.headers.httpVersion = request.headers.httpVersion;
    this.request = request
  }
  bodyParser() {
    bodyParser(this.request);
  }
}

module.exports = { ServerResponse };
