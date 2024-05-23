const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");
const bcrypt = require("bcrypt")
const request = supertest(app);
require('dotenv').config();

describe("GET /token", () => {
    it("Token válido", async () => {
        const secretKey = process.env.TEST_SECRET_KEY

        app.use((req, res, next) => {
            req.secretKey = secretKey
            next()
        })

        const hashedPassword = await bcrypt.hash('12345678', 10);
        await db('users').insert({
            name: 'Teste',
            email: 'test@token.com',
            password: hashedPassword,
            verificationToken: 'token'
        });
    
        const ret = await request.post('/login')
          .send({
            email: 'test@token.com',
            password: '12345678'
          });
    
        const token = ret._body.token

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