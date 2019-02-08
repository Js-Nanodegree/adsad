const { gql  } =require ('apollo-server-express');

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    time: Time
  }

  type User {
    id: ID!
    username: String!
  }
  type Time {
    time: String!
  }
`;

module.exports=schema