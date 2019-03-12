const { PubSub, withFilter } =require ('apollo-server')
const cs =require('./webSocketClient')



const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const resolvers = {
	Query: {
		orderSubscribe: (root,args,context) => {
      const conText =(context.req.body.query)
      const wsSend = cs(conText).then(data => JSON.parse(data))
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





module.exports = resolvers