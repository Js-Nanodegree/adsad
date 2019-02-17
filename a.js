const ws = require('ws')
const w = new ws('ws://localhost:3000/api/vw1', { headers: { platform: 'EXS.CashWebSocket' } })
const crypo =require('crypto-js')

const apiKey ='fjknasdjfndsk'
const apiSec ='1'
const authNonce = Date.now()*1000
const authPayload=apiKey+authNonce
const authSig = crypo.HmacSHA512(authPayload,apiSec).toString(crypo.enc.Hex)


const msg = JSON.stringify(
	{
		apiKey,
		authSig,
		// authNonce,
		authPayload,
		event: 'auth',
		method:'order.subcribe',
		params:'["BTCUSD",auth,2]' //?
	  }
)

const Ci =()=>setInterval(msg,300)

w.on('open', () => w.send(msg))
// w.send(msg))

w.on('message', msg => {
	console.log(msg)
})