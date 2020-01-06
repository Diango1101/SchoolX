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
    findDataFromPlan: id => {
        let _sql = `select USE_NUM from consumable_in_plan where mech_id=${id}`
        return allServices.query(_sql)
    },
    findDataFromReal: id => {
        let _sql = `select USENUM from consumable_num_in_real where mech_id=${id}`
        return allServices.query(_sql)
    }
}

module.exports = allServices
