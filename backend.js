const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws, req) {
  // console.log(ws)
  const ip = req.connection.remoteAddress;
  ws.on('message',()=>ws.send(ip))
});



// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 5000 });

// function heartbeat() {
//   this.isAlive = true;
//   console.log('on')
// }

// wss.on('connection', function connection(ws) {
//   ws.isAlive = true;
//   ws.on('pong', heartbeat);
//   console.log('connected',heartbeat)
//   ws.onclose = function()
//   {
//     // websocket is closed.
//     console.log("Connection is closed...");
//   };
//   ws.on('message', function incoming(msg) {

//     console.log(msg)

//     ws.send(msg)
//   });
//   ws.send(heartbeat)
//   ws.on('error', function(err) {
//     console.log(err)
//   })
// });


// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();
//     ws.isAlive = false;
//     ws.ping('', false, true);
//   });
// }, 30000);