require('dotenv').config();
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const express = require('express');
const app = express();
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');
const { SERVER_ADDRESS = 'http://localhost:', PORT = 4000 } = process.env;
const API_URL = process.env.API_URL || SERVER_ADDRESS + PORT;
const { JWT_SECRET = 'neverTell' } = process.env;

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async ({req}) => {
  //   const prefix = 'Bearer ';
  //   const auth = req.header('Authorization');
    
  //   if (!auth) { // nothing to see here
  //     throw new AuthenticationError('No valid login token found');
  //   } else if (auth.startsWith(prefix)) {
  //     const token = auth.slice(prefix.length);
  //     if (! token) throw new AuthenticationError('No valid login token found');
      
  //     try {
  //       const parsedToken = jwt.verify(token, JWT_SECRET);
        
  //       const id = parsedToken && parsedToken.id
  //       if (id) {
  //         req.user = await getUserById(id);
  //         next();
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   } else {
  //     next({
  //       name: 'AuthorizationHeaderError',
  //       message: `Authorization token must start with ${ prefix }`
  //     });
  //   }
  //   return { token, refreshedToken: await auth.refreshToken(token)};
});

// GET /health
app.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();
    const currentTime = new Date();
    const lastRestart = new Intl.DateTimeFormat('en', {timeStyle: 'long', dateStyle: 'long', timeZone: "America/Los_Angeles"}).format(currentTime - (uptime * 1000));
    res.send({message: 'healthy', uptime, currentTime, lastRestart});
  } catch (err) {
    next(err);
  }
});

app.use(cors());

// logging middleware
app.use(morgan('dev'));
// parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// REST routes

// GET /health
app.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();
    const currentTime = new Date();
    const lastRestart = new Intl.DateTimeFormat('en', {timeStyle: 'long', dateStyle: 'long', timeZone: "America/Los_Angeles"}).format(currentTime - (uptime * 1000));
    res.send({message: 'healthy', uptime, currentTime, lastRestart});
  } catch (err) {
    next(err);
  }
});

// static files
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

// attach graphQL server
gqlServer.applyMiddleware({app});

// by default serve up the react app if we don't recognize the route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// 404 handler
app.get('*', (req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message, table: error.table});
});

app.listen(PORT, () => {
  console.log(
    chalk.blueBright('Server is listening at'),
    chalk.yellow(API_URL),
    chalk.blueBright('Get your cheese on! GraphQL path = '),
    chalk.yellow(API_URL + gqlServer.graphqlPath),
  );
});
