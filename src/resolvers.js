let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
  export default me = users[1];
  
  export default resolvers = {
    Query: {
      user: (parent, { id }) => {
        return users[id];
      },
      me: () => {
        return me;
      },
    },
  };