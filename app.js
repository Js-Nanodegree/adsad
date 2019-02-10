const express = require('express');
const {createServer} =require('http')
const  { ApolloServer,gql } =require ('apollo-server-express');
const WebSocketWorkr = require('./ws')
const app = express();
const server = createServer(app,
  (function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
}))
const schema = require('./Comp/Graph/schema')
const resolvers = require('./Comp/Graph/resolvers')
// const WebSocketServer = require('websocket').server



const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({req}) => {
    const headers = req.headers
    const body = req.body
    return { headers, body }
  },
  playground:true
});

apolloServer.applyMiddleware({ app, path: '/a' });

WebSocketWorkr(server)

server.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

