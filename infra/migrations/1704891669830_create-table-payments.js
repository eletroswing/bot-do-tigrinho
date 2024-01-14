exports.up = async (pgm) => {
    await pgm.createTable('payments', {
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

      value: {
        type: 'float',
        notNull: true,
      },

      type: {
        type: 'text',
        default: 'DEPOSIT',
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
  };
  
  exports.down = async (pgm) => {
    await pgm.dropTable('payments');
  };