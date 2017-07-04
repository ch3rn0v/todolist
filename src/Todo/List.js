import React from 'react';
import PropTypes from 'prop-types';

import {
	addNewItemToArray,
	removeItemFromArray,
	toggleItemStatusInArray,
	filterTodos,
	setItemNewSyncStatusInArray
} from '../lib/todoHelpers';
import { loadTodos, createTodo } from '../lib/todoService';

import { TodoStats } from './TodoStats';
import { TodoLinks } from './TodoLinks';
import { TodoInput } from './TodoInput';
import { TodoItems } from './TodoItems';

const SERVER_SYNC_STATUS_RESET_DURATION = 1000.0;

export class List extends React.Component {
	static contextTypes = {
		route: PropTypes.string
	};

	state = {
		todos: []
	};

	onNewItemAdded = (itemToBeAdded) => {
		// Since new item is not in the this.state.todos collection, we have to set it's initial serverSyncStatus property here.
		// I think we should not do it in the todoHelpers where the new item object is being created for the first time,
		// because at that moment the server synchronization is not yet started.
		this.setState({
			todos: addNewItemToArray(this.state.todos, { ...itemToBeAdded, serverSyncStatus: 'in-process' })
		});
		// After todo is successfully saved at server side, we can set it's serverSyncStatus to 'synced'.
		createTodo(itemToBeAdded).then((res) => {
			this.setServerSyncStatus(itemToBeAdded, 'synced');
			setTimeout(() => {
				this.setServerSyncStatus(itemToBeAdded, '');
			}, SERVER_SYNC_STATUS_RESET_DURATION);
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

	setServerSyncStatus = (todoItem, newStatus) => {
		this.setState({
			todos: setItemNewSyncStatusInArray(this.state.todos, todoItem, newStatus)
		});
	};

	componentDidMount() {
		loadTodos().then((todos) => this.setState({ todos }));
	}

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
