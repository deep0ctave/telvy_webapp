// backend/db/client.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({host:"quiz-databse-test-server.postgres.database.azure.com", user:"demouser", password:"{your_password}", database:"postgres", port:5432, ssl:true});

module.exports = pool;
