const { Readable } = require("stream");
const { parseRequest } = require("./requestParser.js");

class IncomingMessage extends Readable {
  length;
  request;
  requestHandler;

  constructor(sock, requestHandler, options) {
    super(options);
    this.length = 0;
    this.request = {};
    this.prevRemain = "";
    this.requestHandler = requestHandler;

    sock.on("data", (data) => {
      const newData = data.toString();
      console.log("newdata", newData);
      this.push(newData);

      parseRequest(this.prevRemain + newData, this.request);
      this.length += newData.length;

      if (this.length === this.request.headers["Content-Length"]) {
        processRequest();
      }
    });
  }

  processRequest() {
    const response = responseBuilder(request, sock);
    bodyParser(request);
    this.requestHandler(request, response);
  }
  _read() {}
}

module.exports = { IncomingMessage };
