const { requestParser } = require("./requestParser.js")
const { responseBuilder } = require("./responseBuilder.js")
const net = require('net')

export const createServer = (requestHandler) => {
	console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`)
	let requestData = ''

	function onClientConnection(sock) {
		sock.on('close', function () {
			console.log(`close${sock.remoteAddress}:${sock.remotePort} Terminated the connection`)
		})
		sock.on('error', function (error) {
			console.error(`error${sock.remoteAddress}:${sock.remotePort} Connection Error: ${error}`)
		})
		sock.on('data', function (data) {
			requestData += data.toString()

			const request = requestParser(requestData)
			const response = responseBuilder(request)

			requestHandler(request, response)
		})
	}
	const server = net.createServer(onClientConnection)

	const listen = (...args) => server.listen(...args)
	return {
		listen
	}
}