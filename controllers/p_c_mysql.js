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
    findformData: function(name, col) {
        let _sql = `select * from CONSUMABLE_IN_PLAN where MECH_ID="${name}" and APPLICATION_COL="${col} ;`
        return allServices.query(_sql)
    },
    addformData: obj => {
        let _sql =
            'insert into CONSUMABLE_IN_PLAN set MECH_ID=?,APPLICATION_COL=?,USE_NUM=?,CHECK=?;'
        return allServices.query(_sql, obj)
    },
    findAllData: () => {
        let _sql = `select * from CONSUMABLE_IN_PLAN`
        return allServices.query(_sql)
    },
    Is_check: (id, col) => {
        let _sql = `call Ischeck('${id}','${col}')`
        console.log(_sql)
        return allServices.query(_sql)
    }
}

module.exports = allServices
