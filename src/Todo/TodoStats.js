import React from 'react';
import PropTypes from 'prop-types';

import { countFractionPercent } from '../lib/todoHelpers';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

export const TodoStats = ({ doneItems, totalItems }) => {
	const completionPercent = countFractionPercent(doneItems, totalItems, 2);

	return (
		<Card className="panel">
			<CardContent>
				<Typography type="headline" component="h2">
					{doneItems} done out of {totalItems}. {completionPercent}% success.
				</Typography>
			</CardContent>
		</Card>
	);
};

TodoStats.propTypes = {
	doneItems: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired
};
