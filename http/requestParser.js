const parseRequest = (requestData, request) => {
  const parseRequestLine = (buf) => {
    console.log("in line parser", buf.toString());
    if (!buf.length) return "";
    if (request.httpVersion) {
      console.log("htpVersion done");
      return parseHeaders(buf);
    }
    console.log("buf", buf.entries());
    for (const pair of buf.entries()) {
      if (String.fromCharCode(pair[1]) === "\r") {
        const [method, path, httpVersion] = buf
          .slice(0, pair[0])
          .toString()
          .trim()
          .split(" ");
        if (!(method && path && httpVersion)) return str; // verifying valid requestLine
        request.method = method;
        request.path = path;
        request.httpVersion = httpVersion;
        return parseHeaders(buf.slice(pair[0] + 2));
      }
    }
    return buf;
  };

  const parseHeaders = (buf) => {
    console.log("in parseHeaders", buf.length);
    if (!buf.length) return "";
    if (request.headers) {
      console.log("headers present");
      return parseBody(buf);
    }
    for (const pair of buf.entries()) {
      let chars = "";
      for (const pair2 of buf.slice(pair[0], pair[0] + 4).entries()) {
        chars += String.fromCharCode(pair2[1]);
      }
      if (chars === "\r\n\r\n") {
        const splitHeadersFromBody = buf.slice(0, pair[0]).toString();
        const splitArr = splitHeadersFromBody.split("\r\n");
        const headers = Object.fromEntries(
          splitArr
            .slice(0, splitArr.length)
            .map((headerStr) => [
              headerStr.slice(0, headerStr.indexOf(":")),
              headerStr.slice(headerStr.indexOf(":") + 1),
            ])
        );
        console.log("headers", headers);
        request.headers = headers;
        request.url = request.headers["Host"] + request.path;
        console.log("url", request.url);
        return parseBody(buf.slice(pair[0] + 4));
      }
    }
    return buf;
  };

  const parseBody = (buf) => {
    if (request.body) return buf;
    const charEncoding =
      typeof request.headers["Content-Type"] === "string" ||
      !request.headers["Content-Type"]
        ? "utf-8"
        : request.headers["Content-Type"][1]; // hack, handle in headersParser
    console.log("buf", buf.toString(charEncoding));
    request.body += buf.toString(charEncoding);
    console.log("body parsed", request);
  };

  parseRequestLine(requestData);
};

module.exports = { parseRequest };
