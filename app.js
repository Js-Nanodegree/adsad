const express = require('express');
const  { ApolloServer,gql } =require ('apollo-server-express');

const app = express();

const schema = require('./Comp/Graph/schema')
const resolvers = require('./Comp/Graph/resolvers')

// const c =require('./res')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({req}) => {
    const headers = req.headers
    const body = req.body
    return { headers, body }
  },
  playground:true
});

server.applyMiddleware({ app, path: '/a' });

// console.log(c)


app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});