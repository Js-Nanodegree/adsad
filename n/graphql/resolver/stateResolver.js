const {PubSub} = require('apollo-server')
const {sampleQuery, sampleSubscription} = require('./webSocketClient')

const pubsub = new PubSub()
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const stateResolvers = {
  Query: {
    stateQuery: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "state.query",
        params: [
          "market",
          "period"
        ]
      }
      const wsSend = sampleQuery(conText,msg).then(data => JSON.parse(data))
      return wsSend
    }
  },

  Subscription: {
    stateSubscribe: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
    stateUpdate: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED, sampleSubscription(MESSAGE_CREATED, pubsub)),
    },
  },
}

module.exports = stateResolvers