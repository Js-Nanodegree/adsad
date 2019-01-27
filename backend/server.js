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


io.on('connection', function (socket) {
    socket.on('my other event', function (data) {
      const {decruptData}=data        //декомпозируем дату      
      const a =decrypt(decruptData)   //расшифровываем данные
      const c = ApiGenerate(a).save((data)=>{                               //сохраняем дату в mongoose
                                socket.emit('news',{                        //отправляеем сообщение на указанный сокет
                                  text:'Ваш токен уже создан скопируйте код из письма в окно чтобы получить доступ к вашим API ключам',
                                  })
                                })              
    }) //закрыт сокет создания токена
    
    
    socket.on('verevent', (data)=> {
      console.log(data)
      const {verData} =data
      const c =verData=>{
        socket.emit('news',{
        text:JSON.stringify(verData)               
      })}
      console.log(c)
      return c(verData)
  })


})


server.listen(port,()=>{console.log('Server socketIo Started on ' +`${port}`)})