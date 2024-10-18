export const responseBuilder = (request, response) => {
	const send = (body) => {
		sock.end(`${response.httpVersion} ${response.status}\r\n${response.headers}\r\n\r\n${body}`)
	}
	return {
		body: {},
		headers: {
			status: null,
			httpVersion: request.httpVersion
		},
		send
	}
}