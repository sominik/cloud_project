database = require('../../../DataBase/database')
accessControl = require('./accessControl.js')
let connection;
let sqlitePath= "/opt/DataBase/GamesDB.db"
// let sqlitePath= "/home/somayehnikkhou/cloud_project/DataBase/GamesDB.db"

// let sqlitePath= "E:/darsi/term 7/rayanesh/cloud_project/DataBase/GamesDB.db"
// let sqlitePath = "C:/Users/User/OneDrive/Desktop/cloud_project/DataBase/GamesDB.db"



function _databaseErrorMessage(response, error) {
    console.log(error);
    response.writeHead(501, {
        "Content-Type": "text/html"
    });
    response.end(error);
}

function _successfullMessage(response, message) {
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.end(message);
}
class Model {
    constructor() {}

    async getGameByRank(req, response) {
        try {
            let rank = req.obj.rank
            let token = req.token
            await accessControl.checkAccess(token)
            connection = await database.getConnection(sqlitePath)
            let query = `select * from "gamesSales" where "Rank"=${rank}`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }

    }

    async getGameByName(req, response) {
        try {
            let token = req.token
            await accessControl.checkAccess(token)
            let name = req.obj.name;
            connection = await database.getConnection(sqlitePath)
            let query = `select * from "gamesSales" where "Name" like '%${name}%'`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async getBestGamesOfPlatform(req, response) {
        try {
            let token = req.token
            await accessControl.checkAccess(token)
            let platform = req.obj.platform;
            let count = req.obj.count;
            connection = await database.getConnection(sqlitePath)
            let query = `select  * from "gamesSales" where "Platform" = '${platform}' limit ${count};`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async getBestGamesOfYear(req, response) {
        try {
            let token = req.token
            await accessControl.checkAccess(token)
            let year = req.obj.year;
            let count = req.obj.count;
            connection = await database.getConnection(sqlitePath)
            let query = `select  * from "gamesSales" where "Year" = ${year} limit ${count};`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async getBestGamesByGenre(req, response) {
        try {
            let token = req.token
            await accessControl.checkAccess(token)
            let genre = req.obj.genre;
            let count = req.obj.count;
            connection = await database.getConnection(sqlitePath)
            let query = `select  * from "gamesSales" where "Genre" = '${genre}' limit ${count};`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async getBestSellersGame(req, response) {
        try {
            let token = req.token
            await accessControl.checkAccess(token)
            let platform = req.obj.platform;
            let year = req.obj.year;
            connection = await database.getConnection(sqlitePath)
            let query = `select * from "gamesSales" where "Year" = ${year} and "Platform" = '${platform}' order by "Global_Sales" desc limit 5`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async getPopularGameOfEU(req, response) {
        try {
            let token = req.token
            let year= req.obj.year;
            await accessControl.checkAccess(token)
            connection = await database.getConnection(sqlitePath)
            let query = `select * from "gamesSales" where "EU_Sales" > "NA_Sales" and "Year"=${year}`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

}

module.exports = Model