import { gql } from "@apollo/client";

export const GET_PROJECTS_BY_USER = gql`
  query GetProjectsByUser {
    projectsByUser {
      id
      title
      description
      owner
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String!) {
    createProject(title: $title, description: $description) {
      id
      title
      description
      owner
      createdAt
      updatedAt
    }
  }
`;

export const ADD_FEATURE_REQUEST = gql`
  mutation AddFeatureRequest(
    $projectId: ID!
    $title: String!
    $description: String!
  ) {
    addFeatureRequest(
      projectId: $projectId
      title: $title
      description: $description
    ) {
      id
      title
      description
      status
      createdAt
    }
  }
`;

export const SUBMIT_DRAFT = gql`
  mutation SubmitDraft($featureId: ID!, $content: String!) {
    submitDraft(featureId: $featureId, content: $content) {
      id
      content
      version
      createdAt
    }
  }
`;

export const GET_DRAFTS_BY_FEATURE = gql`
  query GetDraftsByFeature($featureId: ID!) {
    draftsByFeature(featureId: $featureId) {
      id
      content
      version
      createdAt
    }
  }
`;
