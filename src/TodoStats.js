import React from 'react';
import Math from 'mathjs';
import PropTypes from 'prop-types';

class TodoStats extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  render() {
    const doneItemsCount = this.props.doneItems;
    const totalItemsCount = this.props.totalItems;
    const completionPercent = Math.round(
      doneItemsCount / totalItemsCount * 100.0,
      2
    );

    return (
      <h2>
        {doneItemsCount} done out of {totalItemsCount}. {completionPercent}%
        success.
      </h2>
    );
  }
}

TodoStats.propTypes = {
  doneItems: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired
};

export default TodoStats;
