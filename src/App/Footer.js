import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

export const Footer = () => {
	return (
		<Card className="panel">
			<CardContent>
				<Typography component="p" className="footer-text">
					MIT License. Source code available at{' '}
					<a href="https://github.com/ch3rn0v/todolist" rel="noopener noreferrer" target="_blank">
						https://github.com/ch3rn0v/todolist
					</a>.
				</Typography>
			</CardContent>
		</Card>
	);
};
