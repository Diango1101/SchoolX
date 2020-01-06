//a_c_u_mysql.js
var mysql = require('mysql')
var config = require('../defaultConfig')

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
        let _sql = `select * from CONSUMABLE_IN_REAL where ID="${name}";`
        return allServices.query(_sql)
    },
    addformData: obj => {
        let _sql =
            'insert into CONSUMABLE_IN_REAL set ID=?,DATE_OF_BORROW=?,NAME=?,FACTORY=?,WAREHOUSE=?,ITEM_USER=?;'
        console.log(_sql)
        console.log(obj)

        return allServices.query(_sql, obj)
    },
    findallDate: () => {
        let _sql = `select * from CONSUMABLE_IN_REAL`
        return allServices.query(_sql)
    }
}

module.exports = allServices
