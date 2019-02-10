const express = require('express')
const http = require('http')
const app = express();
const WebSocket = require('ws')
const url = require('url')

const server = http.createServer(app)
const wss1 = new WebSocket.Server({ noServer: true, path: '/incoming' })
const wss2 = new WebSocket.Server({ noServer: true, path: '/outgoing' })

app.use(express.static( __dirname + '/gui/dist'))

server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname
  if (pathname === '/incoming') {
    wss1.handleUpgrade(request, socket, head, (ws) => {
      wss1.emit('connection', ws);
    });
  } else if (pathname === '/outgoing') {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws);
    });
  } else {
    socket.destroy()
  }
})

wss1.on('connection', ws => {
  console.log('transport connected')
  wss1.on('message', data => {
    wss2.clients.forEach(client => {
      client.send(data)
    })
  })
})

wss2.on('connection', ws => {
  console.log('browser connected')
})

server.listen(5580, () => {
  console.log('log2node server listening on port 5580!');
  console.log('Use the url ws://localhost:5580/incoming in your transport configuration.');
})


const ws = require('ws')
const w = new ws('ws://localhost:8000/incoming')

const clientWs =()=>{
    
  w.on('message', (msg) => { return (msg)})
  let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD' 
  })
  w.on('open', () => w.send(msg))
}
