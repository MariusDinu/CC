const config = require('../config');
const sql = require('mssql');

module.exports.insertMetrics = (statusCode, responseTime, startTime, url) => {

    var command = "INSERT INTO CC1 (Url, TimpStart, TimpRaspuns,StatusCode)VALUES( '" + url + "','" + startTime + "','" + responseTime + "','" + statusCode + "')";
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {

            conn.close();
        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });

}
module.exports.selectMetrics = (res) => {

    var command = "select * from CC1";
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function() {
        var request = new sql.Request(conn);
        request.query(command).then(function(recordSet) {
            res.end(JSON.stringify(recordSet));

            conn.close();

        }).catch(function(err) {
            console.log(err);
            conn.close();
        });
    }).catch(function(err) {
        console.log(err);
    });

}