const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");
const bcrypt = require("bcrypt")
const request = supertest(app);

let token

beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    await db('users').insert({
        name: 'Teste',
        email: 'test@token.com',
        password: hashedPassword,
        verificationToken: 'token'
    });

    const response = await request.post('/login')
      .send({
        email: 'test@token.com',
        password: '12345678'
      });

    token = response.data.token
})

describe("GET /token", () => {
    it("Token válido", async () => {
        const response = await request.get(`/token/${token}`)

        expect(response.status).toBe(200)
    })
    it("Sem token", async () => {
        const response = await request.get(`/token`)

        expect(response.status).toBe(401)
    })
    it("Token inválido", async () => {
        const response = await request.get('/token/jskjdksajskdjska')

        expect(response.status).toBe(403)
    })
})