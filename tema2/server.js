var http = require("http");
const { parse } = require("querystring");
const url = require('url');
var userOps = require('./controller.js');

http.createServer(function(req, res) {

    const queryObject = url.parse(req.url, true).query;
    const path = url.parse(req.url, true).pathname;
    console.log(path);
    const first = "/" + path.split("/")[1];
    const second = "/" + path.split("/")[2];
    const pathname = first + second;
    console.log(pathname);
    id = path.split("/")[3];
    console.log(id);
    nameUser = path.split("/")[4]; // this will be 5
    console.log(nameUser);
    // GET endpoints
    if (pathname == '/GET/users' && req.method === 'GET') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.getUsers(req, res);
    } else
    if (pathname == `/GET/user` && req.method === 'GET' && id !== null && id !== '') {
        console.log(`ID: ${id} Request type: ` + req.method + ' Endpoint: ' + req.url);
        userOps.getUser(req, res, parseInt(id));
    } else
    if (pathname == `/GET/user` && req.method === 'GET' && (id == null || id == '')) {
        console.log("Nu se poate cu id empty! Cod 400");
        userOps.noID(req, res);
    }

    // POST endpoints
    else
    if (pathname == '/POST/user' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.createUser(req, res, 0);
    } else
    if (pathname == '/POST/lista' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.createLista(req, res);
    }

    // PUT endpoints
    else
    if (pathname == '/PUT/user' && req.method === 'PUT' && id !== null && id !== '') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.updateUser(res, id, nameUser);
    } else
    if (pathname == '/PUT/users' && req.method === 'PUT' && id !== null && id !== '') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.updateUsers(req, res);
    }

    // DELETE endpoints
    else
    if (pathname == '/DELETE/user' && req.method === 'DELETE' && id !== null && id !== '') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.deleteUser(req, res, parseInt(id))
    } else
    if (pathname == '/DELETE/user' && req.method === 'DELETE' && (id == null || id == '')) {
        console.log("Nu se poate cu id empty! Cod 400");
        userOps.noID(req, res);
    } else
    if (pathname == '/DELETE/users' && req.method === 'DELETE') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.deleteUsers(res);
    }

    // NO PATH
    else {
        console.log("Nu exista acest path!");
        userOps.noPath(req, res);
    }



}).listen(9000, (err) => {
    if (err) {
        res.statusCode = 500;
        res.setHeader('content-Type', 'Application/json');
        res.end("Serverul a picat! Ce ai facut?")
    } else console.log("Server running!");
});