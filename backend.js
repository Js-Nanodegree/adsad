const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws) {
  console.log('Stert BackEnd')
  
  ws.on('message', function incoming(message) {
    
    console.log('received: %s', message);
    function sendNumber(){
      if(!ws || ws.readyState == 3){ 
        ws.close()}else{
          
      var number = Math.round(Math.random() * 0xFFFFFF);
      ws.send(number)
      setTimeout(sendNumber, 100)
    }}
    sendNumber()
    
  })
  // ws.send(Date.now())
});


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