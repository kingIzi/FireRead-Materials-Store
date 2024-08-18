// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { onRequest } from "firebase-functions/v2/https";
import { typeDefs } from "./schemas/schema";
import { resolvers } from "./resolvers/resolvers";
import { validateFirebaseIdToken } from "./middlewares/auth-middleware";

const app = express();
app.use(validateFirebaseIdToken);
const server = new ApolloServer({ typeDefs, resolvers: resolvers() });

const run = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/", cors: true });
  app.use(server.getMiddleware());
};

export const graphql = onRequest(app);

run();
