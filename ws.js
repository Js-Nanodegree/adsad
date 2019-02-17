const WebSoketWorker =(params)=>{
  const WebSocket = require("ws");

  const binanceWS = new WebSocket("ws://localhost:8080");
  
  var websocketList = [];
  
  binanceWS.on("open", function open() {console.log("open action")});
  
  binanceWS.on("message", function incoming(data) {console.log(data);
      websocketList.forEach(ws => {ws.send(data)})
  });

  binanceWS.on('close',()=>console.log('close'))
  
  const wss = new WebSocket.Server({ server:params });
  
  wss.on("connection", function connection(ws) {
      ws.on('message', (message)=>{binanceWS.send(message)})

      websocketList.push(ws);
  
      ws.on("close", function close() {console.log("Disconnected");
      });
  });

  }

    

// const clientWs =()=>{
    
//     w.on('message', (msg) => { return (msg)})
//     let msg = JSON.stringify({ 
//     event: 'subscribe', 
//     channel: 'ticker', 
//     symbol: 'tBTCUSD' 
//     })
//     w.on('open', () => w.send(msg))
// }

module.exports = WebSoketWorker