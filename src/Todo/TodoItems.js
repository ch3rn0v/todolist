import React from 'react';
import PropTypes from 'prop-types';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';

export const TodoItems = ({ todos, onTodoRemove, onTodoStatusChange }) => {
	return (
		<Paper>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Mark done</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Control</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todos.map((item) => {
						return (
							<TableRow key={item.id}>
								<TableCell>
									<Checkbox
										onChange={() => {
											onTodoStatusChange(item);
										}}
										checked={item.checked}
									/>
								</TableCell>
								<TableCell>{item.label}</TableCell>
								<TableCell>
									<Button
										raised
										color="primary"
										onClick={() => {
											onTodoRemove(item);
										}}
									>
										Remove
									</Button>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
};

TodoItems.propTypes = {
	todos: PropTypes.array.isRequired,
	onTodoRemove: PropTypes.func.isRequired,
	onTodoStatusChange: PropTypes.func.isRequired
};
