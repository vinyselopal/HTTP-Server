const http = require("./http/http.js")

const port = 8000
const host = '127.0.0.1'

const requestHandler = (req, res) => {
	
}

const server = http.createServer(requestHandler)

server.listen(port, host, function () {
	console.log(`Server has started on port ${port} at ${host}`)
})

// encoding
// methods
// chunks or streams