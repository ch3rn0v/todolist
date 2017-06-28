import React from 'react';
import PropTypes from 'prop-types';
import Math from 'mathjs';

import ErrorList from './ErrorList';

class TodoInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputText: '',
			errorList: []
		};

		this.resetInputField = this.resetInputField.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	resetInputField() {
		this.setState({
			inputText: '',
			errorList: []
		});
	}

	validateText(text) {
		let errorList = [];

		if (text.length < 5) {
			errorList.push('Text should be at least five characters long. ');
		}

		if (text.match(/[^;,"()@!.\-: a-zA-Z0-9]/g)) {
			errorList.push(
				'Only english letters, spaces, number, and the following characters are allowed: colons, commas, semicolons, round brackets, exclamation marks, dots, @ signs, dashes, and double quotes.'
			);
		}

		return errorList;
	}

	generateUniqueID() {
		// In a real-world app id generation should be different depending on the scheme of id storing.
		return `${Date.now()}-${Math.random()}`;
	}

	handleChange(e) {
		const newUserInput = e.target.value;
		const errorList = this.validateText(newUserInput);
		this.setState({
			inputText: newUserInput,
			errorList: errorList
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newItem = {
			id: this.generateUniqueID(),
			label: this.state.inputText,
			checked: false
		};
		this.props.onNewItemAdded(newItem);
		this.resetInputField();
	}

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

export default TodoInput;
