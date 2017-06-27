import React from 'react';

import Header from './Header';
import TodoStats from './TodoStats';
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalItems: 0,
            doneItems: 0
        };

        this.onNewItemAdded = this.onNewItemAdded.bind(this);
        this.onDoneItemsCountChange = this.onDoneItemsCountChange.bind(this);
        this.onOverallItemsCountChange = this.onOverallItemsCountChange.bind(this);
    }

    onDoneItemsCountChange(newDoneItemsCount) {
        this.setState({
            doneItems: newDoneItemsCount
        });
    }

    onOverallItemsCountChange(newTotalItemsCount) {
        this.setState({
            totalItems: newTotalItemsCount
        });
    }

    onNewItemAdded(newItem) {
        this.TodoItems.onItemAdd(newItem);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !Object.is(this.state, nextState);
    }

    render() {
        const doneItems = this.state.doneItems;
        const totalItems = this.state.totalItems;

        return (
            <div className="List">
                <Header />
                <TodoStats doneItems={ doneItems }
                           totalItems={ totalItems }/>
                <TodoInput onNewItemAdded={ this.onNewItemAdded }/>
                <TodoItems ref={ (TodoItems) => this.TodoItems = TodoItems }
                            onDoneItemsCountChange={ this.onDoneItemsCountChange }
                            onOverallItemsCountChange={ this.onOverallItemsCountChange }/>
            </div>
        );
    }
}

export default List;