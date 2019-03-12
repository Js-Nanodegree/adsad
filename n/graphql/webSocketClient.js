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
      
      console.log(datas) 
      resolve(data);
    });
  });
};


const sus =(MESSAGE_CREATED,pubsub)=>{

  const WebSocket = require('ws');
  
  let data;
  
      const ws = new WebSocket("ws://192.168.0.20:8090");
      const msg = JSON.stringify({
          id: 200,
          method: "order.subscribe",
          params: [77, "BTCUSD"]
      });
      
      ws.on("open", function open() {
        ws.send(msg);
        pubsub.publish(MESSAGE_CREATED, {
          orderSubscribes:{method:'Success'},
        })
      });
  
      ws.on("message", function incoming(datas) {
        data =  datas
        pubsub.publish(MESSAGE_CREATED, {
          orderSubscribes:JSON.parse(datas),
        })
        
        console.log(datas) 
      });
    }



module.exports = {cs,sus}