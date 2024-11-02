const requestParser = (requestData) => {
	let prevRemain = ""
	const request = {}

	const parseRequestLine = (str) => {
		if (request.httpVersion) {
			return parseHeaders(str)
		}
		console.log("split", str.split('\r\n'))
		const [firstLine, ...restLines] = str.split('\r\n')
		const [method, path, httpVersion] = firstLine.trim().split(' ')
		if (!(method && path && httpVersion)) return str // verifying valid requestLine
		request.method = method
		request.path = path
		request.httpVersion = httpVersion
		console.log("line parsed", request, restLines)
		if (restLines) {
			console.log("restlines", restLines)
			return parseHeaders(restLines.join("\r\n"))
		}
	}

	const parseHeaders = (str) => {
		if (request.headers) {
			return parseBody(str)
		}
		const splitHeadersFromBody = str.split("\r\n\r\n")
		const splitArr = str.split('\r\n')
		const restLines = splitArr.pop()
		console.log("splitArr", splitArr, "restLines", restLines)
		const headers = Object.fromEntries((splitArr.slice(0, splitArr.length - 1).map(headerStr => [headerStr.slice(0, headerStr.indexOf(":")), headerStr.slice(headerStr.indexOf(":") + 1)])))
		console.log("headers parsed", request, headers)
		request.headers = headers
		if (restLines) {
			return parseBody(restLines)
		}
	}

	const parseBody = (str) => {
		if (request.body) return str
		request.body = str
		console.log("body parsed", request)
	}

	const parseRequest = (msg) => {
		console.log("start", msg)
		parseRequestLine(prevRemain + msg)

	}
	return [request, parseRequest]

}

module.exports = { requestParser }