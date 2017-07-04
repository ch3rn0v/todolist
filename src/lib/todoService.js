const baseUrl = 'http://localhost:8080/todos';

export const loadTodos = () => {
	return fetch(baseUrl).then((res) => res.json());
};

export const createTodo = (newTodo) => {
	return fetch(baseUrl, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newTodo)
	}).then((res) => res.json());
};
