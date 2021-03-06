const http = require('http');
const metrics = require('./utils/sql');
const key = require('./utils/api.js');
const fetch = require('node-fetch');

http.createServer((req, res) => {

    const startTime = new Date();

    res.on('finish', () => {
        const responseTime = new Date() - startTime;
        metrics.insertMetrics(res.statusCode, responseTime, startTime, req.url);
    });
    if (req.url == '/Api') {
        const url1 = "https://randomuser.me/api/"

        fetch(url1).then(resp => resp.json()).then(resp => {
            var name = resp.results[0].name.first;
            const url2 = "https://api.agify.io/?name=" + name;
            console.log(name);
            if (name != " ") {
                fetch(url2).then(resp => resp.json()).then(resp => {
                    var age = resp.age;
                    //const url3 = 'http://api.icndb.com/jokes/random?firstName=' + name + '&lastName=' + age;
                    /* fetch(url3).then(resp => resp.json()).then(resp => {
                         res.statusCode = 200;
                         res.setHeader("Content-Type", "application/json");
                         res.end(JSON.stringify(resp));


                     }).catch(err => {
                         console.error(err);*/
                    fetch("https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=Condescending-Wonka&bottom=Bottom%20" + name + "&top=Top%20" + age + "&font_size=50&font=Impact", {
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-key": key.key,
                                "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com"
                            }
                        }).then(respon => {

                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            console.log(respon);
                            res.end(JSON.stringify(respon.body));
                        })
                        .catch(err => {
                            console.error(err);
                        });


                }).catch(err => {
                    // console.error(err);
                })
            }

        }).catch(err => {
            // console.error(err);
        })
    }
    if (req.url == '/metrics') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        metrics.selectMetrics(res);
    }

}).listen(1234, (err) => {
    if (err) console.log(err);
    else console.log("Server running!");
})