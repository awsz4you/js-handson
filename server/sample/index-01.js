const express = require("express")

const app = express()
const httpServer = require('http').Server(app)

httpServer.listen(8080, () => {
  console.log('%s:HttpServer 起動完了', (new Date).toLocaleString())
})

app.get("/hoge", (req, res) => {

  const message = {
    message: 'Hello World',
    date: (new Date).toLocaleString()
  }

  res.json(message)
})

