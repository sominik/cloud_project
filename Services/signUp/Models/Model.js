database = require('../../../DataBase/database')
// let sqlitePath= "/opt/DataBase/UsersDB.db"
let sqlitePath= "/home/somayehnikkhou/cloud_project/DataBase/UsersDB.db"

const uuid = require('uuid');

let connection


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

    async  signUp(req, response) {
        try {
            let username= req.obj.username;
            let NID= req.obj.NID;
             let id = uuid();
            connection = await database.getConnection(sqlitePath)
            console.log(connection)
            let query = `insert into "Users" (username,NID,id ) values(?,?,?) `
            let result = await database.executeQueryRun(connection, query, [username, NID,id])
            _successfullMessage(response,"user added. with uuid: "+id)
        } catch (err) {
            throw err
        }
    
    }

}

module.exports = Model

