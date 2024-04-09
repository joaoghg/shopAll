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
