const fs = require('fs');
const stReplace = require('stream-replace');
const staticFilePath = "static/index.html";
const theRealMessage = "The real message!";
require('http')
    .createServer()
    .on('request', (req, res)=>{
        const stream = fs.createReadStream(staticFilePath);
        res.writeHead(200, {"Content-Type": "text/html"});
        stream.pipe(stReplace(/(\{message\})/,theRealMessage)).pipe(res);
        // fs.readFile(staticFilePath, (err, fResp)=>{
        //     if(err) {
        //         res.writeHead(500);
        //         res.write("Unable to read file");
        //     }
        //     else {
        //         
        //         res.write(fResp);
                
        //     }
        //     res.end();
        // });
    })
    .listen(3000);