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
let time ={
  time:`${Date.now().toString()}`
}

const me = users[1];


const resolvers = {
  Query: {
    users: () => {
      let a=users
      console.log(a)
      return (Object.values(users));
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (root, args, context) => {
      console.log({headers: context.headers, body: context.body, metods: context.headers.metods})
      return me;
    },
    time: () => {
      return {time:`${Date.now().toString()}`}
    },
  },
};


module.exports=resolvers