import React from 'react';
import Math from 'mathjs';
import PropTypes from 'prop-types';

function TodoStats({ doneItems, totalItems }) {
	// TODO: move completionPercent to a helper funcs lib
	const completionPercent = totalItems > 0 ? Math.round(doneItems / totalItems * 100.0, 2) : 0;

	return (
		<h2>
			{doneItems} done out of {totalItems}. {completionPercent}% success.
		</h2>
	);
}

TodoStats.propTypes = {
	doneItems: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired
};

export default TodoStats;
