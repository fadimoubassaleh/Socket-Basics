//our server
const http = require('http')
const server = http.createServer()

const handleRequest = (req, res) => {
    res.end('ok!')
}

server.on('request', handleRequest)
server.listen(8888, ()=> console.log('server is ready'))