const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.latest()
})

describe('POST /register', () => {
  it('Deve registrar um usuário', async (done) => {
    const response = await request.post('/register')
      .send({
        name: 'Teste',
        email: 'teste@exemplo.com',
        password: '12345678'
      });

    expect(response.status).toBe(201);

    const user = await db('users').where('email', 'teste@exemplo.com').first();
    expect(user).toBeTruthy();

    done()
  });

  it('Deve dar erro pois email já existe', async (done) => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Teste',
        email: 'teste@exemplo.com',
        password: '12345678'
      });

    expect(response.status).toBe(400);

    done()
  });

  it('Erro por dados inválidos', async (done) => {
    const response = await request(app)
      .post('/register')
      .send({
        name: '',
        email: '',
        password: ''
      });

    expect(response.status).toBe(404);

    done()
  });
});

afterAll(async () => {
  await db.destroy();
})
