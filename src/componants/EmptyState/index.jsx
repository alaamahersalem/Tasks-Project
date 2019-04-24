import React from 'react';
import './styles.scss';

const EmptyState = () => {
	return (
		<div className="emptyState">
			<div>
				<h3>
					<i className="fas fa-list-ul" />
				</h3>
			</div>
			<h3>No tasks here</h3>
		</div>
	);
};

export default EmptyState;
