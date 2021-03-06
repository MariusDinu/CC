const url = require('url');
const fs = require('fs')
let jsonData = JSON.parse(fs.readFileSync('./config/users.json', 'utf-8'))
const qs = require('querystring');
const tabelData = require('./sql/sql');


exports.getUsers = function(req, res) {
    const reqUrl = url.parse(req.url, true)
    tabelData.selectUsers(res);
}

exports.getUser = function(req, res, id) {

    const reqUrl = url.parse(req.url, true)

    if (id == undefined) {
        var response = [{
            "message": "Id-ul userului nu este corect scris! Cod 404 "
        }];
        res.statusCode = 404;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response));
    } else {
        tabelData.selectUser(res, id);
    }
}

exports.createUser = function(req, res) {
    var header = req.headers['content-type'];
    if (header === 'application/x-www-form-urlencoded') {
        var body = '';
        req.on('data', function(data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function() {
            if (body != '') {
                console.log("Body: " + body);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                var json = qs.parse(body);
                var name = json.name;
                var age = json.age;
                var job = json.job;
                var check = 0;
                tabelData.insertUser(res, name, age, job, check);

            } else {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('Completati toate campurile! code 400');
            }
        });
    } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Format gresit a datelor! code 500');
    }
}

exports.createLista = function(req, res) {
    var header = req.headers['content-type'];
    if (header === 'application/json') {
        tabelData.insertListUser(req, res);
    } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Format gresit a datelor! code 500');
    }
}

exports.deleteUsers = function(res) {
    tabelData.deleteUsers(res);
}


exports.deleteUser = function(req, res, id) {

    const reqUrl = url.parse(req.url, true)

    tabelData.deleteUser(res, id);
}

exports.noPath = function(req, res) {
    var response = [{
        "message": "Nu exista acest path! Cod 400"
    }];
    res.statusCode = 400;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))

}
exports.noID = function(req, res) {
    var response = [{
        "message": "Nu se poate cu id empty! Cod 400"
    }];
    res.statusCode = 400;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))

}

exports.updateUser = function(res, id, Name) {

    tabelData.updateUser(res, id, Name);


}


exports.updateUsers = function(req, res) {




    var header = req.headers['content-type'];
    if (header === 'application/x-www-form-urlencoded') {
        var body = '';
        req.on('data', function(data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function() {
            if (body != '') {
                console.log("Body: " + body);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                var json = qs.parse(body);


                var id = json.Id;
                var name = json.Name;
                var age = json.Age;
                var job = json.Job;

                tabelData.updateUsers(res, id, name, age, job);

            } else {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('Completati toate campurile! code 400');
            }
        });
    } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Format gresit a datelor! code 500');
    }
}