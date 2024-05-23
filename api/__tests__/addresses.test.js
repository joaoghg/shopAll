const db = require('../config/db');
const app = require("../server");
const supertest = require("supertest");
const bcrypt = require("bcrypt")
const request = supertest(app);
require('dotenv').config();

const secretKey = process.env.TEST_SECRET_KEY

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
})