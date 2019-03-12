const {PubSub} = require('apollo-server')
const {sampleQuery, sampleSubscription} = require('./webSocketClient')

const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const priceResolvers = {
  Query: {
    priceQuery: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "price.query",
        params: [
          "market",
          "result"
        ]
      }
      const wsSend = sampleQuery(conText,msg).then(data => JSON.parse(data))
      return wsSend
    }
  },

  Subscription: {
    priceSubscribe: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
    priceUpdate: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
  },
}

module.exports = priceResolvers