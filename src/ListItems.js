import React from 'react';
import PropTypes from 'prop-types';

import SingleItem from './SingleItem';

class ListItems extends React.Component {
    render() {
        const items = this.props.itemsList.map((item) => {
            const changeItemState = () => { this.props.onItemChange(item.id); };
            const removeItem = () => { this.props.onItemRemove(item.id); };

            return <SingleItem
                key={ item.id }
                id={ item.id }
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
    onItemRemove: PropTypes.func.isRequired,
    itemsList: PropTypes.array.isRequired
}

export default ListItems;