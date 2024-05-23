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

describe("orders", () => {
    it("sem token", async () => {
        const response = await request.post('/orders')
            .send({})

        expect(response.status).toBe(401)
    })
    it("token invalido", async () => {
        const response = await request.post('/orders')
            .send()
            .set('Authorization', 'jkaksjaksjdksaskdjskal')

        expect(response.status).toBe(403)
    })
    it("Adicionando pedido válido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test@orders.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test@orders.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const product = await db('products').first()

        const cartItems = [{
            name: product.name,
            quantity: 1,
            price: product.price,
            offerPrice: product.offerPrice,
            productId: product.id
        }]

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

        const response = await request.post('/orders')
            .send({ userId, cartItems, totalPrice, paymentMethod, shippingAddress })
            .set('Authorization', token)

        expect(response.status).toBe(201)
    })
    it("Adicionando pedido invalido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test2@orders.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test2@orders.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const product = await db('products').first()

        const cartItems = [{
            name: product.name,
            quantity: null,
            price: product.price,
            offerPrice: product.offerPrice,
            productId: product.id
        }]

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

        const response = await request.post('/orders')
            .send({ userId, cartItems, totalPrice, paymentMethod, shippingAddress })
            .set('Authorization', token)

        expect(response.status).toBe(500)
    })
    it("Adicionando pedido inválido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test3@orders.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const ret = await request.post('/login')
          .send({
            email: 'test3@orders.com',
            password: '12345678'
          });
    
        const token = ret._body.token

        const response = await request.post('/orders')
            .send({  })
            .set('Authorization', token)

        expect(response.status).toBe(404)
    })
    it("Buscando pedido válido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test4@orders.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test4@orders.com',
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

        await db('orders')
            .insert(order)

        const response = await request.get(`/orders/${userId}`)
            .set('Authorization', token)

        expect(response.status).toBe(200)
    })
    it("Buscando pedido inválido", async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        const user = await db('users')
        .returning('id')
        .insert({
            name: 'Teste',
            email: 'test5@orders.com',
            password: hashedPassword,
            verificationToken: 'token'
        });

        const userId = user[0].id

        const ret = await request.post('/login')
          .send({
            email: 'test5@orders.com',
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

        await db('orders')
            .insert(order)

        const response = await request.get(`/orders`)
          .set('Authorization', token)

        expect(response.status).toBe(404)
    })
})