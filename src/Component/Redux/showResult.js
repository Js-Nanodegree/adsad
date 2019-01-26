import io from 'socket.io-client'

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(JSON.stringify(text),'utf8','hex')
  crypted += cipher.final('hex');
  console.log(crypted)
  return crypted;
}



//Crypto шифровка проверить на сокетах как расшифровывает....

export default (async function showResults(values) {
    console.log(values)
    var socket = io.connect('http://localhost:4000/');
    socket.on('news', function (data) {
      console.log(data);
      const a =(encrypt(values))
      socket.emit('my other event', { decruptData: a });
    })});