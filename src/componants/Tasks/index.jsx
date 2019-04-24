import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TaskItem from './TaskItem';
import EditTaskModal from './EditAndCreateTask/Modal';
import AddModal from './SubTasks/EditAndCreateSubTask';
import { AccountConsumer } from '../../Container/Context';
import './styles.scss';
import EmptyState from '../EmptyState';

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.modal = React.createRef();
		this.addModal = React.createRef();
	}

	openModal(task) {
		var Editmode = true;
		this.modal.current.openModal(Editmode, task);
	}
	openAddModal(taskId) {
		this.addModal.current.openModal({ taskId });
	}
	renderTasks(selectedTasks) {
		return (
			selectedTasks &&
			selectedTasks.map((task) => {
				return (
					<section key={task.id}>
						<div className="card">
							<div className="card-body">
								<h4 className="card-title">{task.name}</h4>
								<div className="task_btns float-right">
									<button
										className="btn btn-info"
										onClick={() => this.openModal(task)}
										title={`Edit ${task.name}`}
									>
										<span>...</span>
									</button>
								</div>
								<div className="card-subtitle mb-2 text-muted">
									<TaskItem task={task} />
								</div>
								<div className="task_btns float-right">
									<button className="btn btn-success" onClick={() => this.openAddModal(task.id)}>
										Add Sub Task
									</button>
								</div>
							</div>
						</div>
					</section>
				);
			})
		);
	}
	render() {
		return (
			<AccountConsumer>
				{(context) => {
					const { UsefilteredTaskes, filteredTaskes, tasks } = context;
					const categoryId = context.selectedTab;
					const selectedTasks = UsefilteredTaskes ? filteredTaskes : tasks[categoryId];

					return (
						<React.Fragment>
							{selectedTasks && selectedTasks.length === 0 ? (
								<EmptyState />
							) : (
								this.renderTasks(selectedTasks)
							)}

							<EditTaskModal ref={this.modal} />
							<AddModal ref={this.addModal} />
						</React.Fragment>
					);
				}}
			</AccountConsumer>
		);
	}
}

export default withRouter(Tasks);
