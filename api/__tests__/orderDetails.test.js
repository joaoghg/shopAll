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
        const response = await request.get('/orderDetails')

        expect(response.status).toBe(401)
    })
    it("token invalido", async () => {
        const response = await request.get('/orderDetails')
            .set('Authorization', 'jkaksjaksjdksaskdjskal')

        expect(response.status).toBe(403)
    })
    it("Buscando pedido válido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test@orderdetails.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test@orderdetails.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const product = await db('products').first()

        const totalPrice = product.offerPrice ? product.offerPrice : product.price
        const paymentMethod = 'cash'

        const address = {
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
        }

        const add = await db('addresses')
            .returning('id')
            .insert(address)

        const shippingAddress = add[0].id

        const order = {
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            userId: userId,
            addressId: shippingAddress
        }
    
        const resp = await db('orders')
            .returning('id')
            .insert(order)

        const orderId = resp[0].id

        const item = {
            name: product.name,
            quantity: 1,
            price: product.offerPrice ? product.offerPrice : product.price,
            orderId: orderId,
            productId: product.id
        }

        await db('order_products')
            .insert(item)

        const response = await request.get(`/orderDetails/${orderId}`)
            .set('Authorization', token)

        expect(response.status).toBe(200)
    })
    it("Busando pedido inválido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test2@orderdetails.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test2@orderdetails.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const response = await request.get('/orderDetails')
          .set('Authorization', token)

        expect(response.status).toBe(404)
    })
})