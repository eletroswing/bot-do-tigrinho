const db = require(`../../infra/database`);

async function create(discord_id, value, win, win_value ) {
  if (!discord_id || !value ) return;

  const query = {
    text: `INSERT INTO games (user_id, value, win, win_value) VALUES ($1, $2, $3, $4)`,
    values: [discord_id, value, win, win_value],
  };

  return await db.query(query);
}

async function getAlllByDiscordId(discord_id ) {
  if (!discord_id ) return;

  const query = {
    text: `SELECT * FROM games WHERE user_id=$1`,
    values: [discord_id],
  };

  return await db.query(query);
}



module.exports = {
    create,
    getAlllByDiscordId
}