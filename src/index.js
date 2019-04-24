import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
		<React.Fragment>
			<ToastsContainer store={ToastsStore} />
			<App />
		</React.Fragment>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
