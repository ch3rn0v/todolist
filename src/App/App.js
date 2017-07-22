import React from 'react';
import 'typeface-roboto';
import './Style.css';

import { Header } from './Header';
import { List } from '../Todo/List';
import { Footer } from './Footer';

export class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Header />
				<div className="content-section">
					<List />
				</div>
				<Footer />
			</div>
		);
	}
}
