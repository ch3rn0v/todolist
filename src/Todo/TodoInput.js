import React from 'react';
import PropTypes from 'prop-types';

import { validateText, createNewItem } from '../lib/todoHelpers';
import { ErrorList } from './ErrorList';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import FormHelperText from 'material-ui/Form/FormHelperText';

export class TodoInput extends React.Component {
	state = {
		inputText: '',
		errorList: []
	};

	resetInputField = () => {
		this.setState({
			inputText: '',
			errorList: []
		});
	};

	handleChange = (e) => {
		const newUserInput = e.target.value;
		const errorList = validateText(newUserInput);
		this.setState({
			inputText: newUserInput,
			errorList: errorList
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.onNewItemAdded(createNewItem(this.state.inputText));
		this.resetInputField();
	};

	render() {
		const { inputText, errorList } = this.state;
		const errorPresent = errorList.length > 0;

		return (
			<Paper className="panel input" elevation={4}>
				<form onSubmit={this.handleSubmit} className="todo-form">
					<TextField
						label="Enter new Todo item"
						className="text-input"
						onChange={this.handleChange}
						value={inputText}
						error={errorPresent}
					/>
					<Button
						raised
						color="primary"
						className="button"
						type="submit"
						disabled={!(inputText.length > 0 && errorList.length === 0)}
					>
						Add item
					</Button>
				</form>
				<FormHelperText error>
					<ErrorList errorList={errorList} />
				</FormHelperText>
			</Paper>
		);
	}
}

TodoInput.propTypes = {
	onNewItemAdded: PropTypes.func.isRequired
};
