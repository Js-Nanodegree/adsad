const WebSoketWorker =(params)=>{

    const url = require('url');
    const WebSocket = require('ws');

    const wss1 = new WebSocket.Server({ noServer: true });
    const wss2 = new WebSocket.Server({ noServer: true });
    const wss3 =new WebSocket('ws://localhost:8000/wss1')
    wss1.on('connection', function connection(ws) {console.log(1)
      ws.on('message', function incoming(message) {console.log(2)
        wss3.on('connection',function connection(message){
        wss3.on('open', () => {console.log(3) 
            wss3.send(message)})
        wss3.on('message', (message) => {console.log(4) 
            wss1.send(message)})
      })
    })})
    wss2.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
      ws.send('wss2 something');
    });

    params.on('upgrade', function upgrade(request, socket, head) {
      const pathname = url.parse(request.url).pathname;

      if (pathname === '/wss1') {
        wss1.handleUpgrade(request, socket, head, function done(ws) {
          wss1.emit('connection', ws, request);
        });
      } else if (pathname === '/wss2') {
        wss2.handleUpgrade(request, socket, head, function done(ws) {
          wss2.emit('connection', ws, request);
        });
      }
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