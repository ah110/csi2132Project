

const { Pool } = require('pg');
const dotenv = require('dotenv');
const connection = 'postgres://postgres:123456@localhost:5432/csi2132project';
dotenv.config();

const pool = new Pool({
  connectionString: connection
});

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err)
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('connect')
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};