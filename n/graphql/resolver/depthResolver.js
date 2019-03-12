const {PubSub} = require('apollo-server')
const {sampleQuery, sampleSubscription} = require('./webSocketClient')

const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const depthResolvers = {
  Query: {
    depthQuery: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "depth.query",
        params: [
          "market",
          "limit",
          "Interval"
        ]
      }
      const wsSend = sampleQuery(conText,msg).then(data => JSON.parse(data))
      return wsSend
    }
  },

  Subscription: {
    depthSubscribe: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
    depthUpdate: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
  },
}

module.exports = depthResolvers