import graphql from './graphql';
import subscriptions from './subscriptions';

export default params => (
  {
    graphql: graphql(params),
    subscriptions: subscriptions(params),
  },
  console.log(1)
);
