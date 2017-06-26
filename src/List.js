import React from 'react';
import ListItems from './ListItems';
import ItemInput from './ItemInput';
import Math from 'mathjs';

class List extends React.Component {
  constructor(props) {
    super(props);

    const defaultDisplayedList = [
      {
        checked: true,
        label: "Visit Awesome List main page"
      },
      {
        checked: false,
        label: "Add my own item which will not be saved anywhere"
      }
    ];

    this.state = {
      displayedList: defaultDisplayedList,
      doneItemsCount: this.countDoneItems(defaultDisplayedList)
    };

    this.addListItemToDisplayedList = this.addListItemToDisplayedList.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
  }

  countDoneItems(list) {
    return list.reduce((memo, item) => {
        let result = 0;
        if (item.checked) {
          result = 1;
        }
        return memo + result;
      }, 0);
  }

  setNewItemsList(newList) {
    const doneItemsCount = this.countDoneItems(newList);

    this.setState({
      displayedList: newList,
      doneItemsCount: doneItemsCount
    });
  }

  addListItemToDisplayedList(item) {
    let newDisplayedList = this.state.displayedList;
    newDisplayedList.push(item);

    this.setNewItemsList(newDisplayedList);
  }

  getCurrentList() {
    return this.state.displayedList;
  }

  onItemChange(id) {
    let newDisplayedList = this.state.displayedList;
    newDisplayedList[id].checked = newDisplayedList[id].checked ? false : true;

    this.setNewItemsList(newDisplayedList);
  }

  onItemRemove(id) {
    let newDisplayedList = this.state.displayedList;
    newDisplayedList.splice(id, 1);

    this.setNewItemsList(newDisplayedList);
  }

  render() {
    const doneItemsCount = this.state.doneItemsCount;
    const totalItemsCount = this.state.displayedList.length;

    return (
      <div className="List">
        <h1>Awesome List</h1>
        <h2>{ doneItemsCount } done, { totalItemsCount } total. { Math.round((doneItemsCount / totalItemsCount) * 100, 2) }% success!</h2>
        <ItemInput addItem={ this.addListItemToDisplayedList } />
        <ListItems itemsList={ this.getCurrentList() } onItemChange={ this.onItemChange } onItemRemove={ this.onItemRemove } />
      </div>
    );
  }
}

export default List;