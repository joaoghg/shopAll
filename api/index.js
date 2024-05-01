const express = require("express")
const bodyParser = require("body-parser")
const db = require("./config/db")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()
const port = 8000
app.db = db

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const jwt = require("jsonwebtoken")

app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`)
})

db.migrate
  .latest()

//Início das funções

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user:"jherreiragarnica2@gmail.com",
      pass:"hhqaozecxehkgdwq"
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

    await db('users')
      .insert({
        name: name,
        email: email.toLowerCase(),
        password: password,
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
