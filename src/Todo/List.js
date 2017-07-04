import React from 'react';
import PropTypes from 'prop-types';

import { addNewItemToArray, removeItemFromArray, toggleItemStatusInArray, filterTodos } from '../lib/todoHelpers';

import { TodoStats } from './TodoStats';
import { TodoLinks } from './TodoLinks';
import { TodoInput } from './TodoInput';
import { TodoItems } from './TodoItems';

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

export class List extends React.Component {
	static contextTypes = {
		route: PropTypes.string
	};

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
		const filteredTodos = filterTodos(todos, this.context.route);
		const totalItems = todos.length;
		const doneItems = todos.filter((x) => x.checked).length;

		return (
			<div className="List">
				<div className="list-container">
					<TodoStats doneItems={doneItems} totalItems={totalItems} />
					<TodoLinks />
					<TodoInput onNewItemAdded={this.onNewItemAdded} />
					<TodoItems
						todos={filteredTodos}
						onTodoRemove={this.onTodoRemove}
						onTodoStatusChange={this.onTodoStatusChange}
					/>
				</div>
			</div>
		);
	}
}
