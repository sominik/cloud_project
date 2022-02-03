const Model = require('../Models/Model')
let model = new Model()
class Controller {
    constructor() {

    }

    
    compareSalesOf2Games(req, res) {
        model.compareSalesOf2Games(req, res);
    }

    
    compareTotalSalesOverAPeriod(req, res) {
        model.compareTotalSalesOverAPeriod(req, res);
    }

    compareSalesOf2PublisherOverAPeriod(req, res) {
        model.compareSalesOf2PublisherOverAPeriod(req, res);
    }

    compareSalesOfAllGenresOverAPeriod(req, res) {
        model.compareSalesOfAllGenresOverAPeriod(req, res);
    }

}

module.exports = Controller