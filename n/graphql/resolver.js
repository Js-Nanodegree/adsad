const {PubSub} = require('apollo-server')
const {sampleQuery, sampleSubscription} = require('./webSocketClient')



const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const resolvers = {
  Query: {
    orderSubscribe: (root, args, context) => {
      const conText = (context.req.body.query)
      const wsSend = sampleQuery(conText).then(data => JSON.parse(data))
      return wsSend
    }
  },

  Subscription: {
    orderSubscribes: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
  },
}

module.exports = resolvers