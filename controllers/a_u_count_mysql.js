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
        let _sql = `select * from CONSUMABLE_NUM_IN_REAL where MECH_ID="${name} and APPLICATION_COL="${col}";`
        return allServices.query(_sql)
    },
    addformData: obj => {
        let _sql =
            'insert into CONSUMABLE_NUM_IN_REAL set MECH_ID=?,APPLICATION_COL=?,TOTLENUM=?,USENUM=?;'
        return allServices.query(_sql, obj)
    },
    findAllData: () => {
        let _sql = `select * from CONSUMABLE_NUM_IN_REAL`
        return allServices.query(_sql)
    },
    AddUseNum: (id, col) => {
        let _sql = `call usenum_add('${id}','${col}')`
        console.log(_sql)
        return allServices.query(_sql)
    }
}

module.exports = allServices
