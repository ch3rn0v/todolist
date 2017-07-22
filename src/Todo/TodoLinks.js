import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import { TodoItems } from './TodoItems';

import { filterTodosByTab } from '../lib/todoHelpers';

const TabContainer = (props) => <div style={{ padding: 24 }}>{props.children}</div>;

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

export class TodoLinks extends React.Component {
	state = {
		position: 0
	};

	handleChange = (event, index) => {
		this.setState({ position: index });
		/*
		0 — Everything
		1 — In process
		2 — Done
		*/
	};

	handleChangeIndex = (index) => {
		this.setState({ position: index });
	};

	render() {
		const todos = this.props.todos;
		const onTodoRemove = this.props.onTodoRemove;
		const onTodoStatusChange = this.props.onTodoStatusChange;

		const position = this.state.position;

		return (
			<div className="nav-links">
				<Paper className="panel">
					<Tabs
						index={this.state.position}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
						className="filter-tabs"
					>
						<Tab label="Everything" />
						<Tab label="In process" />
						<Tab label="Done" />
					</Tabs>
					<SwipeableViews index={this.state.position} onChangeIndex={this.handleChangeIndex}>
						<TabContainer>
							<TodoItems
								todos={filterTodosByTab(todos, position)}
								onTodoRemove={onTodoRemove}
								onTodoStatusChange={onTodoStatusChange}
							/>
						</TabContainer>
						<TabContainer>
							<TodoItems
								todos={filterTodosByTab(todos, position)}
								onTodoRemove={onTodoRemove}
								onTodoStatusChange={onTodoStatusChange}
							/>
						</TabContainer>
						<TabContainer>
							<TodoItems
								todos={filterTodosByTab(todos, position)}
								onTodoRemove={onTodoRemove}
								onTodoStatusChange={onTodoStatusChange}
							/>
						</TabContainer>
					</SwipeableViews>
				</Paper>
			</div>
		);
	}
}

TodoLinks.propTypes = {
	todos: PropTypes.array.isRequired,
	onTodoRemove: PropTypes.func.isRequired,
	onTodoStatusChange: PropTypes.func.isRequired
};
