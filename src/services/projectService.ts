import Project from "../models/Project";

export const createProject = async (userId: string, projectData: any) => {
  const project = new Project({ user: userId, ...projectData });
  await project.save();
  return project;
};

export const getProjects = async (userId: string) => {
  return await Project.find({ user: userId });
};

export const updateProject = async (projectId: string, updatedData: any) => {
  return await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
};

export const deleteProject = async (projectId: string) => {
  return await Project.findByIdAndDelete(projectId);
};
