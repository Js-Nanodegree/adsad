const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8000
});

wss.on('connection', function connection(ws, res, req) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  function sendNumber() {

    var number = Math.round(Math.random() * 0xFFFFFF);
    ws.send(JSON.stringify({"error":null,"result":number,"id":200}));

    setTimeout(sendNumber, 1000);

  }
  sendNumber();
});

// const { Server } = require("graphql-io-server")
// const server = new Server({ url: "http://localhost:12345/api" })
// server.at("graphql-resolver", () => ({
//     Root: { hello: [ "hello: String", () => "world" ] }
// }))
// server.start()
