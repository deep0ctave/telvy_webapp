// backend/db/client.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({host:"quiz-databse-test-server.postgres.database.azure.com", user:"demouser", password:"avinash@400", database:"postgres", port:5432, ssl:true});

module.exports = pool;
