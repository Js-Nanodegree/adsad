import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from '../graphql/resolvers';
import Schema from '../graphql/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

export default params => server => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(params),
  });

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: executableSchema,
      onConnect: (params, socket) => {
        return console.log(socket, params);
      },
    },
    {
      server,
      path: '/subscriptions',
    }
  );
};
