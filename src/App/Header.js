import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export const Header = () => {
	return (
		<div className="header">
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography type="title" color="inherit">
						Awesome List
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};
