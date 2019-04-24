import axios from 'axios';
import * as Apis from './api';
import { ToastsStore } from 'react-toasts';

export const getCategories = () => {
	try {
		return new Promise(function(resolve, reject) {
			axios({
				method: 'get',
				url: Apis.getCategories
			})
				.then(function(response, reject) {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};

export const fetchTasks = async (categoryId) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'get',
				url: Apis.fetchTasks(categoryId)
			}).then(function(response) {
				resolve(response.data);
			});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};

export const fetchSubtask = async (categoryId, taskId) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'get',
				url: Apis.getSubTasks(taskId)
			}).then(function(response) {
				let payload = {
					taskId,
					categoryId,
					data: response.data
				};
				resolve(payload);
			});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};
export const editTask = async (data, taskId, taskCategory) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'PATCH',
				url: Apis.editTask(taskId),
				data
			})
				.then((res) => {
					var payload = {
						taskCategory,
						data: res.data
					};
					ToastsStore.success('The Task has been edited successfully');
					resolve(payload);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};

export const addNewTask = async (data) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'POST',
				url: Apis.addTask,
				data
			})
				.then((res) => {
					ToastsStore.success('The Task has been added successfully');
					resolve(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};

export const checkSubTask = async (subtaskId, data) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'PATCH',
				url: Apis.changesubTaskChecked(subtaskId),
				data
			})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};

export const addSubTask = async (taskId, data) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'POST',
				url: Apis.addSubTask(taskId),
				data
			})
				.then((res) => {
					var payload = {
						taskId,
						data: res.data
					};
					ToastsStore.success('The Sub-Task has been added successfully');
					resolve(payload);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};

export const editSubTask = async (subTaskId, data) => {
	try {
		return new Promise(function(resolve) {
			axios({
				method: 'PATCH',
				url: Apis.editSubTask(subTaskId),
				data
			})
				.then((res) => {
					ToastsStore.success('The Sub-Task has been edited successfully');
					resolve(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		return `Caught an error: ${error}`;
	}
};
