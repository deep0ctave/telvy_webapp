// backend/db/client.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: "quizapp-testing-db.postgres.database.azure.com",
  user: "demonuser",
  password: "avinash@1234",
  database: "postgres",
  port: 5432,
  ssl: true,
});

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "avi@400",
//   database: "telvy_db",
//   port: 5432,
// });

module.exports = pool;
