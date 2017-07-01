import React from 'react';
import PropTypes from 'prop-types';

import { validateText, createNewItem } from './lib/todoHelpers';

import { ErrorList } from './ErrorList';

export default class TodoInput extends React.Component {
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

		return (
			<div>
				<form onSubmit={this.handleSubmit} className="todo-form">
					<input type="text" className="text-input" onChange={this.handleChange} value={inputText} />
					<input
						type="submit"
						className="button"
						value="Add item"
						disabled={!(inputText.length > 0 && errorList.length === 0)}
					/>
				</form>
				<ErrorList errorList={errorList} />
			</div>
		);
	}
}

TodoInput.propTypes = {
	onNewItemAdded: PropTypes.func.isRequired
};
