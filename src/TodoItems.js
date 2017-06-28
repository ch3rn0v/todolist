import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

function TodoItems({ todos, onTodoRemove, onTodoStatusChange }) {
	const renderSingleItem = (item) => {
		return (
			<TodoItem
				key={item.id}
				id={item.id}
				label={item.label}
				checked={item.checked}
				onTodoRemove={onTodoRemove}
				onTodoStatusChange={onTodoStatusChange}
			/>
		);
	};

	return (
		<ul className="todo-list">
			{todos.map((item) => renderSingleItem(item))}
		</ul>
	);
}

TodoItems.propTypes = {
	todos: PropTypes.array.isRequired,
	onTodoRemove: PropTypes.func.isRequired,
	onTodoStatusChange: PropTypes.func.isRequired
};

export default TodoItems;
