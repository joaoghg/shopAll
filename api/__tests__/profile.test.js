const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");
const bcrypt = require("bcrypt")
const request = supertest(app);
require('dotenv').config();

const secretKey = process.env.TEST_SECRET_KEY

app.use((req, res, next) => {
    req.secretKey = secretKey
    next()
})

describe("orderDetails", () => {
    it("sem token", async () => {
        const response = await request.get('/profile')

        expect(response.status).toBe(401)
    })
    it("token invalido", async () => {
        const response = await request.get('/profile')
            .set('Authorization', 'jkaksjaksjdksaskdjskal')

        expect(response.status).toBe(403)
    })
    it("Buscando usuário válido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test@profile.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test@profile.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const response = await request.get(`/profile/${userId}`)
          .set('Authorization', token)

        expect(response.status).toBe(200)
    })
    it("Buscando usuário inválido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test2@profile.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const ret = await request.post('/login')
          .send({
            email: 'test2@profile.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const response = await request.get(`/profile`)
          .set('Authorization', token)

        expect(response.status).toBe(404)
    })
})