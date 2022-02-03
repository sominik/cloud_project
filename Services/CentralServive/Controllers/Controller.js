const Model = require('../Models/Model')
let model = new Model()
class Controller {
    constructor() {

    }

    getGameByRank(req, res) {
        model.getGameByRank(req, res);
    }

    getGameByName(req, res) {
        model.getGameByName(req, res);
    }

    getBestGamesOfPlatform(req, res) {
        model.getBestGamesOfPlatform(req, res);
    }

    getBestGamesOfYear(req, res) {
        model.getBestGamesOfYear(req, res);
    }

    getBestGamesByGenre(req, res) {
        model.getBestGamesByGenre(req, res);
    }

    getBestSellersGame(req, res) {
        model.getBestSellersGame(req, res);
    }
    getPopularGameOfEU(req, res) {
        model.getPopularGameOfEU(req, res);
    }
}

module.exports = Controller