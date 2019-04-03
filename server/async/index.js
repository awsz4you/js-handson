const express = require("express")

const app = express()
const httpServer = require('http').Server(app)

httpServer.listen(8080, () => {
  console.log('%s:HttpServer 起動完了', (new Date).toLocaleString())
})

const MongoClient = require("mongodb").MongoClient
const Server = require('mongodb').Server

app.get("/books", (req, res) => {
  //①非同期関数
  (async ()=>{
    let client = null

    //②例外処理
    try {

      //③コールバック待機：MongoDBサーバ接続
      const client = await MongoClient.connect(new Server('localhost', 27017))

      const db = client.db("hogedb")
      
      //④コールバック待機：取得したbooksコレクション内Objectを配列化
      const books = await db.collection('books').find({}).toArray()
      
      res.json(books)

    //⑤例外補足
    }catch(err){
      console.error(err)    

    //⑥最後に実施する内容
    }finally{
      if (client != null) {
        client.close()
      }
    }

  })()
  
})

