import React from 'react';
import PropTypes from 'prop-types';

function ErrorList({ errorList }) {
  return (
    <div>
      {errorList.map((errorText, index) =>
        <span className="error-list" key={index}>
          <p>
            {errorText}
          </p>
        </span>,
      )}
    </div>
  );
}

ErrorList.propTypes = {
  errorList: PropTypes.array.isRequired,
};

export default ErrorList;
