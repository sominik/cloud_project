const Controller = require('../Controllers/Controller.js')
let controller = new Controller()
module.exports = {
    '/analysis/compareSalesOf2Games': {
        POST: controller.compareSalesOf2Games,
    },
    '/analysis/compareTotalSalesOverAPeriod': {
        POST: controller.compareTotalSalesOverAPeriod,
    },
    '/analysis/compareSalesOf2PublisherOverAPeriod': {
        POST: controller.compareSalesOf2PublisherOverAPeriod,
    },
    '/analysis/compareSalesOfAllGenresOverAPeriod': {
        POST: controller.compareSalesOfAllGenresOverAPeriod,
    }
}