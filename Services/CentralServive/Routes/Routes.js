const Controller = require('../Controllers/Controller.js')
let controller = new Controller()
module.exports = {
    '/game/getGameByRank': {
        POST: controller.getGameByRank,
    },
    '/game/getGameByName': {
        POST: controller.getGameByName,
    },
    '/game/getBestGamesOfPlatform': {
        POST: controller.getBestGamesOfPlatform,
    },
    '/game/getBestGamesOfYear': {
        POST: controller.getBestGamesOfYear,
    },
    '/game/getBestGamesByGenre': {
        POST: controller.getBestGamesByGenre,
    },
    '/game/getBestSellersGame': {
        POST: controller.getBestSellersGame,
    },
    '/game/getPopularGameOfEU': {
        POST: controller.getPopularGameOfEU,
    }
}