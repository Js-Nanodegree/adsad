const {PubSub} = require('apollo-server')
const {sampleQuery, sampleSubscription} = require('./webSocketClient')

const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const orderResolvers = {
  Query: {
    orderQuery: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "order.query",
        params: [
          "market",
          "limit",
          "last_id"
        ]
      }
      const wsSend = sampleQuery(conText, msg).then(data => JSON.parse(data))
      return wsSend
    },
    orderHistory: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "order.query",
        params: [
          "market",
          "limit",
          "last_id"
        ]
      }
      const wsSend = sampleQuery(conText, msg).then(data => JSON.parse(data))
      return wsSend
    }
  },

  Subscription: {
    orderSubscribe: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
    orderUpdate: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
  },
}

module.exports = orderResolvers