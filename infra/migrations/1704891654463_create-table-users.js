exports.up = async (pgm) => {
  await pgm.createTable('users', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
      unique: true,
    },

    user_id: {
      type: 'text',
      notNull: true,
    },

    pix: {
      type: 'text',
      notNull: true,
    },

    cpf: {
      type: 'text',
      notNull: true, 
    },

    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func("(now() at time zone 'utc')"),
    },

    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func("(now() at time zone 'utc')"),
    },
  });

  await pgm.addConstraint('users', 'users_uniqueness_fkey', 'UNIQUE ("user_id")');
};

exports.down = async (pgm) => {
  await pgm.dropConstraint('users', 'users_uniqueness_fkey');
  await pgm.dropTable('users');
};