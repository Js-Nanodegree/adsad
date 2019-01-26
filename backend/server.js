const express = require('express');
const app = express()
const socketio = require('socket.io')
const http = require('http')
const port= process.env.PORT || 4000
const path =require('path')
const PublicPath = path.join(__dirname,'../public')

const ApiGenerate =require('./Component/mongo')



app.use(express.static(PublicPath))

const server =http.createServer(app)
const io =socketio(server)

const decrypt =require('./Component/Crypto')

const dasta =    {"NameToken":'Allo',
                "TimeCreate":Date.now().toString(),"Root":[{name:'slava',
                                                            suf:'slava',
                                                          loh:'suchcka'}]}


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      const {decruptData}=data
      
      const a =decrypt(decruptData)
      const c = ApiGenerate(a)
      // console.log(a)
      return c
    });
  });


server.listen(port,()=>{console.log('Server socketIo Started on ' +`${port}`)})