import React from 'react';
import PropTypes from 'prop-types';

import SingleItem from './SingleItem';

class ListItems extends React.Component {
    render() {
        const items = this.props.itemsList.map((item, index) => {
            const changeItemState = () => { this.props.onItemChange(index); };
            const removeItem = () => { this.props.onItemRemove(index); };

            return <SingleItem
                key={ index }
                id={ index }
                checked={ item.checked }
                label={ item.label }
                display={ item.display }
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