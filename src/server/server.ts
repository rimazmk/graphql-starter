import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema'
import { context } from './context'

const app = express();
const Bundler = require('parcel-bundler');

const file = 'src/client/index.html';
const options = { production: process.env.NODE_ENV === 'production' }; 

const bundler = new Bundler(file, options);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    context: context,
    graphiql: true,
  }),
)
app.use(bundler.middleware());

app.listen(4000)
console.log(`\
🚀 Server ready at: http://localhost:4000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
`)
