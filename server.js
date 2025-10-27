//server.js

//required node js modules
const http = require('http');

const server = http.createServer(function (request, response)
{
    response.writeHead(200, {"content-type": "text/plain"});
    response.write("Hello");
    response.end();
}
)

const port = 8080;
server.listen(port);

console.log("Server running at port=" + port);