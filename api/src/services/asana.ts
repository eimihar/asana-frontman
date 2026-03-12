import asana from 'asana';
import config from '../config';

const client = asana.Client.create().useAccessToken(config.asana.accessToken);

export const asanaService = {
  async getWorkspaces() {
    return client.workspaces.getWorkspaces({});
  },

  async getProjects(workspaceId: string) {
    return client.projects.findByWorkspace(workspaceId, {
      opt_fields: 'name,notes,completed,archived,public,owner,start_on,due_on,workspace',
    });
  },

  async getProject(projectId: string) {
    return client.projects.findById(projectId, {
      opt_fields: 'name,notes,completed,archived,public,owner,start_on,due_on,workspace',
    });
  },

  async getSections(projectId: string) {
    return client.sections.findByProject(projectId, {
      opt_fields: 'name,project',
    });
  },

  async getSectionTasks(sectionId: string) {
    return client.tasks.getTasksForSection(sectionId, {
      opt_fields: 'name,notes,completed,archived,due_on,due_at,assignee,projects,sections,tags,created_at,modified_at',
    });
  },

  async getProjectTasks(projectId: string) {
    return client.tasks.findByProject(projectId, {
      opt_fields: 'name,notes,completed,archived,due_on,due_at,assignee,projects,sections,tags,created_at,modified_at',
    });
  },

  async getTask(taskId: string): Promise<any> {
    return client.tasks.getTask(taskId, {
      opt_fields: 'name,notes,completed,archived,due_on,due_at,assignee,projects,sections,tags,created_at,modified_at',
    });
  },

  // async createTask(projectId: string, data: { name: string; notes?: string; due_on?: string }) {
  //   return client.tasks.create({
  //     name: data.name,
  //     notes: data.notes,
  //     due_on: data.due_on,
  //     projects: [projectId],
  //   });
  // },

  async updateTask(taskId: string, data: { name?: string; notes?: string; completed?: boolean; due_on?: string }) {
    return client.tasks.updateTask(taskId, data);
  },

  // async addTaskToSection(sectionId: string, taskId: string) {
  //   return client.sections.addTask(sectionId, { task: {} });
  // },

  async getTags(projectId: string) {
    return client.tags.findAll();
  },

  async getUsers(workspaceId: string) {
    return client.users.findByWorkspace(workspaceId)
    // return client.workspaces.getWorkspaceMembers(workspaceId, {
    //   opt_fields: 'name,email,photo',
    // });
  },
};

export default asanaService;