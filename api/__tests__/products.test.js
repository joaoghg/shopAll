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

describe("products", () => {
    it("sem token", async () => {
        const response = await request.get('/products')

        expect(response.status).toBe(401)
    })
    it("token invalido", async () => {
        const response = await request.get('/products')
            .set('Authorization', 'jkaksjaksjdksaskdjskal')

        expect(response.status).toBe(403)
    })
    it("Buscando produtos", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test@products.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test@products.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const response = await request.get(`/products`)
          .set('Authorization', token)

        expect(response.status).toBe(200)
    })
})