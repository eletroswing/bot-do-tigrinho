const dotenv = require('dotenv');
dotenv.config();

const { Client } = require('pg');

const client = new Client({
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
});
client.connect();

async function query(query) {
    const result = await client.query(query); 
    return result;
}

async function end() {
  await client.end(); 
}

module.exports = {
  query,
  end
};
