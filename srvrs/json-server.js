const jsonObj = require("../static/sample.json");

require('http')
    .createServer()
    .on('request', (req, res)=>{
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(jsonObj));
        res.end();
    })
    .listen(3000);