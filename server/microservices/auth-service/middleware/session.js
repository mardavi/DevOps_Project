import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionMiddleware = session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
    }),
    cookie:{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
    },
});