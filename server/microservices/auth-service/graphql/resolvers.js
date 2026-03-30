import bcrypt from "bcrypt";
import User from "../models/user.js";

export const resolvers = {
    Query: {
        currentUser: async (_, __, { req }) => {
            if (!req.session?.userId) return null;
            return await User.findById(req.session.userId);
        },
    },

    Mutation: {
        register: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({
                $or: [{ username }, { email }],
            });

            if (existingUser) {
                throw new Error("Username or email already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
            });

            return user;
        },

        login: async (_, { email, password }, { req }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new Error("Invalid Credentials");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error("Invalid credentials");
            }

            if (!req.session) {
                throw new Error("Session is not initialized");
            }

            req.session.userId = user._id;

            return user;
        },

        logout: async (_, __, { req, res }) => {
            return new Promise((resolve) => {
                req.session.destroy(() => {
                    res.clearCookie("sid");
                    resolve(true);
                });
            });
        },
    },
};