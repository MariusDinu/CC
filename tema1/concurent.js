 //require somewhere and use
 var async = require('async');
 var fetch = require("node-fetch");
 const request = 500;

 async.eachLimit(
     Array.from(Array(request).keys()),
     50,
     (index, callback) => {

         console.log("Se ruleaza requestul!");
         fetch("http://localhost:1234/Api", {
                 "method": "",
                 "headers": {
                     "Content-Type": "application/json"
                 },
                 // body: JSON.stringify({ url: "https://randomuser.me/api/" })
             }).then(res => res.json())
             .then(res => {
                 callback();
             })
             .catch(err => {

                 console.log(err);
                 callback();

             })

     }, (err) => {
         if (err) { console.log("err:", err); throw err; } else console.log("Function run Succes");

     });