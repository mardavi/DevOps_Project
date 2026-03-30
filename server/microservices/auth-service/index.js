import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import { connectDB } from "./config/db.js";
import { sessionMiddleware } from "./middleware/session.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import User from "./models/user.js";

const app = express();
const PORT = process.env.PORT || 4001;

await connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Auth service is running");
});

app.use(
    "/graphql",
    sessionMiddleware,
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            let user = null;

            try {
                if (req.session?.userId) {
                    user = await User.findById(req.session.userId);
                }
            } catch (error) {
                console.error("Context user load error:", error.message);
            }

            return { req, res, user };
        },
    })
);

app.listen(PORT, () => {
    console.log(`Auth service running at http://localhost:${PORT}/graphql`);
});