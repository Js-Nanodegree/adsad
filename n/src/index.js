import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { AddPost } from "./components";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";


const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddPost />
        {/* <PostsList /> */}
      </div>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
