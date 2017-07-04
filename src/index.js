import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';
import { Router } from './Routing';

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
