import React from 'react';
import PropTypes from 'prop-types';

import {
	addNewItemToArray,
	removeItemFromArray,
	toggleItemStatus,
	setItemNewSyncStatusInArray
} from '../lib/todoHelpers';
import { loadTodos, createTodo, saveTodo, destroyTodo } from '../lib/todoService';

import { TodoStats } from './TodoStats';
import { TodoLinks } from './TodoLinks';
import { TodoInput } from './TodoInput';

const SERVER_SYNC_STATUS_RESET_DURATION = 700.0;

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

	onTodoStatusChange = (itemToBeChanged) => {
		const itemWithNewStatus = toggleItemStatus(itemToBeChanged);
		this.setServerSyncStatus(itemToBeChanged, 'in-process');
		saveTodo(itemWithNewStatus).then((res) => {
			this.setServerSyncStatus(itemToBeChanged, 'synced');
			setTimeout(() => {
				this.setServerSyncStatus(itemWithNewStatus, '');
			}, SERVER_SYNC_STATUS_RESET_DURATION);
		});
	};

	onTodoRemove = (itemToBeRemoved) => {
		this.setState({
			todos: removeItemFromArray(this.state.todos, itemToBeRemoved)
		});
		destroyTodo(itemToBeRemoved.id);
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
		const totalItems = todos.length;
		const doneItems = todos.filter((x) => x.checked).length;

		return (
			<div className="List">
				<div className="list-container">
					<TodoStats doneItems={doneItems} totalItems={totalItems} />
					<TodoInput onNewItemAdded={this.onNewItemAdded} />
					<TodoLinks
						todos={todos}
						onTodoRemove={this.onTodoRemove}
						onTodoStatusChange={this.onTodoStatusChange}
					/>
				</div>
			</div>
		);
	}
}
