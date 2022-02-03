const sqlite3 = require('sqlite3')

function getConnection(dbFilePath) {
    return new Promise((resolve, reject) => {
        let connection = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                reject(JSON.stringify(err))
            } else {
                resolve(connection)
            }
        })
    })
}

function executeQueryGet(connection,query, params) {
    return new Promise((resolve, reject) => {
        connection.all(query, params, (err, result) => {
            if (err) {
                reject(JSON.stringify(err))
            } else {
                console.log(result)
                resolve(result)
            }
        })
    })
}

function executeQueryExec(connection, query) {
    try {
       return new Promise((resolve, reject) => {
        connection.exec(query, function (err, result) {
            if (err) {
                reject(JSON.stringify(err))
            } else {
                resolve(result)
            }
        })
    })  
    } catch (error) {
        console.log(error)
    }
   
}
async function executeQueryRun(connection,query, params) {
    try {
        return new Promise((resolve, reject) => {
            connection.run(query, params, function (err) {
                if (err) {
                    reject(err.message)
                } else {
                    // const res = this.changes ? [{
                    //     id: values[0]
                    // }] : []
                    resolve("ok")
                }
            })
        })
    } catch (err) {
        throw err.message
    }
}
module.exports = {
    executeQueryGet,
    executeQueryExec,
    executeQueryRun,
    getConnection
}