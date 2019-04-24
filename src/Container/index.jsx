import React, { Component } from 'react';

import AccountProvider, { AccountConsumer } from './Context';
import { getCategories, fetchTasks } from '../Services';
import Filters from './Filters';
import Categories from '../componants/Categories';
import Tasks from '../componants/Tasks';
import ErrorPage from '../componants/ErrorPage';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';

let stateContext = null;
class Listing extends Component {
	state = {
		hasError: false
	};
	async componentDidMount() {
		try {
			const { match } = this.props;
			const categoryId = match.params.id || stateContext.selectedTab;
			stateContext.changeCategory(categoryId);
			var categories = await getCategories();
			stateContext.addCategories(categories);
			var tasks = await fetchTasks(categoryId);
			stateContext.addTasks(categoryId, tasks);
		} catch (error) {
			this.setState({ hasError: true });
			debugger;
		}
	}

	render() {
		const { hasError } = this.state;
		return (
			<React.Fragment>
				{hasError ? (
					<ErrorPage />
				) : (
					<AccountProvider>
						<AccountConsumer>
							{(context) => {
								stateContext = context;
								return (
									<React.Fragment>
										<Filters />
										<div className="row categories_container">
											<div className=" categories col-2">
												<Categories />
											</div>
											<div className="col-9">
												<Tasks />
											</div>
										</div>
									</React.Fragment>
								);
							}}
						</AccountConsumer>
					</AccountProvider>
				)}
			</React.Fragment>
		);
	}
}
export default Listing;
