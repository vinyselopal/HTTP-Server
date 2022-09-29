const http = require('http')
const options = {
    host: '127.0.0.1',
    port: 8000,
    path: '/',
    method: 'POST',
    body: {
        "a": 1,
        "b": 2
    },
    headers: {
        'Content-Type': 'application/json'
    }
}
const request = http.request(options, (res) => {
    if (res.statusCode !== 200) {
        console.log(res.statusCode)
        res.resume()
        return
    }
    let data = ''
    res.on('data', (chunk) => {
        data += chunk // you can store chunk in string or byte form, here string
    })
    res.on('close', () => {
        console.log('Retrieved all data')
        console.log(data)
    })

    console.log('end of request')
    request.end()

    request.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`)
    })
})