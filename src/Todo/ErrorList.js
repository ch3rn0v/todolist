import React from 'react';
import PropTypes from 'prop-types';

export const ErrorList = ({ errorList }) => {
	return (
		<span>
			{errorList.map((errorText, index) => (
				<span className="error-list" key={index}>
					{errorText}
					<br />
				</span>
			))}
		</span>
	);
};

ErrorList.propTypes = {
	errorList: PropTypes.array.isRequired
};
