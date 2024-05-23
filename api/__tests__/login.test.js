const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");
const bcrypt = require("bcrypt")

const request = supertest(app);
beforeAll(async () => {
  const hashedPassword = await bcrypt.hash('12345678', 10);
  await db('users').insert({
    name: 'Teste',
    email: 'test@login.com',
    password: hashedPassword,
    verificationToken: 'token'
  });
});

describe('POST /login', () => {

  it('login', async () => {
    const response = await request.post('/login')
      .send({
        email: 'test@login.com',
        password: '12345678'
      });

    expect(response.status).toBe(200);
  });

  it('senha invalida', async () => {
    const response = await request.post('/login')
      .send({
        email: 'test@login.com',
        password: 'errada'
      });

    expect(response.status).toBe(401);
  });

  it('email invalido', async () => {
    const response = await request.post('/login')
      .send({
        email: '',
        password: '12345678'
      });

    expect(response.status).toBe(404);
  });

  it('senha invalida', async () => {
    const response = await request.post('/login')
      .send({
        email: 'test@login.com',
        password: ''
      });

    expect(response.status).toBe(404);
  });
});
