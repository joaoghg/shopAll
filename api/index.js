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

app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`)
})

db.migrate
  .latest()
  .then(() => {
    insertCategories()
      .then(insertProducts)
  })

let categories

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

    await db('categories')
      .insert(categories)

    categories = await db('categories')

    return Promise.resolve()
  }
}
const insertProducts = async () => {
  const productsQtd = await db('products').count('id as quantity')
  if(productsQtd[0].quantity === 0){
    const products = [
      {
        name: "OnePlus Nord CE 3 Lite 5G (Limão, 8GB RAM, 128GB Armazenamento)",
        price: 19000,
        images: [
          { path: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg", default: 1 },
        ],
        color: "Limão",
        size: "8 GB RAM 128GB Armazenamento",
      },
      {
        name: "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Armazenamento)",
        price: 26000,
        images: [
          { path: "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg", default: 1 },
        ],
        color: "Cloud Navy",
        size: "8 GB RAM 128GB Armazenamento",
      },
      {
        name: "Samsung Galaxy M14 5G (Prata, 4GB, 128GB Armazenamento) | 50MP Camera tripla | 6000 mAh Bateria | 5nm Octa-Core Processador | Android 13",
        price: 14000,
        images: [
          { path: "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg", default: 1 },
        ],
        color: "Prata",
        size: "4 GB RAM 128GB Armazenamento",
      },
      {
        name: "Realme narzo N55 (Azul, 4GB+64GB)",
        price: 10999,
        images: [
          { path: "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg", default: 1 },
        ],
        color: "Azul",
        size: "4GB RAM 64GB Armazenamento"
      },
      {
        name: "Oppo Enco Air3 Pro",
        price: 7500,
        offerPrice: 4500,
        images: [
          { path: "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg", default: 1 },
        ],
        color: "Verde",
        size: "Normal",
      },
      {
        name: "Fastrack Limitless FS1 Pro Smart Watch",
        price: 7955,
        offerPrice: 3495,
        images: [
          { path: "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "Normal",
      },
      {
        name: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
        price: 7955,
        offerPrice: 3495,
        images: [
          { path: "https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "Normal",
      },
      {
        name: "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
        price: 24999,
        offerPrice: 19999,
        images: [
          { path: "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg", default: 1 },
        ],
        color: "Azul",
        size: "8GB RAM, 128GB Armazenamento",
      }
    ]

    products.map(async (item) => {

      const product = {
        name: item.name,
        price: item.price,
        offerPrice: item.offerPrice ? item.offerPrice : null
      }

    
    })
  }
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
