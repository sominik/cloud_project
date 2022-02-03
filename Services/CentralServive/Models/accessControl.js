database = require('../../../DataBase/database')
let connection;
let sqlitePath= "/opt/DataBase/UsersDB.db"
// let sqlitePath= "/home/somayehnikkhou/cloud_project/DataBase/UsersDB.db"
// let sqlitePath = "C:/Users/User/OneDrive/Desktop/cloud_project/cloud_project/Services/CentralServive/DataBase/UsersDb.db"

async function checkAccess(token) {
    try {
        if(token == undefined){
            throw "not authenticated!"
        }
        let userInfo = token.split("_");
        connection = await database.getConnection(sqlitePath)
        let query = `select * from "Users" where "username"='${userInfo[0]}' AND "NID"=${userInfo[1]} AND "id"= '${userInfo[2]}';`
        let result = await database.executeQueryGet(connection, query, [])
        if(result == ""){
            throw "authentication failed!"
        }
    } catch (err) {
        throw err
    }

}

module.exports={
    checkAccess
}