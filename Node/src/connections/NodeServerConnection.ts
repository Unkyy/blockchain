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
    constructor(options: any= defaultoption){
        const test = () =>{
          console.log('szszszs')
          this.req = request(options, function (res: any) {
            var chunks:any = [];
          
            res.on("data", function (chunk:any) {
              chunks.push(chunk);
            });
            res.on("error", ()=>{
              console.log("errrrrrrrrrr")
              test()
            })
            res.on("end", function () {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
            });
          });
        }
        test()
      }
      send(data:object){
        console.log("call")
        this.req.write(qs.stringify(data));
        this.req.end();
      }
}
