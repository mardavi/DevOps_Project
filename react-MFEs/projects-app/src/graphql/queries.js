import { gql } from "@apollo/client";

export const PROJECTS_BY_USER_QUERY = gql`
  query ProjectsByUser {
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

export const FEATURE_REQUESTS_QUERY = gql`
  query FeatureRequests($projectId: ID!) {
    featureRequests(projectId: $projectId) {
      id
      projectId
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const DRAFTS_BY_FEATURE_QUERY = gql`
  query DraftsByFeature($featureId: ID!) {
    draftsByFeature(featureId: $featureId) {
      id
      featureId
      author
      content
      version
      createdAt
      updatedAt
    }
  }
`;
