import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const DEFAULT_TODO_ITEMS = [
  {
    id: '0',
    label: 'Visit Awesome List main page',
    checked: true
  },
  {
    id: '1',
    label: 'Add my own item which will not be saved anywhere',
    checked: false
  }
];

class TodoItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: DEFAULT_TODO_ITEMS,
      onDoneItemsCountChange: props.onDoneItemsCountChange,
      onOverallItemsCountChange: props.onOverallItemsCountChange
    };

    this.onItemAdd = this.onItemAdd.bind(this);
    this.onItemCheckedStateChange = this.onItemCheckedStateChange.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
    this.onDoneItemsCountChange = this.onDoneItemsCountChange.bind(this);
    this.onTotalItemsCountChange = this.onTotalItemsCountChange.bind(this);
  }

  componentDidMount() {
    this.onDoneItemsCountChange();
    this.onTotalItemsCountChange();
  }

  onItemAdd(newItem) {
    let newItems = this.state.items;
    newItems.push(newItem);
    this.setState({
      items: newItems
    });
  }

  onItemRemove(id) {
    // Find
    let itemToRemoveIndex = -1;
    let newItems = this.state.items;
    newItems.find((item, index) => {
      if (item.id === id) {
        itemToRemoveIndex = index;
        return true;
      }
      return false;
    });
    // Remove
    newItems.splice(itemToRemoveIndex, 1);
    this.setState({
      items: newItems
    });
  }

  onItemCheckedStateChange(id, newCheckedState) {
    let newItems = this.state.items;
    newItems.find((item, index) => {
      if (item.id === id) {
        item.checked = newCheckedState;
        return true;
      }
      return false;
    });
    this.setState({
      items: newItems
    });
  }

  onDoneItemsCountChange() {
    const newDoneItemsCount = this.state.items.reduce((sum, item) => {
      return sum + item.checked;
    }, 0);
    this.state.onDoneItemsCountChange(newDoneItemsCount);
  }

  onTotalItemsCountChange() {
    const newTotalItemsCount = this.state.items.length;
    this.state.onOverallItemsCountChange(newTotalItemsCount);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Object.is(this.state, nextState);
  }

  componentDidUpdate() {
    this.onDoneItemsCountChange();
    this.onTotalItemsCountChange();
  }

  renderSingleItem(item) {
    return (
      <TodoItem
        key={item.id}
        id={item.id}
        label={item.label}
        checked={item.checked}
        onRemove={this.onItemRemove}
        onCheckedStateChange={this.onItemCheckedStateChange}
      />
    );
  }

  render() {
    return (
      <ul className="todo-list">
        {this.state.items.map(item => {
          return this.renderSingleItem(item);
        })}
      </ul>
    );
  }
}

TodoItems.propTypes = {
  onDoneItemsCountChange: PropTypes.func.isRequired,
  onOverallItemsCountChange: PropTypes.func.isRequired
};

export default TodoItems;
