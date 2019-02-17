const url = require('url')
const WebSocket = require('ws')
const http = require('http')
const wssServer = new WebSocket.Server({ noServer: true })
const wssServerHelp = new WebSocket.Server({ noServer: true })
 
const server = http.createServer();
const DataConnect = {}

const wssClient = null
	
	// аавтоматическое отключение
	// авторизацию
	// проверить на подключение
	// обработка ошибки потери соединения на AWS
	// создание мульти подключения
	// 	
		//----------------Fileter Wss Origin Headers-------------------------------//
	
		function originIsAllowed(origin) {
			if (origin === 'EXS.CashWebSocket') {
				return true
			} else {
				return false
			}
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

		const seeeks = (data, id, ws) => {
			const wssClient = new WebSocket('ws://localhost:8080')
			
			wssClient.on('error', (e)=>{
				ws.send('Maybe Some Later connect replay')
				ws.close()
				
			})

			wssClient.onopen = () => {
				// авторизация
				wssClient.send(data +id)
			}
	
			// FilterMessage(data, id, ws,wssClient)

			wssClient.on('close', function() {
				wssClient.close()
						})

			wssClient.on('message', function incoming(data) {
				if(!ws || ws.readyState == 3){
					wssClient.close()
				}
				else{
					id.send(data)
				}})
			
		}

		//-----------------WSS Server From Client------------------------------//
	
		wssServer.on('connection', function(ws) {
			const id = Math.random()
			DataConnect[id] = ws
	
			ws.on('message', message => {
					seeeks(message, DataConnect[id], ws)
			})
			ws.on('close', () => {
				delete DataConnect[id]
			})
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
