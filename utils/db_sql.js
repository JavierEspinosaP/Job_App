const { Pool } = require('pg');
const pool = new Pool({
    url:process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  })  

  module.exports = pool;



// let postgressUrl = "postgres://asmlztcc:m_gSxwvBV_YOoJw_bbWfGRjYY6J5i8MY@tyke.db.elephantsql.com/asmlztcc" 
// let users = new Pool(postgressUrl);

// users.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   users.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     users.end();
//   });
// });