var http = require("http");
const { parse } = require("querystring");
const url = require('url');
var userOps = require('./controller.js');

http.createServer(function(req, res) {

    const queryObject = url.parse(req.url, true).query;
    const pathname = url.parse(req.url, true).pathname;



    // GET endpoints
    if (pathname == '/GET/users' && req.method === 'GET') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.getUsers(req, res);
    } else
    if (pathname == `/GET/user` && req.method === 'GET' && queryObject.id !== null && queryObject.id !== '') {
        console.log(`ID: ${queryObject.id} Request type: ` + req.method + ' Endpoint: ' + req.url);
        userOps.getUser(req, res, parseInt(queryObject.id));
    } else
    if (pathname == `/GET/user` && req.method === 'GET' && (queryObject.id == null || queryObject.id == '')) {
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
    if (pathname == '/PUT/user' && req.method === 'PUT' && queryObject.id !== null && queryObject.id !== '') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.updateUser(res, queryObject.id, queryObject.Name)
    } else
    if (pathname == '/PUT/users' && req.method === 'PUT' && queryObject.id !== null && queryObject.id !== '') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.updateUsers(req, res);
    }

    // DELETE endpoints
    else
    if (pathname == '/DELETE/user' && req.method === 'DELETE' && queryObject.id !== null && queryObject.id !== '') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        userOps.deleteUser(req, res, parseInt(queryObject.id))
    } else
    if (pathname == '/DELETE/user' && req.method === 'DELETE' && (queryObject.id == null || queryObject.id == '')) {
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
    if (err) console.log(err);
    else console.log("Server running!");
});