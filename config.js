const dbConfig = {
    database : process.env.DBNAME, //"test_tb",
    username : process.env.USERNAME, //"tappu",
    password : process.env.PASSWORD, //"tappu",
    host : process.env.HOST, //"localhost",
    port : process.env.DBPORT, //5432,
    type : process.env.DBTYPE, //"postgres"
}
module.exports = { dbConfig: dbConfig }