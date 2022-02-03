let events = require('events');
let uuid = require('uuid')
let obj = {};

let eventEmitter ={};

class Server {
    reqMap = {}
    hostName = "";
    PORT = 8080;
    router = {}

    constructor(hostName, PORT, router) {
        this.hostName = hostName;
        this.PORT = PORT;
        this.router = router
        eventEmitter = router.emitter
    }

    start() {
        require('http').createServer((req, res) => {
            let token= req.headers["token"];
            let url = req.url
            let reqId = uuid.v4()
            this.reqMap[reqId] = {req, res};
            let requestMethod = req.method;
            if (requestMethod === 'GET') {
                eventEmitter.emit("newReq", {url, reqId, requestMethod},res);
            } else {
                req.on('data', function (data) {
                    console.log(data.toString())
                    obj = JSON.parse(data.toString());
                    eventEmitter.emit("newReq", {url, reqId, obj, requestMethod, token} ,res);
                })
            }

        }).listen(this.PORT, this.hostName, () => {
            console.log('server created successfully!')
        })

        eventEmitter.on("response", (result , res)=> {
            if (result.statusCode === 200) {
                delete this.reqMap[result.reqId];
            } else {
                delete this.reqMap[result.reqId];
            }
        });

    }

}


module.exports = Server