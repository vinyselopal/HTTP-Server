let postData = JSON.stringify({"data": 'This is request data'})
const http = require('http')
const options = {
    host: '127.0.0.1',
    port: 8000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(postData)
    }
}
const request = http.request(options, (res) => {
	let data = ''
	res.setEncoding('utf8');
	if (res.statusCode !== 200) {
        console.log(res.statusCode)
        res.resume()
        return
    }
    res.on('data', (chunk) => {
        data += chunk // you can store chunk in string or byte form, here string
    })
    res.on('close', () => {
        console.log('Retrieved all data')
        console.log(data)
    })

})
request.on('error', (err) => {
	console.error(`Encountered an error trying to make a request: ${err.message}`)
})
request.write(postData, () => {
	console.log("data wrtten")
})
request.end()