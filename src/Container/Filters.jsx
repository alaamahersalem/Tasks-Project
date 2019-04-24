import React, { Component } from 'react';
import { AccountConsumer } from './Context';
import Modal from '../componants/Tasks/EditAndCreateTask/Modal';
import { withRouter } from 'react-router-dom';
import './styles.scss';

let stateContext = null;
class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			priority: 'All'
		};
		this.createModal = React.createRef();
	}

	openModal() {
		this.createModal.current.openModal(false);
	}
	clearFilter() {
		this.setState({
			query: '',
			priority: 'All'
		});
		stateContext.clearFilter();
	}
	render() {
		const { priority, query } = this.state;
		return (
			<AccountConsumer>
				{(context) => {
					stateContext = context;
					return (
						<div className="row  filter_container">
							<section className="col-8 row ">
								<div className="col-3">
									<select
										name="priority"
										className="form-control"
										onChange={(event) => this.setState({ priority: event.target.value })}
									>
										{context.priorities.map((item, index) => {
											return (
												<option selected={priority === item.name} value={item.name} key={index}>
													{item.name}
												</option>
											);
										})}
									</select>
								</div>
								<div className="col-3 ">
									<input
										className="form-control"
										onChange={(event) => this.setState({ query: event.target.value })}
										type="text"
										value={query}
										placeholder="Filter by name "
									/>
								</div>
								<button className="col-2 btn  btn-info" onClick={() => context.filter(priority, query)}>
									Filter
								</button>
								<button className="col-2 btn  btn-info clear_Filter" onClick={() => this.clearFilter()}>
									Clear Filter
								</button>
							</section>
							<section className="col-4  ">
								<button className="btn  btn-secondary  float-right " onClick={() => this.openModal()}>
									<i className="fas fa-plus" />
									Create New Task
								</button>
							</section>
							<Modal ref={this.createModal} />
						</div>
					);
				}}
			</AccountConsumer>
		);
	}
}
export default withRouter(Filters);
