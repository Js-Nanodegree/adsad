const { PubSub } =require ('apollo-server')

const WebSocket = require('ws');

const pubsub = new PubSub()

const MESSAGE_CREATED ='MESSAGE_CREATED'

const smamsh =()=>{
const ws = new WebSocket('ws://192.168.0.20:8090');

	const msg = JSON.stringify({
		id:200,
	  method: 'order.subscribe',
	  params: [84,"BTCUSD"],
	})
	
	 
	ws.on('open', function open() {
	  ws.send(msg);
	});
	
	 
	ws.on('message', function incoming(data) {
		const dat = JSON.parse(data)
		
		pubsub.publish(MESSAGE_CREATED, {
			messageCreated:{message:dat },
		})

		console.log(dat)
	
	})

	}
const resolvers = {
	Query: {
		messages: () => [{ id: 0, content: 'Hello!' }, { id: 1, content: 'Bye!' }],
	},
	Subscription: {
		messageCreated: {
			subscribe: () => {
				pubsub.asyncIterator(MESSAGE_CREATED)
				smamsh()
			}
		},
	},
}




module.exports = resolvers