import React, { Component } from 'react';
import { AccountConsumer } from '../../Container/Context';
import { fetchTasks } from '../../Services';
import { NavLink, withRouter } from 'react-router-dom';
import './styles.scss';

let stateContext = null;
class Categories extends Component {
	async changeTab(categoryId) {
		stateContext.changeCategory(categoryId);
		var tasks = await fetchTasks(categoryId);
		stateContext.addTasks(categoryId, tasks);
	}
	render() {
		const { match } = this.props;
		return (
			<AccountConsumer>
				{(context) => {
					stateContext = context;
					return (
						<div className="nav flex-column nav-pills">
							{context.categories.map((item, index) => {
								return (
									<div
										key={item.id}
										onClick={() => {
											this.changeTab(item.id);
										}}
									>
										<NavLink
											className={`${match.params.id == item.id ||
											(index === 0 && !match.params.id)
												? 'selected'
												: ''} nav-link`}
											to={`/categories/${item.id}`}
										>
											{item.name}
										</NavLink>
									</div>
								);
							})}
						</div>
					);
				}}
			</AccountConsumer>
		);
	}
}

export default withRouter(Categories);
