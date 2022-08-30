const pg = require('pg');
const ClientClass = pg.Client
const pgUrl = "postgres://asmlztcc:m_gSxwvBV_YOoJw_bbWfGRjYY6J5i8MY@tyke.db.elephantsql.com/asmlztcc"
const client = new ClientClass(pgUrl)
module.exports = client


async function connect (client) {
  try {
    await client.connect()
    console.log('Client connected')

    const {rows} = await client.query('SELECT * FROM users')
    console.table(rows)
    await client.end()
  }
  catch (ex){
    console.log("Some error" +  ex);
  }

finally {
  await client.end()
}
}
connect (client)

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