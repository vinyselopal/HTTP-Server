const { Writable } = require("stream");

class OutgoingMessage extends Writable {
  sock;
  headers;
  responseTitle;
  responseLineFlushed;
  headersFlushed;
  constructor(sock) {
    super();
    console.log("outgoingmessage", sock);
    this.sock = sock;
  }
  write(chunk) {
    console.log("inside outgoing message write");
    if (!this.responseLineFlushed) {
      this.responseTitle = "HTTP/1.1 200 OK\r\n";
      this.sock.write(this.responseTitle);
      this.responseLineFlushed = true;
    }
    if (!this.headersFlushed) {
      this.addGeneralHeaders();
      this.sock.write(this.makeHeadersStr());
      this.headersFlushed = true;
      this.sock.write("\r\n");
    }
    this.sock.write(chunk);
    console.log("write end", chunk.toString());
  }
  writeHead(statusCode, statusMessage, headers) {
    if (!this.responseLineFlushed) {
      this.responseTitle = `HTTP/1.1 ${statusCode} ${statusMessage}\r\n`;
      this.sock.write(this.responseTitle);
      this.responseLineFlushed = true;
    }
    if (!this.headersFlushed) {
      this.headers = headers;
      this.sock.write(this.makeHeadersStr());
      this.headersFlushed = true;
      this.sock.write("\r\n");
    }
  }
  makeHeadersStr() {
    return Object.keys(this.headers).reduce((prevStr, currHeader) => {
      return `${prevStr}${currHeader}:${this.headers[currHeader]}\r\n`;
    }, "");
  }
  addGeneralHeaders() {
    this.headers = {};
  }
}

module.exports = { OutgoingMessage };
