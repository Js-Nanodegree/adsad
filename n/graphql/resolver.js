const {PubSub} = require('apollo-server')
const withFilter = require('graphql-subscriptions').withFilter;
const _ =require('lodash')


const WebSocket = require('ws');

const pubsub = new PubSub()

const MESSAGE_CREATED = 'MESSAGE_CREATED'


const smamsh = (data) => {

	console.log(data,"запрос")

  const ws = new WebSocket('ws://localhost:8000');
  let DateConect={}

  const msg = JSON.stringify({
    id: 200,
    method: 'order.subscribe',
    params: [84, "BTCUSD"],
  })


  ws.on('open', function open() {
    ws.send(msg);
  });


  ws.on('message', function incoming(data) {
	const dat = JSON.parse(data)
	pubsub.publish(MESSAGE_CREATED, {
          messageCreated: {
            message: dat
          },
        })
	console.log(dat)
  })
}
const resolvers = {
  Query: {
    messages: () => [{
      id: 0,
      content: 'Hello!'
    }, {
      id: 1,
      content: 'Bye!'
    }],
  },
  Subscription: {
    messageCreated: {
      subscribe: withFilter((payload, variables, context, info) => {
		pubsub.asyncIterator(MESSAGE_CREATED)		
		console.log(smamsh(context.connection.query))
      })
    },
  },
}




module.exports = resolvers