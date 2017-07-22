import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';
import { MuiThemeProvider } from 'material-ui/styles';

ReactDOM.render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
);
