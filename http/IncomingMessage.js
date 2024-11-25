const { Readable } = require("stream");
const { parseRequest } = require("./requestParser.js");
const { OutgoingMessage } = require("./outgoingMessage.js");
const { bodyParser } = require("./bodyParser.js");

class IncomingMessage extends Readable {
  length;
  requestHandler;
  headers;
  method;
  path;
  httpVersion;
  url;
  sock;
  bodyBytesReceived = 0
  constructor(sock, requestHandler) {
    super();
    this.length = 0;
    this.prevRemain = Buffer.from("");
    this.requestHandler = requestHandler;
    this.sock = sock;

    sock.on("data", (data) => {
      console.log("data", data);

      this.prevRemain = parseRequest(
        Buffer.concat([this.prevRemain, data]),
        this
      ); // parse in express middleware
      this.length += data.length;
    });
  }

  processRequest() {
    const response = new OutgoingMessage(this.sock, this);
    this.requestHandler(this, response);
  }
  _read() {

  }

  bodyParser() {
    bodyParser(this);
  }
}

module.exports = { IncomingMessage };
