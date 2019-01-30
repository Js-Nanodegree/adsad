const { ApolloServer,gql  } =require ('apollo-server-express');

export const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;