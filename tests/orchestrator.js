const db = require(`../infra/database`);

async function dropAllTables(){
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM payments');
    await db.query('DELETE FROM games');
} 

module.exports = {
    dropAllTables
}