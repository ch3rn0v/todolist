import React from 'react';
import PropTypes from 'prop-types';

import SingleItem from './SingleItem';

class ListItems extends React.Component {
    render() {
        const items = this.props.itemsList.map((item, id) => {
            const changeItemState = () => { this.props.onItemChange(id); };
            const removeItem = () => { this.props.onItemRemove(id); };

            return <SingleItem
                key={ id }
                id={ id }
                checked={ item.checked }
                label={ item.label }
                onChange={ changeItemState }
                onRemove={ removeItem }
            />
        });

        return (
            <ul className="todo-list">{ items }</ul>
        );
    }
}

ListItems.propTypes = {
    onItemChange: PropTypes.func.isRequired,
    onItemRemove: PropTypes.func.isRequired
}

export default ListItems;