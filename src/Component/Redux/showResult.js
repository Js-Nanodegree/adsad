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
// назнчить новости сокет Io нужно заменять сообщения после клика очишать через 30 сек
// проверить редукс форм и его состаяния боюсь что может быть переписать статы надо будет но работает а отлично именно надо научиться сбрасывать счетчик

export default (async function showResults(values) {
  var socket = io.connect('http://localhost:4000/');
  // socket.on('news', function (data) {
  //   console.log(data)
  // })
    const a =(encrypt(values))
    socket.emit('my other event', { decruptData: a });
  })