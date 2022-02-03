const Model = require('../Models/Model')
let model = new Model()
class Controller {
    constructor() {

    }

    signUp(req, res) {
        model.signUp(req, res);
    }
}

module.exports = Controller