const express = require('express');
const {createServer} =require('http')
const  { ApolloServer,gql } =require ('apollo-server-express');
// const WebSocketServer =require('ws').Server
const app = express();
const server = createServer(app,
  (function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
}))
const schema = require('./Comp/Graph/schema')
const resolvers = require('./Comp/Graph/resolvers')
const WebSocketServer = require('websocket').server



const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({req}) => {
    const headers = req.headers
    const body = req.body
    return { headers, body }
  },
  playground:true
});

apolloServer.applyMiddleware({ app, path: '/a' });


server.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});



const WebSocket = require('ws');
 
const wss = new WebSocket.Server({server:server,port:5000});
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});






// const wsServer = new WebSocketServer({
//   httpServer: server,
//   // You should not use autoAcceptConnections for production
//   // applications, as it defeats all standard cross-origin protection
//   // facilities built into the protocol and the browser.  You should
//   // *always* verify the connection's origin and decide whether or not
//   // to accept it.
//   autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
// // put logic here to detect whether the specified origin is allowed.
// return true;
// }

// var clients = {};

// wsServer.on('request', function(request) {
//   if (!originIsAllowed(request.origin)) {
//     // Make sure we only accept requests from an allowed origin
//     request.reject();
//     console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//     return;
//   }
  
  
  
//   var connection = request.accept('echo-protocol', request.origin);
//   var id = Math.random();
//   clients[id] = connection;
//   console.log("новое соединение " + id);
//   console.log((new Date()) + ' Connection accepted.');
//   connection.on('message', function(message) {
//       if (message.type === 'utf8') {
//           console.log('Received Message: ' + message.utf8Data);
//           connection.sendUTF(message.utf8Data);
//       }
//       else if (message.type === 'binary') {
//           console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//           connection.sendBytes(message.binaryData);
//       }
//   });
//   function sendNumber() {
//     if (connection.connected) {
//         // var number = Math.round(Math.random() * 0xFFFFFF);
//         connection.sendUTF(id
//           // connection.remoteAddress+number.toString()
//           );
//         setTimeout(sendNumber, 1000);
//     }
// }
// sendNumber();
//   connection.on('close', function(reasonCode, description) {
//       console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//   });
  
// });




























// let wss = new WebSocketServer({server:server})

// wss.on('connection',function(wss){
//   var id = Math.random()
//   console.log(id)
//   // clients[id]=wss

//   wss.on('message',function(message){
//     // for(var key in clients) {
//     //   clients[key].send('id:'+key);
//     console.log(message)
//     wss.on('open', () => wss.send(msg))
//     })
  
//   wss.on('close',function(){
//     console.log('close'+id)
//     // delete clients[id]
//   })
// })