const WebSocket = require('ws');

let data;

const cs = conText => {
    const ws = new WebSocket("ws://192.168.0.20:8090");
    console.log(conText)
    
    const msg = JSON.stringify({
        id: 200,
        method: "order.subscribe",
        params: [77, "BTCUSD"]
    });
    
    return new Promise(resolve => {
    ws.on("open", function open() {
      ws.send(msg);
    });

    ws.on("message", function incoming(datas) {
      data =  datas 
      resolve(data);
    });
  });
};



module.exports = cs