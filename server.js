const net = require('net')
const port = 8000
const host = '127.0.0.1'

const server = net.createServer(onClientConnection)

server.listen(port, host, function() {
    console.log(`Server has started on port ${port} at ${host}`)
})

function onClientConnection(sock) {
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`)
    sock.on('data', function(data){
        console.log(`${sock.remoteAddress}:${sock.remotePort} Says : ${data.toString()} end xxxxxxx`)
        // const [firstLine, ...restLines] = data.toString().split('\n')
        // const [method, path, httpVersion] = firstLine.trim().split(' ')
        // console.log('restLines', restLines)
        // const headers = Object.fromEntries(restLines.map(a => a.split(':').map(a => a.trim()))
        // .map(([name, ...rest]) => [name, rest.join(':')]))

        // const request = {
        //     method,
        //     path,
        //     httpVersion,
        //     headers
        // }

        // console.log(request)
        // console.log(`HTTP/1.1 200 OK \n\nhello ${path.split('/')[1]}`)
        sock.write(`HTTP/1.1 200 OK \n\n`)
        sock.end((err) =>{console.log(err)})
    })
    sock.on('close', function(){
        console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection`)
    })
    sock.on('error', function(error) {
        console.error(`${sock.remoteAddress}:${sock.remotePort} COnnection Error ${error}`)
    })
}