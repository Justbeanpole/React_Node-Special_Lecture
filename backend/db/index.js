const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'kanban',
})

const getConnection = () => pool.getConnection(conn => conn)

module.exports = {
    getConnection
}