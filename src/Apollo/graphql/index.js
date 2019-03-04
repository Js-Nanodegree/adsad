import AppModule from './graphql/modules';
import { ApolloServer } from 'apollo-server-express';


const { schema, context } = AppModule;

const apolloServer = new ApolloServer({
  schema,
  context,
  formatError: error => {
    console.log(error); // TODO only dev

    if (error.message.indexOf('get_method') != -1) return 'bad request';

    if (error.message.indexOf('Cannot query field') != -1)
      return 'incorrect request';

    if (error.message.indexOf('Cannot read property') != -1)
      return 'incorrect request';

    if (error.message.indexOf('required but not provided') != -1)
      return 'incorrect arguments';

    if (error.message === 'AUTH_FAILED') return 'authentication failed';
  },

  playground: true, // TODO only dev
});

export default {graphql:  apolloServer}