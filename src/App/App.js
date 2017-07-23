import React from 'react';
import 'typeface-roboto';
import './Style.css';

import Grid from 'material-ui/Grid';

import { Header } from './Header';
import { List } from '../Todo/List';
import { Footer } from './Footer';

export class App extends React.Component {
	render() {
		return (
			<Grid container className="grid-root" justify="center" gutter={16}>
				<Grid item xs={12} md={6}>
					<Header />
					<div className="content-section">
						<List />
					</div>
					<Footer />
				</Grid>
			</Grid>
		);
	}
}
