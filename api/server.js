const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const db = require("./config/db")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const cors = require("cors")
const bcrypt = require("bcrypt")
require('dotenv').config();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const jwt = require("jsonwebtoken")

//Início das funções
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from:"shopAll.com",
    to:email,
    subject:"Verificação de Email",
    text:`Por favor, clique no link abaixo para verificar seu email : https://shopall-fgr8.onrender.com/verify/${verificationToken}`
  }

  try{
    await transporter.sendMail(mailOptions)
  }catch (error){
    console.log("Erro enviando o email de verificação", error)
  }
}
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex")
}
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' })
      }
      next()
    })
  } else {
    res.status(401).json({ message: 'Token não informado' })
  }
};

//Início das rotas
//Rota de registro
app.post("/register", async (req, res) => {
  try{
    const { name, email, password } = req.body

    if(!name || !email || !password){
      return res.sendStatus(404)
    }

    const existingUser = await db('users').where('email', email).first()
    if(existingUser){
      return res.status(400).json({message: "Esse email já foi registrado"})
    }

    const verificationToken = crypto.randomBytes(20).toString("hex")
    const hashedPassword = await bcrypt.hash(password, 10);

    await db('users')
      .insert({
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
        verificationToken: verificationToken
      })

    sendVerificationEmail(email, verificationToken)
    res.status(201).json({message: "Usuário cadastrado"})
  }catch(error){
    console.log("Erro cadastrando usuario", error)
    res.status(500).json({message: "Erro durante o cadastro"})
  }
})

//Rota para verificar o email
app.get("/verify/:token", async (req, res) => {
  try{
    const token = req.params.token

    const user = await db('users').where('verificationToken', token).first()
    if(!user){
      return res.status(404).json({message: "Token inválido"})
    }

    await db('users')
      .where('id', user.id)
      .update({ verified: true, verificationToken: null })

    res.status(200).json({message: "Email verificado com sucesso"})
  }catch (error){
    res.status(500).json({message: "Verificação do email falhou"})
  }
})

const secretKey = generateSecretKey()

//Rota de login
app.post("/login", async (req, res) => {
  try{
    const {email, password} = req.body

    if(!email || !password){
      return res.sendStatus(404)
    }

    const user = await db('users').where('email', email).first()
    if(!user){
      return res.status(401).json({message: "Credenciais inválidas"})
    }

    if(!await bcrypt.compare(password, user.password)){
      return res.status(401).json({message: "Credenciais inválidas"})
    }

    const token = jwt.sign({userId: user.id}, req.secretKey ? req.secretKey : secretKey)

    res.status(200).json({token})
  }catch(error){
    res.status(500).json({message: "Não foi possível fazer login"})
  }
})

//Rota para verificar token
app.get('/token/:token', (req, res) => {
  try{
    const token = req.params.token

    if(!token) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    jwt.verify(token, req.secretKey ? req.secretKey : secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' })
      }
    })

    res.status(200).json({ message: 'Token válido' })
  }catch(error){
    res.status(500).json({ message: 'Erro ao validar token' })
  }
})

app.use(authenticateJWT)

//Rota para salvar endereço
app.post("/addresses", async (req, res) => {
  try{
    const { userId, address } = req.body

    const user = await db('users').where('id', userId).first()
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado"})
    }

    await db('addresses')
      .insert(address)

    res.status(201).json({ message: "Endereço adicionado" })
  }catch(error){
    res.status(500).json({ message: "Erro adicionando endereço" })
  }
})

//Rota para excluir endereço
app.delete("/addresses/:id", async (req, res) => {
  try{
    const { id } = req.params

    await db('addresses')
      .where('id', id)
      .del()

    res.status(201).json({ message: "Endereço excluído" })
  }catch(error){
    if(error.sqlMessage.includes("foreign key")){
      res.status(500).json({ message: "Já existem pedidos com esse endereço" })
    }
    else{
      res.status(500).json({ message: "Erro excluindo endereço" })
    }
  }
})

//Rota para buscar endereços
app.get("/addresses/:userId", async (req, res) => {
  try{
    const userId = req.params.userId

    const user = await db('users').where('id', userId).first()
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado"})
    }

    const addresses = await db('addresses')
      .where('userId', userId)

    res.status(200).json({addresses})
  }catch(error){
    res.status(500).json({ message: "Erro buscando endereços" })
  }
})

//Rota para salvar pedidos
app.post("/orders", (req, res) => {
  db.transaction(async (trx) => {
    try{
      const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body

      const user = await trx('users').where('id', userId).first()
      if(!user){
        return res.status(404).json({message: "Usuário não encontrado"})
      }

      const order = {
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
        userId: userId,
        addressId: shippingAddress
      }

      await trx('orders')
        .insert(order)

      const orderId = await trx.select('id')
        .from('orders')
        .orderBy('id', 'desc')
        .first()

      const products = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.offerPrice ? item.offerPrice : item.price,
        orderId: orderId.id,
        productId: item.id
      }))

      console.log(products)

      await trx('order_products')
        .insert(products)

      await trx.commit()
      res.status(201).json({message: "Pedido criado com sucesso"})
    }catch (error){
      await trx.rollback()
      res.status(500).json({message: "Erro ao salvar pedido"})
    }
  })
})

//Rota para buscar pedidos
app.get("/orders/:userId", async (req,res) => {
  try{
    const userId = req.params.userId

    const user = await db('users').where('id', userId).first()
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado"})
    }

    const orders = await db('orders')
      .where('userId', userId)

    res.status(200).json({orders})
  }catch (error){
    res.status(500).json({message: "Erro ao buscar pedidos"})
  }
})

//Rota para buscar detalhes do pedido
app.get("/orderDetails/:orderId", async (req, res) => {
  try{
    const orderId = req.params.orderId

    const order = await db('orders')
      .innerJoin('addresses', 'orders.addressId', 'addresses.id')
      .where('orders.id', orderId)
      .first()

    if(!order){
      return res.status(404).json({ message: "Pedido não encontrado" })
    }

    const response = await db('order_products')
      .where('orderId', orderId)

    const products = []
    for(const prd of response){

      const product = {...prd}

      const images = await db('product_images')
        .where('productId', prd.productId)

      product['images'] = images
      products.push(product)
    }

    order['products'] = products

    res.status(200).json({order})
  }catch(error) {
    res.status(500).json({ message: `Erro ao buscar pedido, ${error.toString()}` })
  }
})

//Buscando perfil
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await db('users').where('id', userId).first()
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado"})
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Erro buscando o usuário" });
  }
});

//Buscando categorias
app.get("/categories", async (req, res) => {
  try{
    const categories = await db('categories')

    const arrCategories = []
    categories.map(item => {
      arrCategories.push({label: item.name, value: item.id})
    })

    res.status(200).json({ categories: arrCategories })
  }catch (error){
    res.status(500).json({ message: 'Erro ao carregar categorias' })
  }
})

//Buscando produtos
app.get("/products", async (req, res) => {
  try{
    const response = await db('products')

    const products = []
    for (const item of response) {
      const images = await db('product_images')
        .where('productId', item.id)

      item['images'] = images
      products.push(item)
    }

    res.status(200).json({products})
  }catch (error){
    res.status(500).json({ message: "Erro ao buscar produtos" })
  }
})


module.exports = app
