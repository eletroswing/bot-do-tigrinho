const db = require(`../../infra/database`);

async function getById(id) {
  if (!id) return;

  const query = {
    text: `SELECT * FROM users WHERE id=$1`,
    values: [id],
  };

  return await db.query(query);
}

async function getByDiscordId(id) {
  if (!id) return;

  const query = {
    text: `SELECT * FROM users WHERE user_id=$1`,
    values: [id],
  };

  return await db.query(query);
}

async function create(discord_id, pix_key, cpf) {
  if (!discord_id || !pix_key || !cpf) return;

  const query = {
    text: `INSERT INTO users (user_id, pix, cpf) VALUES ($1, $2, $3)`,
    values: [discord_id, pix_key, cpf],
  };

  return await db.query(query);
}

async function update(discord_id, pix_key, cpf) {
  if (!discord_id || !pix_key || !cpf) return;

  const query = {
    text: `UPDATE users SET pix = $1, cpf = $3 WHERE user_id = $2`,
    values: [pix_key, discord_id, cpf],
  };

  return await db.query(query);
}

module.exports = {
    getById,
    getByDiscordId,
    create,
    update,
}