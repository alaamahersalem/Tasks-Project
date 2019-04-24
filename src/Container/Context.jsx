import React from 'react';
import _ from 'lodash';
const AccountContext = React.createContext();

export const AccountConsumer = AccountContext.Consumer;

class AccountProvider extends React.Component {
	state = {
		priorities: [ { name: 'All' }, { id: 1, name: 'Heigh' }, { id: 2, name: 'Medium' }, { id: 3, name: 'Low' } ],
		categories: [],
		tasks: {},
		selectedTab: 1,
		UsefilteredTaskes: 0,
		filteredTaskes: [],
		addCategories: (categories) => this.addCategories(categories),
		changeCategory: (categoryId) => this.changeCategory(categoryId),
		addTasks: (categoryId, data) => this.addTasks(categoryId, data),
		addSubTask: (data) => this.addSubTask(data),
		editTask: (data) => this.editTask(data),
		addNewTask: (data) => this.addNewTask(data),
		filter: (priority, query) => this.filter(priority, query),
		createSubTask: (payload) => this.createSubTask(payload),
		clearFilter: () => this.clearFilter()
	};
	addCategories(categories) {
		this.setState({ categories });
	}
	changeCategory(selectedTab) {
		this.setState({ selectedTab, UsefilteredTaskes: 0 });
	}
	clearFilter() {
		this.setState({ UsefilteredTaskes: 0 });
	}
	addTasks(categoryId, data) {
		var tasks = JSON.parse(JSON.stringify(this.state.tasks));
		tasks[categoryId] = _.orderBy(data, 'priorityId', 'asc');
		this.setState({ tasks });
	}
	addSubTask(payload) {
		const { data, taskId } = payload;
		const { selectedTab } = this.state;
		var state = JSON.parse(JSON.stringify(this.state));

		state.tasks[selectedTab].map((item) => {
			if (item.id === taskId) item.subtasks = data;
		});

		this.setState({ tasks: state.tasks });
	}
	createSubTask(payload) {
		const { data, taskId } = payload;
		const { selectedTab, filteredTaskes, UsefilteredTaskes } = this.state;
		var state = JSON.parse(JSON.stringify(this.state));
		state.tasks[selectedTab].map((item) => {
			if (item.id === taskId) item.subtasks ? item.subtasks.push(data) : (item.subtasks = [ data ]);
		});
		if (UsefilteredTaskes) {
			filteredTaskes.map((item) => {
				if (item.id === taskId) {
					item.subtasks ? item.subtasks.push(data) : (item.subtasks = [ data ]);
				}
			});
		}
		this.setState({ tasks: state.tasks, filteredTaskes });
	}
	editTask(payload) {
		var tasks = Object.assign({}, this.state.tasks);
		const { taskCategory, data } = payload;
		var filteredTask;
		if (taskCategory === data.categoryId) {
			filteredTask = tasks[data.categoryId].map((item) => {
				if (item.id === data.id) {
					return Object.assign({}, data, { subtasks: item.subtasks });
				}
				return item;
			});
			this.setState({ tasks: { [data.categoryId]: filteredTask } });
		} else {
			filteredTask = tasks[taskCategory].filter((item) => {
				return item.id !== data.id;
			});
			this.setState({ tasks: { [taskCategory]: filteredTask } });
		}

		if (this.state.UsefilteredTaskes) {
			var Arr = this.state.filteredTaskes.map((item) => {
				if (item.id === data.id) {
					return Object.assign({}, data, { subtasks: item.subtasks });
				}
			});

			this.setState({ filteredTaskes: Arr });
		}
	}
	addNewTask(data) {
		const { categoryId } = data;
		var tasks = JSON.parse(JSON.stringify(this.state.tasks));
		if (tasks[categoryId]) {
			var arr = tasks[categoryId].push(data);
			_.orderBy(arr, 'priorityId', 'asc');
		} else {
			tasks[categoryId] = [ data ];
		}
		this.setState({ tasks });
	}
	filter(priority, query) {
		const { tasks, selectedTab } = this.state;
		var tasksArr = JSON.parse(JSON.stringify(tasks[selectedTab]));
		var firstFilter = query
			? tasksArr.filter((task) => {
					return task.name.includes(query);
				}) // this check i the user change the query  only not the priority
			: tasksArr;
		var secondFilter = priority
			? firstFilter.filter((task) => {
					return priority === 'All' ? task : task.priority === priority;
				})
			: firstFilter; // this check i the user change the priority only not the query

		this.setState({ filteredTaskes: secondFilter, UsefilteredTaskes: 1 });
	}

	render() {
		return <AccountContext.Provider value={this.state}>{this.props.children}</AccountContext.Provider>;
	}
}
export default AccountProvider;
