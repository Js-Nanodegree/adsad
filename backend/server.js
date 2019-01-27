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
const ApiToken =require('./Component/mongo')
app.use(express.static(PublicPath))

const decrypt =require('./Component/Crypto') 

const KeyHash =(a)=>ApiToken.find((err,res)=>{
  if(err){console.log('удалить ошибку')}
  else{
    const {ApiKey,NameToken}=(res) 
      return console.log(res)}
})

io.on('connection', function (socket) {
    socket.on('my other event', function (data) {
      const {decruptData}=data        //декомпозируем дату      
      const a =decrypt(decruptData)   //расшифровываем данные
      // console.log(a)
      ApiToken.create(a,(err,res)=>{
        if(err){
          socket.emit('news',{
            text:'мы нашли ошибку в данныых ',
            })
        }
        else{
          socket.emit('news',{                        //отправляеем сообщение на указанный сокет
            text:'Ваш токен уже создан скопируйте код из письма в окно чтобы получить доступ к вашим API ключам',
            })
        }return data
      })
    }) //закрыт сокет создания токена
    
    
    socket.on('verevent', (data)=> {
      const {VerificationCode}=data
      console.log(VerificationCode)
      const user=await ApiToken.findOne({NameToken:'domru'})
      if(!user.checkPochtaMail(VerificationCode)){
        return console.log('не получилось')
      }return console.log('Получилось')


      // console.log(data)
      // const {VerificationCode} =data
      // const c =verData=>{
      //   socket.emit('news',{
      //   text:JSON.stringify(verData)               
      // })}
      // console.log(c)
      // return c(verData)
  })


})


server.listen(port,()=>{console.log('Server socketIo Started on ' +`${port}`)})