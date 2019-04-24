import React, { Component } from 'react';

import { AccountConsumer } from '../../../Container/Context';
import { editTask, addNewTask } from '../../../Services';
import _ from 'lodash';

let stateContext = null;
class EditAndCreateTask extends Component {
	state = {
		name: '',
		dueDate: '',
		priority: '',
		category: '',
		categoryId: '',
		subtasks: []
	};

	static defaultProps = {
		editMode: false
	};

	async submitForm(event) {
		const { editMode, task, closeModal } = this.props;
		const { category, priority, dueDate, name, categoryId, priorityId, description } = this.state;
		var data = { name, dueDate, priority, category, categoryId, priorityId, description };

		event.preventDefault();
		if (editMode) {
			const editedTask = await editTask(data, task.id, task.categoryId);
			stateContext.editTask(editedTask);
			closeModal();
		} else {
			const newTask = await addNewTask(data);
			stateContext.addNewTask(newTask);
			closeModal();
		}
	}
	changeState(key, value) {
		this.setState({ [key]: value });
	}
	changeCategoryState(category) {
		const { categories } = stateContext;
		let categoryId = _.find(categories, { name: category }).id; //to get the id of category
		this.setState({
			category,
			categoryId
		});
	}
	changePriorityState(priority) {
		const { priorities } = stateContext;
		let priorityId = _.find(priorities, { name: priority }).id; //to get the id of priority
		this.setState({
			priority,
			priorityId
		});
	}

	componentDidMount() {
		const { task, editMode } = this.props;
		if (editMode) {
			const { name, dueDate, priority, categoryId, subtasks, description } = task;
			this.setState({ name, dueDate, priority, subtasks, categoryId, description });
		}
	}
	render() {
		const { name, dueDate, priority, categoryId, description } = this.state;
		const { editMode } = this.props;

		return (
			<AccountConsumer>
				{(context) => {
					stateContext = context;
					return (
						<React.Fragment>
							<form className="container" onSubmit={(event) => this.submitForm(event)}>
								<div className="form-group row">
									<span className="col-sm-4  colFormLabelSm col-form-label">Name</span>
									<div className="col-sm-8">
										<input
											required
											type="text"
											className="form-control"
											value={name}
											onChange={(event) => this.changeState('name', event.target.value)}
										/>
									</div>
								</div>
								<div className="form-group row">
									<span className="col-sm-4  colFormLabelSm col-form-label">Due Date</span>
									<div className="col-sm-8">
										<input
											type="date"
											required
											className="form-control"
											value={dueDate}
											onChange={(event) => this.changeState('dueDate', event.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row">
									<span className="col-sm-4  colFormLabelSm col-form-label">Description</span>
									<div className="col-sm-8">
										<textarea
											required
											type="description"
											className="form-control"
											value={description}
											onChange={(event) => this.changeState('description', event.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row">
									<span className="col-sm-4  colFormLabelSm col-form-label">Category</span>
									<div className="col-sm-8">
										<select
											required
											onChange={(event) => this.changeCategoryState(event.target.value)}
											name="Category"
											className="form-control"
										>
											<option value="" selected disabled>
												Choose here
											</option>
											{context.categories.map((category) => {
												return (
													<option
														selected={categoryId === category.id}
														key={category.id}
														value={category.name}
													>
														{category.name}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="form-group row">
									<span className="col-sm-4  colFormLabelSm col-form-label"> Priority</span>
									<div className="col-sm-8">
										<select
											required
											onChange={(event) => this.changePriorityState(event.target.value)}
											name="Priority"
											className="form-control"
										>
											<option value="" selected disabled>
												Choose here
											</option>
											{context.priorities.map((item, index) => {
												return item.name !== 'All' ? (
													<option
														selected={priority === item.name}
														key={index}
														value={item.name}
													>
														{item.name}
													</option>
												) : null;
											})}
										</select>
									</div>
								</div>

								<button className="btn btn-outline-info btn-block col-8  offset-md-2" type="submit">
									{editMode ? 'Edit' : 'Create'}
								</button>
							</form>
						</React.Fragment>
					);
				}}
			</AccountConsumer>
		);
	}
}

export default EditAndCreateTask;
