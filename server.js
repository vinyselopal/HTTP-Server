const net = require('net')
const port = 8000
const host = '127.0.0.1'

const server = net.createServer(onClientConnection)

server.listen(port, host, function () {
	console.log(`Server has started on port ${port} at ${host}`)
})

function onClientConnection(sock) {
	console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`)
	sock.on('data', function (data) {
		console.log("data", data)
		console.log(`${sock.remoteAddress}:${sock.remotePort} Says : ${data.toString()} end xxxxxxx`)
		const [firstLine, ...restLines] = data.toString().split('\n')
		console.log('firstLine', firstLine)
		console.log('restLines', restLines)
		const crlf = restLines.indexOf('\r')
		const body = restLines.slice(crlf + 1)
		console.log('body', body)
		const [method, path, httpVersion] = firstLine.trim().split(' ')
		const headers = Object.fromEntries(restLines.slice(0, crlf).map(a => a.split(':')
			.map(a => a.trim()))
			.map(([name, ...rest]) => [name, rest.join(':')]))

		const request = {
			method,
			path,
			httpVersion,
			headers
		}
		if (method === "GET") get()
		else post(data)

		function get() {
			console.log(request)
			sock.write(`HTTP/1.1 200 OK \n\nhello`)
			sock.end((err) => { console.log(err) })
		}
		function post(data) {
			console.log("post", body)
			if (headers['Content-Type'] === "application/json") {
				sock.write(`HTTP/1.1 200 OK \r\n ${JSON.parse(body.join('\n'))}`)
			}
			else sock.write(`HTTP/1.1 200 OK \n\nhello no body`)
			sock.end((err) => { console.log('closing error', err) })
		}

	})
	sock.on('close', function () {
		console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection`)
	})
	sock.on('error', function (error) {
		console.error(`${sock.remoteAddress}:${sock.remotePort} COnnection Error ${error}`)
	})
}