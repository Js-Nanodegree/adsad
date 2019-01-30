const express = require ('express');
const hapi = require('hapi')
const { ApolloServer } =require ('apollo-server-express');
const app = express();



const schema = './Comp/Graph/schema'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});