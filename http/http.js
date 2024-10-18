const { requestParser } = require("./requestParser.js")
const { bodyParser } = require("./bodyParser.js")
const { responseBuilder } = require("./responseBuilder.js")

const net = require('net')
const { create } = require("domain")

const createServer = (requestHandler) => {
	let requestData = ''

	function onClientConnection(sock) {
		console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`)
		sock.on('close', function () {
			console.log(`close${sock.remoteAddress}:${sock.remotePort} Terminated the connection`)
		})
		sock.on('error', function (error) {
			console.error(`error${sock.remoteAddress}:${sock.remotePort} Connection Error: ${error}`)
		})
		sock.on('data', function (data) {
			requestData += data.toString()

			const request = requestParser(requestData)
			const response = responseBuilder(request, sock)
			bodyParser(request)
			requestHandler(request, response)
		})
	}
	const server = net.createServer(onClientConnection)

	const listen = (...args) => server.listen(...args)
	return {
		listen
	}
}

module.exports = { createServer }