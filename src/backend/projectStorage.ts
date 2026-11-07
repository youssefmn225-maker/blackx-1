import { ProjectShard } from '../types';
import { EIGHT_OBSIDIAN_PROJECTS } from '../data/projects';

const STORAGE_KEY = 'black_x_admin_projects_v1';

export const getStoredProjects = (): ProjectShard[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored projects', e);
  }
  return EIGHT_OBSIDIAN_PROJECTS;
};

export const saveStoredProjects = (projects: ProjectShard[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects', e);
  }
};

export const resetStoredProjects = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting projects', e);
  }
  return EIGHT_OBSIDIAN_PROJECTS;
};
