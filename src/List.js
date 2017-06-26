import React from 'react';
import ListItems from './ListItems';
import ItemInput from './ItemInput';
import Math from 'mathjs';

const DEFAULT_DISPLAYED_LIST = [
  {
    id: 0,
    checked: true,
    label: "Visit Awesome List main page"
  },
  {
    id: 1,
    checked: false,
    label: "Add my own item which will not be saved anywhere"
  }
];

const DEFAULT_OCCUPIED_IDS = [0, 1];

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      occupiedIDs: DEFAULT_OCCUPIED_IDS,
      displayedList: DEFAULT_DISPLAYED_LIST,
      doneItemsCount: this.countDoneItems(DEFAULT_DISPLAYED_LIST)
    };

    this.addListItemToDisplayedList = this.addListItemToDisplayedList.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
  }

  getCurrentItemsList() {
    return this.state.displayedList;
  }

  getOccupiedIDs() {
    return this.state.occupiedIDs;
  }

  getNextUniqueId() {
    return this.getOccupiedIDs()[this.getOccupiedIDs().length - 1] + 1;
  }

  getItemsCurrentIndexByItemsID(id) {
    let itemsCurrentIndex = -1;

    this.getCurrentItemsList().find((item, index) => {
      if (item.id === id) {
        itemsCurrentIndex = index;
      }
      return 0;
    });

    return itemsCurrentIndex;
  }

  countDoneItems(list) {
    return list.reduce((memo, item) => memo + +item.checked, 0);
  }

  setNewItemsList(newItemsList, newOccupiedIDs) {
    const doneItemsCount = this.countDoneItems(newItemsList);

    this.setState({
      occupiedIDs: newOccupiedIDs,
      displayedList: newItemsList,
      doneItemsCount: doneItemsCount
    });
  }

  addListItemToDisplayedList(item) {
    // Generate new ID
    item.id = this.getNextUniqueId();
    // Store new item
    let newDisplayedList = this.getCurrentItemsList();
    newDisplayedList.push(item);
    // Mark new ID as occupied
    let newOccupiedIDs = this.getOccupiedIDs();
    newOccupiedIDs.push(item.id);

    this.setNewItemsList(newDisplayedList, newOccupiedIDs);
  }

  onItemChange(id) {
    let newDisplayedList = this.getCurrentItemsList();
    let indexOfItemWithSpecifiedId = this.getItemsCurrentIndexByItemsID(id);

    if (indexOfItemWithSpecifiedId >=0 ) {
      newDisplayedList[indexOfItemWithSpecifiedId].checked = !newDisplayedList[indexOfItemWithSpecifiedId].checked;
      this.setNewItemsList(newDisplayedList, this.getOccupiedIDs());
    } else {
      throw new Error('No item found with the ID specified');
    }
  }

  onItemRemove(id) {
    let newDisplayedList = this.getCurrentItemsList();
    let indexOfItemWithSpecifiedId = this.getItemsCurrentIndexByItemsID(id);

    if (indexOfItemWithSpecifiedId >= 0) {
      newDisplayedList.splice(indexOfItemWithSpecifiedId, 1);
      this.setNewItemsList(newDisplayedList, this.getOccupiedIDs());
    } else {
      throw new Error('No item found with the ID specified');
    }
  }

  render() {
    const doneItemsCount = this.state.doneItemsCount;
    const totalItemsCount = this.getCurrentItemsList().length;

    return (
      <div className="List">
        <h1>Awesome List</h1>
        <h2>{ doneItemsCount } done, { totalItemsCount } total. { Math.round((doneItemsCount / totalItemsCount) * 100, 2) }% success!</h2>
        <ItemInput addItem={ this.addListItemToDisplayedList } />
        <ListItems itemsList={ this.getCurrentItemsList() } onItemChange={ this.onItemChange } onItemRemove={ this.onItemRemove } />
      </div>
    );
  }
}

export default List;