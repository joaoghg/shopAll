const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.latest()

})

describe('POST /login', () => {
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    await db('users').insert({
      name: 'Teste',
      email: 'test2@exemplo.com',
      password: hashedPassword,
      verificationToken: 'token'
    });
  });

  it('login', async (done) => {
    const response = await request.post('/login')
      .send({
        email: 'test2@exemplo.com',
        password: '12345678'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();

    done()
  });

  it('senha invalida', async (done) => {
    const response = await request.post('/login')
      .send({
        email: 'test2@exemplo.com',
        password: 'errada'
      });

    expect(response.status).toBe(401);

    done()
  });

  it('email invalido', async (done) => {
    const response = await request.post('/login')
      .send({
        email: '',
        password: '12345678'
      });

    expect(response.status).toBe(500);

    done()
  });
});

afterAll(async () => {
  await db.destroy();
})
