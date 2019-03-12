const { PubSub, withFilter } =require ('apollo-server')

const WebSocket = require('ws');

const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const resolvers = {
	Query: {
		messages: (context) => {
      const wsSend = cs(context).then(data => JSON.parse(data))
      pubsub.publish('CHAT_CHANNEL', wsSend)
    return wsSend
  }
  },
  
	Subscription: {
		messageCreated: {
			subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
		},
	},
}

let data;

const cs = context => {
  return new Promise(resolve => {
    const ws = new WebSocket("ws://192.168.0.20:8090");

    const msg = JSON.stringify({
      id: 200,
      method: "order.subscribe",
      params: [84, "BTCUSD"]
    });

    ws.on("open", function open() {
      ws.send(msg);
    });

    ws.on("message", function incoming(datas) {
      data =  datas 
      resolve(data);
    });
  });
};




module.exports = resolvers