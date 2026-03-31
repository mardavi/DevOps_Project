import Project from "../models/Projects.js";
import FeatureRequest from "../models/FeatureRequest.js";
import Draft from "../models/Draft.js";

const resolvers = {
  Query: {
    projectsByUser: async (_, __, { requireAuth, user }) => {
      requireAuth();
      return Project.find({ owner: user.id }).sort({ createdAt: -1 });
    },

    project: async (_, { id }, { requireAuth, user }) => {
      requireAuth();

      const project = await Project.findById(id);
      if (!project) {
        throw new Error("Project not found");
      }

      if (project.owner !== user.id) {
        throw new Error("Access denied");
      }

      return project;
    },

    featureRequests: async (_, { projectId }, { requireAuth, user }) => {
      requireAuth();

      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      if (project.owner !== user.id) {
        throw new Error("Access denied");
      }

      return FeatureRequest.find({ projectId }).sort({ createdAt: -1 });
    },

    draftsByFeature: async (_, { featureId }, { requireAuth, user }) => {
      requireAuth();

      const feature = await FeatureRequest.findById(featureId);
      if (!feature) {
        throw new Error("Feature request not found");
      }

      const project = await Project.findById(feature.projectId);
      if (!project || project.owner !== user.id) {
        throw new Error("Access denied");
      }

      return Draft.find({ featureId }).sort({ createdAt: -1 });
    },
  },

  Mutation: {
    createProject: async (_, { title, description }, { requireAuth, user }) => {
      requireAuth();

      if (!title?.trim() || !description?.trim()) {
        throw new Error("Title and description are required");
      }

      const project = new Project({
        title,
        description,
        owner: user.id,
      });

      await project.save();
      return project;
    },

    addFeatureRequest: async (_, { projectId, title, description, status }, { requireAuth, user },) => {
      requireAuth();

      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      if (project.owner !== user.id) {
        throw new Error("Access denied");
      }

      if (!title?.trim() || !description?.trim()) {
        throw new Error("Title and description are required");
      }

      const featureRequest = new FeatureRequest({
        projectId,
        title,
        description,
        status: status || "open",
      });

      await featureRequest.save();
      return featureRequest;
    },

    submitDraft: async (_, { featureId, content, version }, { requireAuth, user },) => {
      requireAuth();

      const feature = await FeatureRequest.findById(featureId);
      if (!feature) {
        throw new Error("Feature request not found");
      }

      const project = await Project.findById(feature.projectId);
      if (!project || project.owner !== user.id) {
        throw new Error("Access denied");
      }

      if (!content?.trim()) {
        throw new Error("Draft content is required");
      }

      const draft = new Draft({
        featureId,
        author: user.id,
        content,
        version: version || 1,
      });

      await draft.save();
      return draft;
    },
  },
};

export default resolvers;
