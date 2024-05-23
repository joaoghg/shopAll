const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

describe('POST /register', () => {
  it('Deve registrar um usuário', async () => {
    const response = await request.post('/register')
      .send({
        name: 'Teste',
        email: 'teste@exemplo.com',
        password: '12345678'
      });

    expect(response.status).toBe(201);

    const user = await db('users').where('email', 'teste@exemplo.com').first();
    expect(user).toBeTruthy();
  });

  it('Deve dar erro pois email já existe', async () => {
    await db('users').insert({
      name: 'User',
      email: 'emailuser4@email.com',
      password: '12345678',
      verificationToken: 'token'
    });

    const response = await request.post('/register')
      .send({
        name: 'User',
        email: 'emailuser4@email.com',
        password: '12345678'
      });

    expect(response.status).toBe(400);
  });

  it('Erro por dados inválidos', async () => {
    const response = await request.post('/register')
      .send({
        name: '',
        email: '',
        password: ''
      });

    expect(response.status).toBe(404);
  });
});
