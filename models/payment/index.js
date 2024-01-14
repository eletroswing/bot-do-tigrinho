const db = require(`../../infra/database`);

async function create(discord_id, value, type = `DEPOSIT`) {
  if (!discord_id || !value) return;

  const query = {
    text: `INSERT INTO payments (user_id, value, type) VALUES ($1, $2, $3)`,
    values: [discord_id, value, type],
  };

  return await db.query(query);
}

async function getBalanceFromUserByDiscordId(discord_id) {
  if (!discord_id) return;

  const query = {
    text: `SELECT
    user_id,
    SUM(CASE WHEN type IN ('DEPOSIT', 'EARNING') THEN value ELSE 0 END) -
    SUM(CASE WHEN type = 'CHECKOUT' THEN value ELSE 0 END) AS saldo
  FROM
    payments
  WHERE
    user_id = $1
  GROUP BY
    user_id;`,
    values: [discord_id],
  };

  return await db.query(query);
}

module.exports = {
  create,
  getBalanceFromUserByDiscordId,
};
