// /*****  Setup a GraphQL subscription observable  ******************************/

const {execute} = require('apollo-link');
const {WebSocketLink} = require('apollo-link-ws');
const {SubscriptionClient} = require('subscriptions-transport-ws');
const ws = require('ws');

const getWsClient = function(wsurl) {
  const client = new SubscriptionClient(
    wsurl, {
      reconnect: true
    }, ws
  );
  return client;
};
const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  return execute(link, {
    query: query,
    variables: variables
  });
};

const gql = require('graphql-tag');
// A subscription query to get changes for author with parametrised id 
// using $id as a query variable
const SUBSCRIBE_QUERY = gql`
subscription{messageCreated{message{result{status} error id}}}
`;

const main = () => {
  const subscriptionClient = createSubscriptionObservable(
    'ws://localhost:4000/graphql', // GraphQL endpoint
    SUBSCRIBE_QUERY, // Subscription query
  // Query variables
  );
  subscriptionClient.subscribe(data => {
	console.log(data)
})}

main()

 
 
// wss.on('open', function open() {
// 	wss.send('something');
// });
 
// wss.on('message', function incoming(data) {
// 	const main = (data) => {
// 		const subscriptionClient = createSubscriptionObservable(
// 		  'ws://localhost:4000/graphql', // GraphQL endpoint
// 		  SUBSCRIBE_QUERY, // Subscription query
// 		// Query variables
// 		);
// 		subscriptionClient.subscribe(data => {
// 			console.log(data)
// 		  // Do something on receipt of the event
// 		  // console.log("Received event: ");
// 		  console.log({a:data})
		
// 	  })}
	  
// 	  main()
// });