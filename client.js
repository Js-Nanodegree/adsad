const ws = require('ws')
const w = new ws('ws://localhost:3000/api/vw1', { headers: { platform: 'EXS.CashWebSocket' } })

const msg = JSON.stringify({ id: 20, method: 'order.subscribe', params: [77, 'BTCRUB'] })

const Ci =()=>setInterval(msg,300)

w.on('open', () => w.send(msg))
// w.send(msg))

w.on('message', msg => {
	console.log(msg)
})