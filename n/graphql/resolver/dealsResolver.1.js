const {PubSub} = require('apollo-server')
const {sampleQuery, sampleSubscription} = require('./webSocketClient')

const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const dealsResolvers = {
  Query: {
    dealsQuery: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "deals.query",
        params: [
          "market",
          "limit",
          "last_id"
        ]
      }
      const wsSend = sampleQuery(conText,msg).then(data => JSON.parse(data))
      return wsSend
    }
  },

  Subscription: {
    dealsSubscribe: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
    dealsUpdate: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
  },
}

module.exports = dealsResolvers