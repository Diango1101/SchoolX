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
        let _sql = `select * from timetable_of_lab where ROOM_OF_LAB="${name}";`
        return allServices.query(_sql)
    },
    addformData: obj => {
        let _sql =
            'insert into timetable_of_lab set ROOM_OF_LAB=?,USE_TIME=?,LAB_USER=?;'
        return allServices.query(_sql, obj)
    },
    findAllData: () => {
        let _sql = `select * from timetable_of_lab order by USE_TIME`
        return allServices.query(_sql)
    },
    DeleteformData: function(name) {
        let _sql = `delete from timetable_of_lab where ROOM_OF_LAB="${name}";`
        return allServices.query(_sql)
    }
}

module.exports = allServices
