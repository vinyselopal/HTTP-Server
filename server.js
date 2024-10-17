const net = require('net')
const port = 8000
const host = '127.0.0.1'

const server = net.createServer(onClientConnection)

server.listen(port, host, function () {
	console.log(`Server has started on port ${port} at ${host}`)
})

function onClientConnection(sock) {
	console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`)
	let requestData = ''

	sock.on('data', function (data) {
		requestData += data.toString()

		const [headers, body, method, path, httpVersion] = (requestData) => {
			const [firstLine, ...restLines] = requestData.toString().split('\n')
			const crlfIndex = restLines.indexOf('\r')
			const body = restLines.slice(crlfIndex + 1)
			const [method, path, httpVersion] = firstLine.trim().split(' ')
			const headers = Object.fromEntries(restLines.slice(0, crlfIndex).map(a => a.split(':')
				.map(a => a.trim()))
				.map(([name, ...rest]) => [name, rest.join(':')])
			)
			return [headers, body, method, path, httpVersion]
		}
		if (method === "GET") respondForGet()
		else respondForPost()
	})

	function respondForGet() {
		sock.end(`HTTP/1.1 200 OK\r\n\r\n\r\nget response from server`)
	}

	function respondForPost(body) {
		if (headers['Content-Type'] === "application/json") {
			sock.end(`HTTP/1.1 200 OK\r\n\r\n\r\n${body.toString()}`)
		}
		else sock.write(`HTTP/1.1 200 OK\r\n\r\n\r\n${body.toString()}`)
	}

	sock.on('close', function () {
		console.log(`close${sock.remoteAddress}:${sock.remotePort} Terminated the connection`)
	})

	sock.on('error', function (error) {
		console.error(`error${sock.remoteAddress}:${sock.remotePort} Connection Error: ${error}`)
	})
}