import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import { Post } from "./Post";

const getPosts = gql`
  subscription getPosts {
    posts(order_by: { timestamp: desc }) {
      id
      subject
      content
      user {
        firstName
        lastName
      }
      timestamp
    }
  }
`;

// export const PostsList = () => (
//   <Query query={getPosts}>
//     {({ data, error, loading }) => {
//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>Error...</div>;
//       return data.posts.map(Post);
//     }}
//   </Query>
// );

export const PostsList = () => (
  <Subscription subscription={getPosts}>
    {({ data, error, loading }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error...</div>;
      return data.posts.map(Post);
    }}
  </Subscription>
);
