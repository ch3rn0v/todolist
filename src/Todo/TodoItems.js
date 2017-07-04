import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from './TodoItem';

export const TodoItems = ({ todos, onTodoRemove, onTodoStatusChange }) => {
	const renderSingleItem = (item) => {
		return (
			<TodoItem key={item.id} item={item} onTodoRemove={onTodoRemove} onTodoStatusChange={onTodoStatusChange} />
		);
	};

	return (
		<ul className="todo-list">
			{todos.map((item) => renderSingleItem(item))}
		</ul>
	);
};

TodoItems.propTypes = {
	todos: PropTypes.array.isRequired,
	onTodoRemove: PropTypes.func.isRequired,
	onTodoStatusChange: PropTypes.func.isRequired
};
