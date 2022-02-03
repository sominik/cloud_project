let events = require('events');
const fs = require('fs')
const Server = require("../cloud_project/Server/index.js");
const Router = require("../cloud_project/Router/index.js");
let eventEmitter = new events.EventEmitter();
let router = new Router(eventEmitter)
const appDirectory = 'Services/';
readAllRoutes().then((r) => {
    router.setRoutes(r)
    console.log(r)
})
let server = new Server("0.0.0.0", 8080, router)
server.start()

async function readAllRoutes() {
    let routes = {}
    await fs.readdirSync(appDirectory).forEach(file => {
        for (const property in require('./' + appDirectory + file + '/index.js')) {
            routes[property] = require('./' + appDirectory + file + '/index.js')[property]
        }
    });
    return routes
}
