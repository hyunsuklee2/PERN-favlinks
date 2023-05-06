const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "hl19910723",
    host: "localhost",
    port: 5432,
    database: "myfavlinks"

})

module.exports = pool