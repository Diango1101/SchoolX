//a_frommysql.js
var mysql = require('mysql')
var config = require('./defaultConfig')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

let allServices = {
    query: function(sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    },
    findformData: function(name) {
        let _sql = `select * from APPLICATION where APPLICATION_ID="${name}";`
        return allServices.query(_sql)
    },
    addformData: obj => {
        let _sql =
            'insert into APPLICATION set APPLICATION_ID=?,ITEM_NAME=?,REASON=?;'
        return allServices.query(_sql, obj)
    },
    findAllForm: function() {
        let _sql = `select * from APPLICATION;`
        return allServices.query(_sql)
    }
}

module.exports = allServices
