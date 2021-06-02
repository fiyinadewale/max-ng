const { Pool } = require('pg');
const connection = new Pool({
   user: 'hxtmkrdpflctmn',
   host: 'ec2-3-226-134-153.compute-1.amazonaws.com',
   database: 'd50p5uu9vhnvtt',
   password: '53521c654ce2044515d8c533afda61b1d27cc54c9dfc4b3e2ce2a7bc43456102',
   port: 5432,
   ssl: {
     rejectUnauthorized: false
   }
 });

 module.exports = connection;