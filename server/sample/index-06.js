const express = require("express")

const app = express()
const httpServer = require('http').Server(app)

httpServer.listen(8080, () => {
  console.log('%s:HttpServer 起動完了', (new Date).toLocaleString())
})

const MongoClient = require("mongodb").MongoClient
const Server = require('mongodb').Server

app.get("/books", (req, res) => {
  MongoClient.connect(new Server('localhost', 27017), (err, client)=>{
    if (err) throw err;
    const db = client.db("hogedb")
    db.collection('books').find({}).toArray((err, books)=>{
      if (err) throw err;
      res.json(books)
      client.close()
    })
  })
})

app.get("/books/:bookId", (req, res) => {
  const id = req.params.bookId;
  MongoClient.connect(new Server('localhost', 27017), (err, client)=>{
    if (err) throw err;
    const db = client.db("hogedb")
    db.collection('books').findOne({_id: id}, (err,book) => {
      if (err) throw err;
      res.json(book)
      client.close()
    })
  })
})

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post("/books", (req, res) => {
  const book = req.body;
  MongoClient.connect(new Server('localhost', 27017), (err, client)=>{
    if (err) throw err;
    const db = client.db("hogedb")
    db.collection('books').insertOne(book, (err,result) => {
      if (err) throw err;
      res.json(result)
      client.close()
    })
  })
})

app.delete("/books/:bookId", (req, res) => {
  const id = req.params.bookId;
  MongoClient.connect(new Server('localhost', 27017), (err, client)=>{
    if (err) throw err;
    const db = client.db("hogedb")
    db.collection('books').deleteOne({_id: id}, (err,result) => {
      if (err) throw err;
      res.json(result)
      client.close()
    })
  })
})

app.use(express.static(__dirname + '/../../public'))
