import React, { Component } from 'react';
import Modal from 'react-modal';
import { addSubTask, editSubTask } from '../../../Services';
import { AccountConsumer } from '../../../Container/Context';

import './styles.scss';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '40%'
	}
};

Modal.setAppElement(document.createElement('div'));
let stateContext = null;
class TaskModal extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			done: false,
			editMode: false
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(data, editMode) {
		editMode
			? this.setState({ subTaskId: data.subTaskId, name: data.subTaskName, modalIsOpen: true, editMode })
			: this.setState({ taskId: data.taskId, modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false, name: '', done: false });
	}
	async createSubTask(event) {
		event.preventDefault();
		const { name, done, taskId, editMode, subTaskId } = this.state;
		var data;
		if (editMode) {
			data = await editSubTask(subTaskId, { item: name });
			this.props.changeSubTaskName(data);
		} else {
			data = await addSubTask(taskId, { item: name, done, optional: false });
			stateContext.createSubTask(data);
		}
		this.closeModal();
	}

	render() {
		const { name, done, editMode } = this.state;
		return (
			<AccountConsumer>
				{(context) => {
					stateContext = context;
					return (
						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							onRequestClose={this.closeModal}
							style={customStyles}
							contentLabel="Example Modal"
						>
							<button className="close" onClick={this.closeModal}>
								<span aria-hidden="true">&times;</span>
							</button>
							<form className="subTaskform" onSubmit={(event) => this.createSubTask(event)}>
								<input
									required
									type="text"
									className="form-control"
									value={name}
									placeholder="please enter the name for the sub task"
									onChange={(event) => this.setState({ name: event.target.value })}
								/>
								{!editMode ? (
									<section className="checkSection">
										<input
											type="checkbox"
											checked={done}
											className="checkedInput"
											onChange={(event) => this.setState({ done: !done })}
										/>
										<span>Mark as done</span>
									</section>
								) : null}

								<button className="btn btn-outline-success btn-block col-8 offset-md-2">
									{editMode ? 'Edit' : 'Create'}
								</button>
							</form>
						</Modal>
					);
				}}
			</AccountConsumer>
		);
	}
}

export default TaskModal;
