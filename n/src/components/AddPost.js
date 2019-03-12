import React from "react";
import { Query, Subscription } from "react-apollo";
import gql from "graphql-tag";


const getUsers = gql`
  {orderSubscribe(Apikey:"dsad" AuthShex:"sfadas" Nonce:151 params:"BTCUSD"){result{status}error id method}}
`;

const getSubscription =gql`
subscription{messageCreated{message{result{status}method id error}}}`


class OlsdWay extends React.Component {
  renderContent = ({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
      // console.log(data.messageCreated.content)
      <ul>
        <h2>OLD WAY</h2>
        {data.messageCreated.message.result.status}
      </ul>
    );
  };
  render() {

    return <Subscription subscription={getSubscription}>{this.renderContent}</Subscription>;
  }
  }

class OldWay extends React.Component {
  renderContent = ({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
      <ul>
        
          <div>{data.orderSubscribe.result.status}</div>
      </ul>
    );
  };
  render() {
    return <Query query={getUsers}>{this.renderContent}</Query>;
  }
  }


export const AddPost = () => {
 
  return (
    <div>
      <OldWay />
      <OlsdWay/>
    </div>
  );
};




























































// import {
//   ApolloProvider as ApolloHooksProvider,
//   useQuery,
// } from 'react-apollo-hooks';

// const client = new ApolloClient({
//   uri: 'https://graphql-pokemon.now.sh/graphql',
// });

// const GET_POKEMONS = gql(`
//   query getPokemons {
//     pokemons(first: 10) {
//       name
//     }
//   }
// `);

// // This is the new way using React Hooks and Suspense
// function NewWay() {
//   const { data, error } = useQuery(GET_POKEMONS);
//   if (error) return <div>Error</div>;
//   return (
//     <ul>
//       <h2>NEW WAY</h2>
//       {data.pokemons.map((pokemon, index) => (
//         <li key={index}>{pokemon.name}</li>
//       ))}
//     </ul>
//   );
// }


// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <ApolloHooksProvider client={client}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <NewWay />
//       </Suspense>
//     </ApolloHooksProvider>
//     <OldWay />
//   </ApolloProvider>,
//   document.getElementById('root')
// );

