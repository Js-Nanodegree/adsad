const ws = require('ws')
const a ='ws://localhost:3000/api/vw1'
const b ='ws://192.168.0.20:8090'
const w = new ws('ws://localhost:4000/graphql', { headers: { platform: 'EXS.CashWebSocket' } })

// // const crypo = require('crypto-js')

// const apiKey = '765dfd1697da2de2ea6266c5f3b274829b8d4f2025bbef1f2bfc2ca445fb5611'
// const apiSec = 'WHq3Sz8Rww7c1EzrCmUJ0b/YoFZvXSLa854AZFKrn/hA39k='

// const authNonce = Date.now() * 1000
// const authPayload = apiKey + authNonce
// const authSig = crypo.HmacSHA512(authPayload, apiSec).toString(crypo.enc.Hex)

const msg = JSON.stringify({
	// apiKey,
	// // authSig,
	// authNonce,
	// authPayload,
	event: 'auth',
	method: 'asset.subscribe',
	params: 'BTCUSD',
})

w.on('open', () => {
	w.send(msg)
})
// w.send(msg))

w.on('message', msg => {
	console.log(msg)
})