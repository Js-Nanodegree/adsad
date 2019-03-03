import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from './resolvers';
import Schema from './schema';

export default params => {
  console.log(params);
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers,
  });

  const server = new ApolloServer({
    schema: executableSchema,
    context: async ({ req }) => ({ ...req }),
  });

  return server;
};

// npx babel-node server
