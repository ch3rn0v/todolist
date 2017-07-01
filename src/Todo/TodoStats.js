import React from 'react';
import PropTypes from 'prop-types';

import { countFractionPercent } from '../lib/todoHelpers';

export const TodoStats = ({ doneItems, totalItems }) => {
	const completionPercent = countFractionPercent(doneItems, totalItems, 2);

	return (
		<h2>
			{doneItems} done out of {totalItems}. {completionPercent}% success.
		</h2>
	);
};

TodoStats.propTypes = {
	doneItems: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired
};
