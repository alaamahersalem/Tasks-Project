import React, { Component } from 'react';
import SubTask from '../SubTasks';

const TaskItem = ({ task }) => {
	return (
		<div>
			<div className="row">
				<span className="col-3">
					<b> Due Date:</b> {task.dueDate}
				</span>
				<span className="col-6">
					<b> Priority:</b> {task.priority}
				</span>
			</div>
			<div>
				<b> Description:</b> {task.description}
			</div>

			<SubTask task={task} categoryId={task.categoryId} />
		</div>
	);
};

export default TaskItem;
