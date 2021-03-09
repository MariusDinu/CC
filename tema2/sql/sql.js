const config = require('../config/config');
const sql = require('mssql');
const qs = require('querystring');
module.exports.insertUser = (res, Name, Age, Job, check) => {

    var command = "INSERT INTO CC2 ( Name, Age ,Job)VALUES( '" + Name + "','" + Age + "','" + Job + "')";
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {
            if (check === 0) {
                res.end(`Post received : 
            Name:${JSON.stringify(Name)} ,
            Age:${JSON.stringify(Age)},
            Job:${JSON.stringify(Job)} `);
            } else {}
            conn.close();
        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });

}

module.exports.insertListUser = (req, res) => {
    var body = '';
    req.on('data', function(data) {
        body += data;

    });
    req.on('end', function() {
        if (body != '') {

            res.writeHead(200, { 'Content-Type': 'text/html' });
            var json = JSON.parse(body);

            json.users.forEach(element => {
                exports.insertUser(res, element.name, element.age, element.job, 1);
                console.log(element);

            });
            res.end(`Post received : ${JSON.stringify(json.users)}`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('Completati toate campurile! code 400');
        }
    });



}
module.exports.selectUsers = (res) => {

    var command = "select * from CC2";
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {

            if (JSON.stringify(recordSet.recordset) != null && JSON.stringify(recordSet.recordset) != '') {
                var response = [{
                        "message": "Here are the list of users "
                    },
                    recordSet.recordset
                ];
                res.statusCode = 200;
                res.setHeader('content-Type', 'Application/json');
            } else {
                var response = [{
                    "message": "Nu am gasit userul! Cod 404 "
                }];
                res.statusCode = 404;
                res.setHeader('content-Type', 'Application/json');
            }
            res.end(JSON.stringify(response));
            conn.close();

        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });

}
module.exports.selectUser = (res, id) => {
    console.log(id);
    var command = `select * from CC2 where Id='${id}'`;
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {

            if (recordSet.rowsAffected != 0) {
                var response = [{
                        "message": "Here are the list of users "
                    },
                    recordSet.recordset
                ];
                console.log(recordSet);
                res.statusCode = 200;
                res.setHeader('content-Type', 'Application/json');
            } else {
                var response = [{
                    "message": "Nu am gasit userul! Cod 404 "
                }];
                res.statusCode = 404;
                res.setHeader('content-Type', 'Application/json');
            }
            res.end(JSON.stringify(response));
            conn.close();

        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });

}


module.exports.deleteUser = (res, id) => {
    var command = `DELETE FROM CC2 where Id='${id}'`;
    var conn = new sql.ConnectionPool(config);

    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {
            if (recordSet.rowsAffected != 0) {
                var response = [{
                        "message": `Am sters userul cu id-ul ${id} `
                    }

                ];
                console.log(recordSet);
                res.statusCode = 200;
                res.setHeader('content-Type', 'Application/json');
            } else {
                var response = [{
                    "message": "Nu am gasit userul! Cod 404 "
                }];
                res.statusCode = 404;
                res.setHeader('content-Type', 'Application/json');
            }
            res.end(JSON.stringify(response));
            conn.close();
        })

    }).catch(function(err) {
        console.log(err);
    });




}


module.exports.deleteUsers = (res) => {

    var command = "DELETE FROM CC2";
    var conn = new sql.ConnectionPool(config);

    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {
            if (recordSet.rowsAffected != 0) {
                var response = [{
                        "message": `Am sters ${recordSet.rowsAffected} id-uri.  `
                    }

                ];

                res.statusCode = 200;
                res.setHeader('content-Type', 'Application/json');
            } else {
                var response = [{
                    "message": "Nu am gasit userul! Cod 404 "
                }];
                res.statusCode = 400;
                res.setHeader('content-Type', 'Application/json');
            }
            res.end(JSON.stringify(response));
            conn.close();
        })

    }).catch(function(err) {

    });


}

module.exports.updateUser = (res, id, Name) => {

    var command = `UPDATE CC2 SET Name = '${Name}' WHERE Id = '${id}'`;
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {
            if (recordSet.rowsAffected != 0)
                res.end(`Post received : 
            Name:${JSON.stringify(Name)} ,
             `);

            conn.close();
        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });

}

module.exports.updateUsers = (res, id, Name, Age, Job) => {

    console.log(id, Name, Age, Job);
    var command = `UPDATE CC2 SET Name = '${Name}',Age='${Age}',Job='${Job}' WHERE Id = '${id}'`;
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {
            if (recordSet.rowsAffected != 0)
                res.end(`Post received : 
            Name:${JSON.stringify(Name)} ,
            Age:${JSON.stringify(Age)} ,
            Job:${JSON.stringify(Job)}
             `);

            conn.close();
        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });



}