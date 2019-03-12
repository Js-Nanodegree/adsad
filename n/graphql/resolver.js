const { PubSub, withFilter } =require ('apollo-server')
const cs =require('./webSocketClient')



const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const resolvers = {
	Query: {
		orderSubscribe: (root,args,context) => {
      const conText =(context.req.body.query)
      const wsSend = cs(conText).then(data => JSON.parse(data))
      // const wsSending = cs(conText)
      
      // pubsub.publish('MESSAGE_CREATED', JSON.parse(wsSending))
    return wsSend
  }
  },
  
	Subscription: {
		orderSubscribes: {
			subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED,sus()),
		},
	},
}

const sus =()=>{

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


module.exports = resolvers