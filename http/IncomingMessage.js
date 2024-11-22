const { Readable } = require("stream");
const { parseRequest } = require("./requestParser.js");
const { OutgoingMessage } = require("./outgoingMessage.js");
const { bodyParser } = require("./bodyParser.js");

class IncomingMessage extends Readable {
  length;
  requestHandler;
  headers;
  body = "";
  method;
  path;
  httpVersion;
  url;
  sock;
  constructor(sock, requestHandler) {
    super();
    this.length = 0;
    this.prevRemain = Buffer.from("");
    this.requestHandler = requestHandler;
    this.sock = sock;

    sock.on("data", (data) => {
      console.log("data", data);
      this.push(data);

      this.prevRemain = parseRequest(
        Buffer.concat([this.prevRemain, data]),
        this
      );
      this.length += data.length;

      console.log("body length", this.body.length);
      console.log("header content length", this.headers["Content-Length"]);

      if (this.body.length == this.headers["Content-Length"]) {
        // change to === after handling in headersParser
        console.log("content length reached");
        this.processRequest();
      }
    });
  }

  processRequest() {
    const response = new OutgoingMessage(this.sock, this);
    this.requestHandler(this, response);
  }
  _read() {}

  bodyParser() {
    bodyParser(this);
  }
}

module.exports = { IncomingMessage };
