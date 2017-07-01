import React from 'react';
import PropTypes from 'prop-types';

const REMOVE_LABEL = 'Remove';
const CANCEL_REMOVAL_LABEL = 'Cancel';

export const RemoveItemButton = ({ isRemovingInProgress, onClick }) => {
	return (
		<button onClick={onClick}>
			{isRemovingInProgress ? CANCEL_REMOVAL_LABEL : REMOVE_LABEL}
		</button>
	);
};

RemoveItemButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	isRemovingInProgress: PropTypes.bool.isRequired
};
