const responseBuilder = (request, sock) => {
	const send = (body) => {
		sock.end(`HTTP/1.1 200 OK \r\n\r\n\r\n${body}`)
	}
	const response = {
		body: {},
		headers: {
			status: null,
			httpVersion: request.httpVersion
		},
		send
	}
	return response
}

module.exports = { responseBuilder }