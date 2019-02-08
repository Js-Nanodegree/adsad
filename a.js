// var WebSocketClient = require('websocket').client;
 
// var client = new WebSocketClient();
 
// client.on('connectFailed', function(error) {
//     console.log('Connect Error: ' + error.toString());
// });
 
// client.on('connect', function(connection) {
//     console.log('WebSocket Client Connected');
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         }
//     });
    
//     function sendNumber() {
//         if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connection.sendUTF(number.toString());
//             setTimeout(sendNumber, 5000);
//         }
//     }
//     sendNumber();
// });

// client.connect('ws://localhost:8000', 'echo-protocol');

const ws = require('ws')
const w = new ws('ws://localhost:5000/graphql')

w.on('subscriptions', (msg) => console.log(msg))

let msg = JSON.stringify({ 
    "subscriptions":"{channels{messages{text}}}",
})

w.on('open', () => w.send(msg))

// const crypto = require('crypto')
// const request = require('request')

// const apiKey = 'rTB4jhWoSS7BbV9LK39gFRnmThthR945203I0D07U27'
// const apiSecret = 'jwiarANXsioKbSWzGxXrc878SzhPpisB9xmcLculrZx'

// const apiPath = 'a'
// const nonce = Date.now().toString()
// const body = {"query":"{me{username}time{time}}"}
// let signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}`

// const shex =()=> {
//   console.log('server start',Date.now().toString())
//   return crypto.createHmac('sha512', apiSecret).update(signature).digest('hex')}

  
// const metods ='orders'                          //Параметры запроса согластно правам  токена (в разработке)
//             // ||'walets'
//             // ||'withdraw'
//             // ||'accountHistory'
//             // ||'accountInfo'                      //нужно для определения Прав токена и проверки метода 



// const options = {
//   url: `http://localhost:8000/${apiPath}`,
//   headers: {
//     'bfx-nonce': nonce,
//     'bfx-apikey': apiKey,
//     'bfx-signature': shex(),
//     'metods':metods, 
//   },
  
//   body: body,
//   json: true
// }
// request.post(options, (error, response, body) => {
//   console.log(response.body);
//   const {data:{me:a}} =response.body
//   console.log(a)
//   console.log('server end',Date.now().toString())
// })