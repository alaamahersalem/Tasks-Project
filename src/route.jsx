import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Listing from './Container/index';

const Routing = () => (
	<Switch>
		<Route exact path="/" component={Listing} />
		<Route path="/categories/:id" key="id" component={Listing} />
	</Switch>
);

export default Routing;
