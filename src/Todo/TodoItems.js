import React from 'react';
import PropTypes from 'prop-types';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';

export const TodoItems = ({ todos, onTodoRemove, onTodoStatusChange }) => {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Mark done</TableCell>
					<TableCell>Title</TableCell>
					<TableCell>Control</TableCell>
				</TableRow>
			</TableHead>

			{todos.map((item) => {
				const itemClass = item.checked ? 'done' : 'in-process';
				const rowItemClass = 'todo-' + itemClass;
				const shouldDisplayProgress =
					item.serverSyncStatus === 'in-process' || item.serverSyncStatus === 'synced' ? '' : 'none';
				const syncProgressStyle = { display: shouldDisplayProgress };
				return (
					<TableBody key={item.id}>
						<TableRow className={rowItemClass}>
							<TableCell>
								<Checkbox
									onChange={() => {
										onTodoStatusChange(item);
									}}
									checked={item.checked}
								/>
							</TableCell>
							<TableCell
								className="todo-label"
								onClick={() => {
									onTodoStatusChange(item);
								}}
							>
								{item.label}
							</TableCell>
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
						<TableRow className="sync-progress" style={syncProgressStyle}>
							<TableCell colSpan="3">
								<LinearProgress />
							</TableCell>
						</TableRow>
					</TableBody>
				);
			})}
		</Table>
	);
};

TodoItems.propTypes = {
	todos: PropTypes.array.isRequired,
	onTodoRemove: PropTypes.func.isRequired,
	onTodoStatusChange: PropTypes.func.isRequired
};
