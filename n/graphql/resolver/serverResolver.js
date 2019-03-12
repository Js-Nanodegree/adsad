const {sampleQuery} = require('./webSocketClient')

const serverResolver = {
  Query: {
    serverPing: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "server.ping",
        params: []
      }
      const wsSend = sampleQuery(conText, msg).then(data => JSON.parse(data))
      return wsSend
    },
    serverTime: (root, args, context) => {
      const conText = (context.req.body.query)
      const msg = {
        metod: "server.time",
        params: []
      }
      const wsSend = sampleQuery(conText, msg).then(data => JSON.parse(data))
      return wsSend
    }
  },
}

module.exports = serverResolver