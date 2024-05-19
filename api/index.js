const express = require("express")
const bodyParser = require("body-parser")
const db = require("./config/db")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const cors = require("cors")
const bcrypt = require("bcrypt")
require('dotenv').config();

const app = express()
const port = 8000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const jwt = require("jsonwebtoken")
const {includes} = require("core-js/internals/array-includes");

app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`)
})

db.migrate
  .latest()
  .then(() => {
    insertCategories()
  })

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
    text:`Por favor, clique no link abaixo para verificar seu email : http://192.168.0.117:8000/verify/${verificationToken}`
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
const insertCategories = async () => {
  const categoriesQtd = await db('categories').count('id as quantity')
  if(categoriesQtd[0].quantity === 0){
    const categories = [
      { name: "Roupas masculinas" },
      { name: "Jóias" },
      { name: "Eletrônicos" },
      { name: "Roupas femininas" },
    ]

    db('categores')
      .insert(categories)
  }
}
const insertProducts = async () => {
  const productsQtd = await db('products').count('id as quantity')
}

//Início das rotas
//Rota de registro
app.post("/register", async (req, res) => {
  try{
    const { name, email, password } = req.body

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

    const user = await db('users').where('email', email).first()
    if(!user){
      return res.status(401).json({message: "Credenciais inválidas"})
    }

    if(!await bcrypt.compare(password, user.password)){
      return res.status(401).json({message: "Credenciais inválidas"})
    }

    const token = jwt.sign({userId: user.id}, secretKey)

    res.status(200).json({token})
  }catch(error){
    res.status(500).json({message: "Não foi possível fazer login"})
  }
})

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

      const orderId = trx.select('id')
        .from('orders')
        .orderBy('id', 'desc')
        .first()

      const products = cartItems.map(item => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        orderId: orderId
      }))

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
      .innerJoin('order_products', 'orders.id', 'order_products.orderId')
      .where('userId', userId)

    res.status(200).json({orders})
  }catch{
    res.status(500).json({message: "Erro ao buscar pedidos"})
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
