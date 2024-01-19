const dotenv = require('dotenv');
dotenv.config();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
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
