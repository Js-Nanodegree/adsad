const { createServer } = require("http");
const { SubscriptionServer } =require('subscriptions-transport-ws')
const { execute, subscribe } =require('graphql')
const express = require("express");
const app = express();

const httpServer = createServer(app);
const PORT = 4000;

const resolvers = require("./graphql/resolver");
const schema = require("./graphql/schema");

const { ApolloServer } = require("apollo-server-express");
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  subscriptions: {
    onConnect: (req,res)=>console.log(req),
  },
  tracing: true
});

server.applyMiddleware({ app });

server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});
