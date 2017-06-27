import React from 'react';
import PropTypes from 'prop-types';

class ErrorList extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps;
    }

    render() {
        const errorList = this.props.errorList;

        return (
            <div>
                { errorList.map((errorText, index) => { return <span className="error-list" key={index}><p>{ errorText }</p></span>; }) }
            </div>
        );
    }
}

ErrorList.propTypes = {
    errorList: PropTypes.array.isRequired
};

export default ErrorList;