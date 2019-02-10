const ws = require('ws')
const w = new ws('ws://localhost:8000/wss1')

const clientWs =()=>{
    
  w.on('message', (msg) => { console.log (msg)})
  let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD' 
  })
  w.on('open', () => w.send(msg))
}

clientWs()
