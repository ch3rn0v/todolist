import React from 'react';
import ListItems from './ListItems';
import ItemInput from './ItemInput';
import Math from 'mathjs';

const DEFAULT_DISPLAYED_LIST = [
  {
    checked: true,
    label: "Visit Awesome List main page",
    display: true
  },
  {
    checked: false,
    label: "Add my own item which will not be saved anywhere",
    display: true
  }
];

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedList: DEFAULT_DISPLAYED_LIST
    };

    this.addListItemToDisplayedList = this.addListItemToDisplayedList.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
  }

  getCurrentItemsList() {
    return this.state.displayedList;
  }

  countDoneItems(list) {
    return list.reduce((memo, item) => { return memo + item.checked }, 0);
  }

  setNewItemsList(newItemsList) {
    this.setState({
      displayedList: newItemsList
    });
  }

  addListItemToDisplayedList(item) {
    let newDisplayedList = this.getCurrentItemsList();
    newDisplayedList.push(item);

    this.setNewItemsList(newDisplayedList);
  }

  onItemChange(id) {
    let newDisplayedList = this.getCurrentItemsList();
    newDisplayedList[id].checked = !newDisplayedList[id].checked;

    this.setNewItemsList(newDisplayedList);
  }

  onItemRemove(id) {
    let newDisplayedList = this.getCurrentItemsList();
    newDisplayedList[id].display = false;

    this.setNewItemsList(newDisplayedList);
  }

  render() {
    const doneItemsCount = this.countDoneItems(this.getCurrentItemsList());
    const totalItemsCount = this.getCurrentItemsList().length;

    return (
      <div className="List">
        <h1>Awesome List</h1>
        <h2>{ doneItemsCount } done, { totalItemsCount } total. { Math.round((doneItemsCount / totalItemsCount) * 100, 2) }% success!</h2>
        <ItemInput addItem={ this.addListItemToDisplayedList } />
        <ListItems  itemsList={ this.getCurrentItemsList() }
                    onItemChange={ this.onItemChange }
                    onItemRemove={ this.onItemRemove } />
      </div>
    );
  }
}

export default List;