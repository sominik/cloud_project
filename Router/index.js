class Router {
    result = {reqId: 0, statusCode: 400};
    routes = {}
    emitter = {}

    constructor(emitter) {
        this.emitter = emitter;
        this.emitRoutersOnServers()
    }

    addRoute(route, method, handler) {
        if (!this.routes.hasOwnProperty(route)) {
            this.routes[route] = {}
        }
        this.routes[route][method] = handler;
    }

    emitRoutersOnServers() {
        this.emitter.on ('newReq', (req, res) => {
            console.log(req.url)
            let myUrl= req.url.split('?')[0];
            if (this.routes.hasOwnProperty(myUrl) && this.routes[myUrl].hasOwnProperty(req.requestMethod)) {
                this.routes[myUrl][req.requestMethod](req, res);
                this.result.reqId = req.reqId
                this.result.statusCode = 200;
            } else {
                this.result.reqId = req.reqId
                this.result.statusCode = 400
            }
            this.emitter.emit('response', this.result , res)
        });
    }

    setRoutes(routes) {
        this.routes = routes
    }

}

module.exports = Router
