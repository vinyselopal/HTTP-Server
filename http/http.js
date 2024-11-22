const net = require("net");
const { IncomingMessage } = require("./IncomingMessage.js");

const createServer = (requestHandler) => {
  function onClientConnection(sock) {
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
    const requestStream = new IncomingMessage(sock, requestHandler);

    sock.on("close", function () {
      console.log(
        `close${sock.remoteAddress}:${sock.remotePort} Terminated the connection`
      );
    });
    sock.on("error", function (error) {
      console.error(
        `error${sock.remoteAddress}:${sock.remotePort} Connection Error: ${error}`
      );
    });
  }
  const server = net.createServer(onClientConnection);
  const listen = (...args) => server.listen(...args);
  return {
    listen,
  };
};

module.exports = { createServer };
