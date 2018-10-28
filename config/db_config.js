const mysql         = require('anytv-node-mysql');
                      require('dotenv').config();

mysql.add('criminal_db',{
  host : process.env.MYSQL_HOST,
  user : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

exports.module = mysql;