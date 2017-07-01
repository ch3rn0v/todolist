import React from 'react';

import { addNewItemToArray, removeItemFromArray, toggleItemStatusInArray } from './lib/todoHelpers';

import { Header } from './Header';
import { TodoStats } from './TodoStats';
import TodoInput from './TodoInput';
import { TodoItems } from './TodoItems';
import { Footer } from './Footer';

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

class List extends React.Component {
	state = {
		todos: DEFAULT_TODO_ITEMS
	};

	onNewItemAdded = (itemToBeAdded) => {
		this.setState({
			todos: addNewItemToArray(this.state.todos, itemToBeAdded)
		});
	};

	onTodoRemove = (itemToBeRemoved) => {
		this.setState({
			todos: removeItemFromArray(this.state.todos, itemToBeRemoved)
		});
	};

	onTodoStatusChange = (itemToBeChanged) => {
		this.setState({
			todos: toggleItemStatusInArray(this.state.todos, itemToBeChanged)
		});
	};

	render() {
		const todos = this.state.todos;
		const totalItems = todos.length;
		const doneItems = todos.filter((x) => x.checked).length;

		return (
			<div className="List">
				<Header />
				<div className="list-container">
					<TodoStats doneItems={doneItems} totalItems={totalItems} />
					<TodoInput onNewItemAdded={this.onNewItemAdded} />
					<TodoItems
						todos={todos}
						onTodoRemove={this.onTodoRemove}
						onTodoStatusChange={this.onTodoStatusChange}
					/>
				</div>
				<Footer />
			</div>
		);
	}
}

export default List;
