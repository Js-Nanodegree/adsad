const url = require('url')
const WebSocket = require('ws')
const http = require('http')
const wssServer = new WebSocket.Server({ noServer: true })
const wssServerHelp = new WebSocket.Server({ noServer: true })
 
const server = http.createServer();
const DataConnect = {}

const wssClient = null
	
	// аавтоматическое отключение
	// проверить на подключение
	// обработка ошибки потери соединения на AWS
	// создание мульти подключения
	// проверка на ошибки приватного запроса
	// исключение запроса ошибочного
	// выташить ремоте ID  авторизацию
	// проверка запросов приходящих.

	//гобалльную проверку на скрипты
	//const id = Math.random()
	// мультизапрос 

	//----------------Fileter Wss Origin Headers-------------------------------//
	
		function originIsAllowed(origin) {
			if (origin === 'EXS.CashWebSocket') {
				return true
			} else {
				return false
			}
		}


		function createWebsocket (ws,id){
			
			Object.keys(DataConnect).forEach((key,item) => {
				{
					console.log(DataConnect)
					if (key ==id ){
					console.log(DataConnect)

						delete DataConnect[s]
						ws.send('Попробуйте еще раз')
						ws.close()
					console.log(DataConnect)

					}else{
					console.log(DataConnect)

						DataConnect[id]=ws
					console.log(DataConnect)

					}}    
				});
		}
		

		//----------------CHECK Function Connection Wss Origin Headers-------------------------------//

		const checkSum = (m)=>{
			check(wssClient,m)
			check(wssServer,m)
		}
		function check (ws,message){
			if (ws === null || undefined){}else{
			const x = (!ws || ws.readyState)
			switch (x){
					case 0:
					console.log('ReadyState == 0 ' + message)
					break
					case 1:
					console.log('ReadyState == 1 ' + message)
					break
					case 2:
					console.log('ReadyState == 2 ' + message)
					break
					case 3:
					console.log('ReadyState == 3 ' + message)
					break
					case undefined:
					console.log('ReadyState == undefined ' + message)
					break
					case null:
					console.log('ReadyState == null ' + message)
					break
					default:
					console.log(x)
					break
			}
		}}
	
		//----------------Wss Client WeSocket Wss Origin Headers-------------------------------//

		

		function dataSend(data,ws,wssClient){
			const {event:a,metod:metod,params:params}  = JSON.parse(data)
			const s =JSON.stringify(data)
			if(String(a).indexOf('auth')!==-1){
				if (s.indexOf('apiKey') ==-1) {ws.send('ApiKey Mistake')
				ws.close()}else
				if (s.indexOf('authSig') ==-1) {ws.send('authSig Mistake')
				ws.close()}else
				if (s.indexOf('authNonce') ==-1) {ws.send('authNonce Mistake')
				ws.close()}else
				if (s.indexOf('authPayload') ==-1) {ws.send('authPayload Mistake')
				ws.close()}else
				{
					const id = Math.random()
					const userId =77
					const param = params.replace('auth',userId)
					const data = `{id:${id},metod:${metod},params:${param}}`
					wssClient.send(data)
				}
			}else{return data}
			// return JSON.stringify(a)
		}

		function Mistake(data){
			return data
		}

		const seeeks = (data, id, ws) => {
			const wssClient = new WebSocket('ws://localhost:8080')
			
			wssClient.on('error', (e)=>{
				ws.send('Maybe Some Later connect replay')
				ws.close()
				wssClient.close()				
			})
			wssClient.onopen = () => {
				dataSend(data,ws,wssClient)
			}
	
			// FilterMessage(data, id, ws,wssClient)

			wssClient.on('close', function() {
				wssClient.close()
						})
			wssClient.on('message', function incoming(data) {
				console.log(data)
				if(!ws || ws.readyState == 3){
					wssClient.close()
				}
				else{					
					DataConnect[id].send(data)
				}})
			
		}

		const serverMessage =(ws,id,req)=>{
			ws.on('message', message => {	
				console.log(DataConnect)			
					seeeks(message, id, ws)
			})
		}

		const serverClose =(ws,id,req)=>{
			ws.on('close', () => {
				checkSum(9)
				delete DataConnect[id]
			})
		}

		const serverMode =(ws,id,req)=>{
			DataConnect[id]=ws
			serverMessage(ws,id,req)
			serverClose(ws,id,req)
		}
		function createWebsocket (ws,id,req){console.log(1)
			
		 const z =	Object.keys(DataConnect).forEach((key,item) => {
				{console.log(1)
					if (key ==id ){console.log(2)
						delete DataConnect[s]
						ws.send('Попробуйте еще раз')
						serverClose(ws,id,req)
					}else{
						console.log(3)
						DataConnect[id]=ws
						serverMode(ws,id,req)
					}}    
				});
				return z
		}

		//-----------------WSS Server From Client------------------------------//
	
		wssServer.on('connection', function(ws,req) {
			const id = req.headers['sec-websocket-key']
			createWebsocket(ws,id,req)
			// serverMode(ws,id,req)
			
			
		})
	
		//-----------------WSS Helper Needle------------------------------//
	
		wssServerHelp.on('connection', function(ws) {
			const aHelp = `{EXAMPLE:[
			{"id": 123,"method": "kline.subscribe","params": ["BTCUSD",86400]},
			{"id":10,"method":"market.kline","params":["BTCUSD",1549883075,1549969475,86400]},
			{id: 23,method: "server.ping",params: []},
			{id: 23,method: "server.time",params: []},
			{id: 20,method: "order.subscribe",params: [74, "BTCUSD"]}
			]}
	
			Connencted:{
				const ws = require('ws')
				const w = new ws('ws://localhost:3000/api/vw1', {headers:{platform:"EXS.CashWebSocket"}})
		
				let msg = JSON.stringify(
						{id: 20,method: "order.subscribe",params: [74, "BTCUSD"]}
						)  
						w.on('open', () => w.send(msg))
						w.on('message', (msg) => {console.log(msg)        
						})    
				}
				
			Authterization:{
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
		authNonce,
		authPayload,
		event: 'auth',
		metod:'order.subcribe',
		params:'["BTCUSD",auth,2]' //?
	  }
)


w.on('open', () => w.send(msg))
// w.send(msg))

w.on('message', msg => {
	console.log(msg)
})
			}`	
			ws.on('message', () => {
				ws.send(aHelp)
				ws.close()
			})
			ws.on('close', () => {				
				ws.close()
			})
		})
	

	//------------------Route and HeaderIs original Filter-----------------------------//

	server.on('upgrade', function upgrade(req, socket, head) { 
		// console.log(2)
		const pathname = url.parse(req.url).pathname
		if (originIsAllowed(req.headers.platform) == true) {

			if (pathname === '/api/vw1') {
				wssServer.handleUpgrade(req, socket, head, function done(ws) {
					wssServer.emit('connection', ws, req)
				})
			} else if (pathname === '/help/vw1') {
				wssServerHelp.handleUpgrade(req, socket, head, function done(ws) {
					wssServerHelp.emit('connection', ws, req)
				})
			} else {
				socket.destroy()
			}
		}
	})

  server.listen(3000)



//   const crypo =require('crypto-js')

// const apiKey ='fjknasdjfndsk'
// const apiSec ='1'
// const authNonce = Date.now()*1000
// const authPayload=apiKey+authNonce
// const authSig = crypo.HmacSHA512(authPayload,apiSec).toString(crypo.enc.Hex)

// const payload = {
//     apiKey,
//     authSig,
//     authNonce,
//     authPayload,
//     event: 'auth',
//     metod:'order.subcribe',
//     params:'["BTCUSD",auth,2]' //?
//   }
// const zs = JSON.stringify(payload)

// const {apiKey:apikey,authSig:authsig,authNonce:authnonce,authPayload:authpayload,event:a,metod:b,params:c} = JSON.parse(zs)




// const Slava = async params =>{
// const auth = await authRes({
//     apiKey: params.apikey,
//     nonce: params.authnonce,
//     signature: params.authsig,
//     body: params.authpayload,
// })

// if (auth.status) { 
//     const {apiKey:apikey,authSig:authsig,authNonce:authnonce,authPayload:authpayload,event:a,metod:b,params:c} = JSON.parse(zs)

//     let data
//     const userId = auth.userId
    
//     if (b === null){
//         ws.send('Auth Success')
//     }else{
//         ws.send(b)
//         const params =c.replace('auth',userId)
//         const id = 20
//         const z = {id:id,metod:b,params:params}
//         wssClient(z)
//     }    
// } else {
//     ws.send('mistake in your query')
// }

// }


// const authRes = async ({ apiKey, nonce, signature, body }) => {
//     const serverTime = (Date.now() / 1000 | 0)

//     if (((serverTime - nonce) > 300) || (serverTime < nonce)) {
//         console.log('⛔⛔⛔nonce auth false⛔⛔⛔')
//         return { status: false }
//     }

//     const apiToken = await ApiTokens.find({
//         tokens: { 
//             $elemMatch: { apiKey: apiKey } 
//          }
//     })

//     if (apiToken.length === 0) {
//         console.log('⛔⛔⛔api token not found⛔⛔⛔')
//         return {status: false}
//     } else {console.log(13)
//         return new Promise((resolve, reject) => {
//             apiToken[0].tokens.forEach(el => {
//                 if (el.apiKey === apiKey) {
//                     resolve({secretKey: el.secretKey, userId: 
//                         apiToken[0].remoteId
//                     })
//                 }
//             })
//         }).then(value => {
//             // const url = 'http://localhost:3000/api'
//             // const url = process.env.API_PATH
//             const data = `${body}`
//             const serverSignature=crypo.HmacSHA512(data,apisec).toString(crypo.enc.Hex)

//             if (serverSignature === signature) {
//                 return {status: true, userId: value.userId}
//             } else {
//                 console.log('⛔⛔⛔signature unvalid⛔⛔⛔')
//                 return {status: false}
//             }
//         })
//     }}

 