import React from 'react';
import PropTypes from 'prop-types';

const REMOVE_LABEL = 'Remove';
const CANCEL_REMOVAL_LABEL = 'Cancel';

class RemoveItemButton extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !Object.is(this.props, nextProps);
  }

  render() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.isRemovingInProgress ? CANCEL_REMOVAL_LABEL : REMOVE_LABEL}
      </button>
    );
  }
}

RemoveItemButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isRemovingInProgress: PropTypes.bool.isRequired
};

export default RemoveItemButton;
