const responseBuilder = (request, sock) => {
	const response = {
		body: {},
		headers: {
			status: null,
			httpVersion: request.httpVersion
		},
		send
	}
	const send = (body) => {
		sock.end(`HTTP/1.1 200 OK \r\n\r\n\r\n${body}`)
	}
	return response
}

module.exports = { responseBuilder }