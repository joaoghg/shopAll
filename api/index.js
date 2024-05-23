const app = require('./server')

const port = 8000
app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`)
})
