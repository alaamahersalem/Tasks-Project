import React, { Component } from 'react';
import { AccountConsumer } from '../../../Container/Context';
import { fetchSubtask, checkSubTask } from '../../../Services';
import EditModal from './EditAndCreateSubTask';
import { withRouter } from 'react-router-dom';
import './styles.scss';

let stateContext = null;
class SubTask extends Component {
	constructor(props) {
		super(props);
		this.state = { updatedTasks: {} };
		this.editModal = React.createRef();
	}

	async componentDidMount() {
		const { categoryId, task } = this.props;
		var data = await fetchSubtask(categoryId, task.id);
		stateContext.addSubTask(data);
	}
	async changeCheked(done, subtaskId) {
		var checkObj = { done: !done };
		const { updatedTasks } = this.state;
		var data = await checkSubTask(subtaskId, checkObj);
		var checked = { ...updatedTasks, [data.id]: { ...updatedTasks[data.id], done: data.done } };
		this.setState({ updatedTasks: checked });
	}
	openEditModal(subTaskName, subTaskId) {
		var editMode = true;
		var data = {
			subTaskName,
			subTaskId
		};
		this.editModal.current.openModal(data, editMode);
	}
	changeSubTaskName(data) {
		const { updatedTasks } = this.state;
		var checked = { ...updatedTasks, [data.id]: data };
		this.setState({ updatedTasks: checked });
	}
	render() {
		const { task } = this.props;
		const { updatedTasks } = this.state;

		return (
			<React.Fragment>
				<AccountConsumer>
					{(context) => {
						stateContext = context;
						return (
							task.subtasks &&
							task.subtasks.map((item, index) => {
								var checked =
									updatedTasks[item.id] !== undefined ? updatedTasks[item.id].done : item.done;
								var name =
									updatedTasks[item.id] && updatedTasks[item.id].item
										? updatedTasks[item.id].item
										: item.item;
								return (
									<div
										key={index}
										className=" offset-md-1 col-9 border border-success rounded subTask"
									>
										<input
											checked={checked}
											onChange={() => this.changeCheked(checked, item.id, task.id)}
											type="checkbox"
											className="checkedInput"
										/>
										<span>{name}</span>
										<i
											className="fas fa-pen float-right"
											onClick={() => this.openEditModal(item.item, item.id)}
											title={`Edit ${name}`}
										/>
										{/* </button> */}
									</div>
								);
							})
						);
					}}
				</AccountConsumer>
				<EditModal ref={this.editModal} changeSubTaskName={(data) => this.changeSubTaskName(data)} />
			</React.Fragment>
		);
	}
}

export default withRouter(SubTask);
