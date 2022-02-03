database = require('../../../DataBase/database')
let connection;
let sqlitePath= "/opt/DataBase/GamesDB.db"
// let sqlitePath= "/home/somayehnikkhou/cloud_project/DataBase/GamesDB.db"

// let sqlitePath= "E:/darsi/term 7/rayanesh/cloud_project/DataBase/GamesDB.db"
// let sqlitePath = "C:/Users/User/Downloads/cloud_project/cloud_project/Services/CentralServive/DataBase/GamesDB.db"

function _databaseErrorMessage(response, error) {
    console.log(error);
    response.writeHead(501, {
        "Content-Type": "text/html"
    });
    response.end("database error!");
}

function _successfullMessage(response, message) {
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.end(message);
}
class Model {
    constructor() {}

    async compareSalesOf2Games(req, response) {
        try {
            let game1Name = req.obj.game1Name;
            let game2Name = req.obj.game2Name;
            connection = await database.getConnection(sqlitePath)
            let query1 = `select Name, NA_Sales,EU_Sales, JP_Sales, Other_Sales, Global_Sales from "gamesSales" where "Name" = '${game1Name}' LIMIT 1;`
            let result1 = await database.executeQueryGet(connection, query1, [])
            let query2 = `select Name, NA_Sales,EU_Sales, JP_Sales, Other_Sales, Global_Sales from "gamesSales" where "Name" = '${game2Name}' LIMIT 1;`
            let result2 = await database.executeQueryGet(connection, query2, [])
            let result= {
                [game1Name]: result1,
                [game2Name]: result2
            }
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }

    }

    async compareTotalSalesOverAPeriod(req, response) {
        try {
            let startYear = req.obj.startYear;
            let endYear = req.obj.endYear;
            connection = await database.getConnection(sqlitePath)
            let query = `SELECT Year, Sum(NA_Sales + EU_Sales + JP_Sales + Global_Sales + Other_Sales) AS [Sales_Sum] from "gamesSales" where "Year" >= ${startYear} AND "Year" <= ${endYear} GROUP BY "Year";'`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async compareSalesOf2PublisherOverAPeriod(req, response) {
        try {
            let startYear = req.obj.startYear;
            let endYear = req.obj.endYear;
            let publisher1 = req.obj.publisher1;
            let publisher2 = req.obj.publisher2;
            connection = await database.getConnection(sqlitePath)
            let query1 = `SELECT Year, Publisher, Sum(NA_Sales + EU_Sales + JP_Sales + Global_Sales + Other_Sales) AS [Sales_Sum] from "gamesSales" where "Year" >= ${startYear} AND "Year" <= ${endYear} AND "Publisher" == '${publisher1}' GROUP BY "Year", "Publisher";`
            let result1 = await database.executeQueryGet(connection, query1, [])
            let query2 = `SELECT Year, Publisher, Sum(NA_Sales + EU_Sales + JP_Sales + Global_Sales + Other_Sales) AS [Sales_Sum] from "gamesSales" where "Year" >= ${startYear} AND "Year" <= ${endYear} AND "Publisher" == '${publisher2}' GROUP BY "Year", "Publisher";`
            let result2 = await database.executeQueryGet(connection, query2, [])
            let result= {
                [publisher1]: result1,
                [publisher2]: result2
            }
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

    async compareSalesOfAllGenresOverAPeriod(req, response) {
        try {
            let startYear = req.obj.startYear;
            let endYear = req.obj.endYear;
            connection = await database.getConnection(sqlitePath)
            let query = `SELECT Genre, Sum(NA_Sales + EU_Sales + JP_Sales + Global_Sales + Other_Sales) AS [Sales_Sum] from "gamesSales" where "Year" >= ${startYear} AND "Year" <= ${endYear} GROUP BY "Genre";`
            let result = await database.executeQueryGet(connection, query, [])
            _successfullMessage(response, JSON.stringify(result))
        } catch (err) {
            _databaseErrorMessage(response, err)
        }
    }

}

module.exports = Model