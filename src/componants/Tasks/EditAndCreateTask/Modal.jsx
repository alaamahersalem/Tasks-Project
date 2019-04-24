import React, { Component } from 'react';

import Modal from 'react-modal';
import EditAndCreateTask from './index';

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

class TaskModal extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			task: {},
			editMode: false
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(editMode, task) {
		this.setState({ task, editMode, modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	render() {
		const { task, editMode } = this.state;
		return (
			<Modal
				isOpen={this.state.modalIsOpen}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="row ">
					<button className="close" onClick={this.closeModal}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<form>
					<EditAndCreateTask closeModal={() => this.closeModal()} editMode={editMode} task={task} />
				</form>
			</Modal>
		);
	}
}

export default TaskModal;
