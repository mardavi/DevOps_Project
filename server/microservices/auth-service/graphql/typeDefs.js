import gql from "graphql-tag";

export const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        currentUser: User
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User!
        login(email: String!, password: String!): User!
        logout: Boolean!
    }
`;