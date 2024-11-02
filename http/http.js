const { requestParser } = require("./requestParser.js")
const { bodyParser } = require("./bodyParser.js")
const { responseBuilder } = require("./responseBuilder.js")
const net = require('net')

const createServer = (requestHandler) => {

	function onClientConnection(sock) {
		const [request, parseRequest] = requestParser()
		let collectedData = ""
		console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`)
		const processRequest = () => {
			const response = responseBuilder(request, sock)
			bodyParser(request)
			requestHandler(request, response)
		}
		sock.on('close', function () {
			console.log(`close${sock.remoteAddress}:${sock.remotePort} Terminated the connection`)
		})
		sock.on('error', function (error) {
			console.error(`error${sock.remoteAddress}:${sock.remotePort} Connection Error: ${error}`)
		})
		sock.on('data', function (data) {
			const newData = data.toString()
			collectedData += newData
			parseRequest(newData)
			if (collectedData.length === request.headers["Content-Length"]) {
				processRequest()
				sock.end()
			}
		})
	}
	const server = net.createServer(onClientConnection)

	const listen = (...args) => server.listen(...args)
	return {
		listen
	}
}

module.exports = { createServer }