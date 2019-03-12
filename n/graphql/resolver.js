const { PubSub, withFilter } =require ('apollo-server')
const {cs,sus} =require('./webSocketClient')



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
			subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED,sus(MESSAGE_CREATED,pubsub)),
		},
	},
}

module.exports = resolvers