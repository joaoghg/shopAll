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

describe("addresses", () => {
    it("sem token", async () => {
        const response = await request.post('/addresses')
            .send({
                userId: 1,
                addresss: {}
            })

        expect(response.status).toBe(401)
    })
    it("token invalido", async () => {
        const response = await request.post('/addresses')
            .send({
                userId: 1,
                addresss: {}
            })
            .set('Authorization', 'jkaksjaksjdksaskdjskal')

        expect(response.status).toBe(403)
    })
    it("Adicionando endereço válido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test@address.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test@address.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const response = await request.post('/addresses')
            .send({
                name : 'teste',
                mobileNumber: '123456789',
                houseNumber: null,
                street: 'rua',
                landmark: 'complemento',
                cep: '17280000',
                userId: userId,
                city: 'cidade',
                country: 'pais',
                state: 'estado',
                neighborhood: 'centro'
            })
            .set('Authorization', token)
    })
})