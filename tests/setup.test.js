const orchestrator = require(`./orchestrator`);
const db = require(`../infra/database`);

const setupService = require(`../services/setup.service`);

const userModel = require(`../models/user`);

expect.extend({
    toBeAnyDate(received) {
      const pass = received instanceof Date;
      return {
        pass,
        message: () =>
          `Expected ${received} to be an instance of Date.`,
      };
    },
    any(received) {
        const pass = true;
        return {
            pass,
            message: () =>
            `any can pass this`,
        }
    }
  });

beforeAll(async () => {
    await orchestrator.dropAllTables();
});

afterAll(async () => {
    await db.end()
})

test('Setup Service should throw error if user_id missing', () => {
    expect(setupService.CreateOrUpdate()).rejects.toThrow(`Missing args to createOrUpdate in setup service`)
})

test('Setup Service should throw error if pix missing', () => {
    expect(setupService.CreateOrUpdate(`some id`)).rejects.toThrow(`Missing args to createOrUpdate in setup service`)
})

test('Setup Service should throw error if cpf missing', () => {
    expect(setupService.CreateOrUpdate(`some id`, `some pix`)).rejects.toThrow(`Missing args to createOrUpdate in setup service`)
})

test('Everything is ok, but cpf is not in right format', async () => {
    const received = await setupService.CreateOrUpdate('some id', 'some pix', '00');
    expect(received).toEqual('O cpf informado(00) não é um cpf válido.');
})

test('Everything is ok, but cpf is not valid', async () => {
    const received = await setupService.CreateOrUpdate('some id', 'some pix', '000.000.000-00');
    expect(received).toEqual('O cpf informado(000.000.000-00) não é um cpf válido.');
})

test('Try to create a first time user', async () => {
    const response = await setupService.CreateOrUpdate(`user1`, `some pix`, `753.488.820-46`);
    const userCreated = await userModel.getByDiscordId(`user1`);
    expect(response).toEqual(`Sua chave pix foi configurada para some pix!`)
    expect(userCreated.rows).toStrictEqual([
        {
            id: expect.any(),
            user_id: 'user1',
            pix: 'some pix',
            cpf: '753.488.820-46',
            created_at: expect.toBeAnyDate(),
            updated_at: expect.toBeAnyDate()
          }
    ])
})

test('Try to update a user', async () => {
    await setupService.CreateOrUpdate(`user1`, `some pix`, `753.488.820-46`);
    const response = await setupService.CreateOrUpdate(`user1`, `some pix 2`, `753.488.820-46`);
    const userCreated = await userModel.getByDiscordId(`user1`);
    expect(response).toEqual(`Sua chave pix foi configurada para some pix 2!`)
    expect(userCreated.rows).toStrictEqual([
        {
            id: expect.any(),
            user_id: 'user1',
            pix: 'some pix 2',
            cpf: '753.488.820-46',
            created_at: expect.toBeAnyDate(),
            updated_at: expect.toBeAnyDate()
          }
    ])
})