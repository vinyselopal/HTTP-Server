const { Readable } = require("stream");
const { parseRequest } = require("./requestParser.js");

class IncomingMessage extends Readable {
  length;
  request;
  constructor(sock, requestHandler, options) {
    super(options);
    this.length = 0;
    this.request = {};
    this.prevRemain = "";

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
    requestHandler(request, response);
  }
  _read () {

  }
}

module.exports = { IncomingMessage };
