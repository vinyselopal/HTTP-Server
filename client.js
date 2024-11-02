const http = require('http')

const handleResponse = (res) => {
	let data = ''
	// res.setEncoding('utf8');
	// if (res.statusCode !== 200) {
	// 	console.log(res.statusCode)
	// 	res.resume()
	// 	return
	// }
	res.on('data', (chunk) => {
		data += chunk
	})
	res.on('end', () => {
		console.log('Retrieved all data', data)
	})
}

const makeGetRequest = () => {
	const options = {
		hostname: 'localhost',
		port: 8000,
		path: '/',
		method: 'GET'
	}

	const request = http.request(options, handleResponse)

	request.on('error', (err) => {
		console.error(`Error during request: ${err.message}`)
	})

	request.end()
}

const makePostRequest = () => {
	let postData = JSON.stringify({ "data": "This is request data" })
	let contentLength = Buffer.byteLength(postData)

	const postOptions = {
		hostname: 'localhost',
		port: 8000,
		path: '/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': contentLength
		}
	}

	const request = http.request(postOptions, handleResponse)

	request.on('error', (err) => {
		console.error(`Error during request: ${err.message}`)
	})

	request.write(postData, () => {
		console.log("data wrtten")
	})

	request.end()
}

makeGetRequest()
makePostRequest()