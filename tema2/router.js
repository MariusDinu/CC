var router = require('routes')();
router.addRoute('/GET/:name', function(req, res, params) {
    console.log(params.name);
    res.end('Hello there, ' + params.name + '\n');

});