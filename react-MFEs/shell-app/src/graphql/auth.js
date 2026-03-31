import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      id
      username
      email
      role
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      role
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      email
      role
    }
  }
`;
