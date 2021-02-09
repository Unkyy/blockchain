const {request } = require('http');
var qs = require("querystring");

const data = JSON.stringify({
    todo: 'Buy the milk',
})
var defaultoption = {
  "method": "POST",
  "hostname": "nodeserver",
  "port": "9001",
  "path": "/",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
  }
};


export class NodeServerConnection{
    private req: any
    private options: any
    constructor(options: any= defaultoption){
        this.options = options;
    }
    async send(data:object){
      return new Promise((resolve) => {
        this.req = request(this.options, function (res: any) {
          var chunks:any = [];
          res.on("data", function (chunk:any) {
            chunks.push(chunk);
          });
          res.on("error", ()=>{
            console.log("errrrrrrrrrr")
          })
          res.on("end", function () {
            var body = Buffer.concat(chunks);
              resolve(body.toString())
          });
        });
        this.req.write(qs.stringify(data));
        this.req.end();
      });
    }
}
