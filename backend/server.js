const express = require('express');
const app = express()
const socketio = require('socket.io')
const http = require('http')
const port= process.env.PORT || 4000
const path =require('path')
const PublicPath = path.join(__dirname,'../public')
const server =http.createServer(app)
const io =socketio(server)
require('./Component/mongo').connect('mongodb://localhost:27017/onelife')
const ApiGenerate =require('./Component/mongo')



app.use(express.static(PublicPath))



const decrypt =require('./Component/Crypto')

const dasta =    {"NameToken":'Allo',
                "TimeCreate":Date.now().toString(),"Root":[{name:'slava',
                                                            suf:'slava',
                                                          loh:'suchcka'}]}


io.on('connection', function (socket) {
    socket.on('my other event', function (data) {
      const {decruptData}=data
      
      const a =decrypt(decruptData)
      const c = ApiGenerate(a).save((data)=>{socket.emit('news',a)})
                              // .then()
      // console.log(a)
      return c
    });
  });


server.listen(port,()=>{console.log('Server socketIo Started on ' +`${port}`)})