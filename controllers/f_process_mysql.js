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
        let _sql = `select * from USE_OF_EQU where MECH_ID="${name}" and APPLICATION_COL="${col};`
        return allServices.query(_sql)
    },
    addformData: obj => {
        let _sql =
            'insert into USE_OF_EQU set MECH_ID=?,APPLICATION_COL=?,STATUS=?;'
        console.log(_sql)
        return allServices.query(_sql, obj)
    },
    findAllform: () => {
        let _sql = `select * from USE_OF_EQU;`
        return allServices.query(_sql)
    },
    findByStatus: status => {
        let _sql = `select * from USE_OF_EQU where STATUS = ${status}`
        return allServices.query(_sql)
    }
}

module.exports = allServices
