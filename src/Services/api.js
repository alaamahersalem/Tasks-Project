const baseUrl = 'http://localhost:4000';
export const getCategories = `${baseUrl}/categories`;
export const fetchTasks = (categoryId) => `${baseUrl}/tasks?categoryId=${categoryId}`;
export const getSubTasks = (taskId) => `${baseUrl}/tasks/${taskId}/subtasks`;
export const editTask = (taskId) => `${baseUrl}/tasks/${taskId}`;
export const addTask = `${baseUrl}/tasks`;
export const changesubTaskChecked = (subtaskId) => `${baseUrl}/subtasks/${subtaskId}`;
export const addSubTask = (taskId) => `${baseUrl}/tasks/${taskId}/subtasks`;
export const editSubTask = (subtaskId) => `${baseUrl}/subtasks/${subtaskId}`;
