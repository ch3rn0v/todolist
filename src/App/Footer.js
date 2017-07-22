import React from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export const Footer = () => {
	return (
		<Paper className="panel footer" elevation={4}>
			<Typography component="p" className="footer-text">
				MIT License. Source code available at{' '}
				<a href="https://github.com/ch3rn0v/todolist" rel="noopener noreferrer" target="_blank">
					https://github.com/ch3rn0v/todolist
				</a>.
			</Typography>
		</Paper>
	);
};
