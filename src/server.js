import Express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

import {
  errorLink,
  subscriptionLink,
  requestLink,
  queryOrMutationLink,
} from './links';


import Html from './routes/Html';
import Layout from './routes/Layout';

let PORT = 3000;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
}

const API_HOST =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3010'
    : 'https://api.githunt.com';

// #############################

import { Server } from 'http'

const app = new Express();
const server = Server(app)

// #############################


const apiProxy = proxy({ target: API_HOST, changeOrigin: true });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/login', apiProxy);
app.use('/logout', apiProxy);

if (process.env.NODE_ENV === 'production') {
  // In production we want to serve our JS from a file on the filesystem.
  app.use('/static', Express.static(path.join(process.cwd(), 'build/client')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(
    '/static',
    proxy({ target: 'http://localhost:3020', pathRewrite: { '^/static': '' } })
  );
}

// #############################

const links = [
  errorLink,
  queryOrMutationLink({
    fetch,
    uri: `${API_HOST}/graphql`,
  }),
];

// #############################


// support APQ in production
if (process.env.NODE_ENV === 'production') {
  links.unshift(createPersistedQueryLink());
}

// #############################

import services from './Apollo'
import Loadable, { Capture } from 'react-loadable';


const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  switch (name) {
    case 'graphql':
      services[name].applyMiddleware({ app });
      break;
    case 'subscriptions':
      Loadable.preloadAll().then(() => {
        server.listen(process.env.PORT ? process.env.PORT : 8000, () => {
          console.log('Listening on port ' + (process.env.PORT ? process.env.PORT : 8000) + '!');
          services[name](server);
        });
      });
      break;
    default:
      app.use(`/${name}`, services[name]);
      break;
  }
}

// #############################

app.use(
  (req, res, next) => {
    const options = { keys: ['Some random keys'] };
    req.cookies = new Cookies(req, res, options);
    next();
  }
);

// #############################

app.get('*', async (req, res) => {
  const client = ApolloClient(req, loggedIn);
  const context = {};
  const modules = [];
  const App = (<Capture report={moduleName => modules.push(moduleName)}><Graphbook client={client} loggedIn={loggedIn} location={req.url} context={context} /></Capture>);
  renderToStringWithData(App).then((content) => {
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      var bundles;
      if (process.env.NODE_ENV !== 'development') {
        bundles = getBundles(stats, Array.from(new Set(modules)));
      } else {
        bundles = [];
      }
      const initialState = client.extract();
      const head = Helmet.renderStatic();
      res.status(200);
      res.send(`<!doctype html>\n${template(content, head, initialState, bundles)}`);
      res.end();
    }
  });
});

// #############################

app.set('host', process.env.SERVER_HOST || 'localhost');
app.set('port', port);

// #############################

import fetch from 'node-fetch'
import { HttpLinkcreateHttpLink } from 'apollo-link-http';


const link = new createHttpLink({
  uri: Api,
  credentials: 'same-origin',
  fetch: fetch
})

// #############################

import ApolloClient from './ssr/apollo';
import Graphbook from './ssr/';
import template from './ssr/template';
import { Helmet } from 'react-helmet';


app.get("*", async (req, res) => {
  const content = {}
  // const apiUrl = process.env.API_PATH
  // const apiUrl = 'http://192.168.0.15:8080';
  // const cache = new InMemoryCache();

  // const client = new ApolloClient({
  //   ssrMode: true,
  //   ssrForceFetchDelay: 100,
  //   link: link,
  //   // link:ApolloLink.from(links),
  //   cache: cache
  // })

  // const component = (
  //   <ApolloProvider client={client}>
  //     <StaticRouter location={req.url} context={context}>
  //       <Layout />
  //     </StaticRouter>
  //   </ApolloProvider>
  // );

  // // #############################

  // const client = ApolloClient(req, loggedIn);
  // const context = {};
  // const modules = [];

  // const App = (
  //   <Capture report={moduleName => modules.push(moduleName)}>
  //     <Graphbook client={client} location={req.url} context={context} />
  //   </Capture>);
  // renderToStringWithData(App).then((content) => {
  //   if (context.url) {
  //     res.redirect(301, context.url);
  //   } else {
  //     var bundles;
  //     if (process.env.NODE_ENV !== 'development') {
  //       bundles = getBundles(stats, Array.from(new Set(modules)));
  //     } else {
  //       bundles = [];
  //     }
  //     const initialState = client.extract();
  //     const head = Helmet.renderStatic();
  //     res.status(200);
  //     res.send(`<!doctype html>\n${template(content, head, initialState, bundles)}`);
  //     res.end();
  //   }
  // });

  // #############################

  // // ?????????????????????????????

  // const content = await renderToStringWithData(component);
  // const initialState = cache.extract();
  // const helmet = Helmet.renderStatic();
  // const html = (
  //   <Html helmet={helmet} content={content} state={initialState} />
  // );

  // renderToStringWithData(component)
  //   .then(content => {
  //     res.status(200);
  //     const html = <Html content={content} client={client} />;
  //     res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
  //     res.end();
  //   })
  //   .catch(e => {
  //     console.error('RENDERING ERROR:', e); // eslint-disable-line no-console
  //     res.status(500);
  //     res.end(
  //       `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${
  //       e.stack
  //       }`
  //     );
  //   });

});



export default server