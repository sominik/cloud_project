const Controller = require('../Controllers/Controller.js')
let controller = new Controller()
module.exports = {
    '/signUp': {
        POST: controller.signUp,
    }
}