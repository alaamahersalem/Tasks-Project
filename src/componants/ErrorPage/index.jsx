import React from 'react';

import './styles.scss';

const ErrorPage = () => {
	return (
		<div className="ErrorPage">
			<div>
				<h3>
					<i class="fas fa-info-circle" />
				</h3>
			</div>
			<h3>Some Thing went wrong , please check your connection</h3>
		</div>
	);
};

export default ErrorPage;
