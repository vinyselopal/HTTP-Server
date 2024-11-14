const { Writable } = require("stream");

class OutgoingMessage extends Writable {
  responseTitle = "";
  headersStr = "";
  bodyStr = "";
  constructor(sock, data, options) {
    super(options);
    this.sock = sock;
  }
  write(body, encoding, callback) {
    const msg = `${this.responseTitle}\r\n${this.headersStr}\r\n${body}`;
    this.write(msg, encoding, callback);
  }
  makeHeadersStr(headers) {
    if (this.headersStr.length) return;
    Object.keys(headers).forEach((header) => {
      this.headersStr += `${header}:${headers[header]}\r\n`;
    });
  }
  makeResponseTitle(httpVersion, responseCode) {
    this.responseTitle(`${httpVersion}${responseCode}`);
  }
}

module.exports = {OutgoingMessage}