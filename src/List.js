import React from 'react';

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

	onNewItemAdded = (newItem) => {
		this.setState({
			todos: [ ...this.state.todos, newItem ]
		});
	};

	onTodoRemove = (itemId) => {
		const index = this.state.todos.findIndex((t) => t.id === itemId);
		if (index > -1) {
			this.setState({
				todos: [ ...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1) ]
			});
		}
	};

	onTodoStatusChange = (itemId, status) => {
		const index = this.state.todos.findIndex((t) => t.id === itemId);

		if (index > -1) {
			const todo = this.state.todos[index];

			this.setState({
				todos: [
					...this.state.todos.slice(0, index),
					{ ...todo, checked: status },
					...this.state.todos.slice(index + 1)
				]
			});
		}
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
