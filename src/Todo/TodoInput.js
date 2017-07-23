import React from 'react';
import PropTypes from 'prop-types';

import { validateText, createNewItem } from '../lib/todoHelpers';
import { ErrorList } from './ErrorList';

import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
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
			<Card className="panel">
				<CardContent>
					<form onSubmit={this.handleSubmit} className="todo-form">
						<Grid container direction="row" justify="flex-start" align="center" gutter={16}>
							<Grid item xs={12} md={3}>
								<TextField
									label="Enter new Todo item"
									className="text-input"
									onChange={this.handleChange}
									value={inputText}
									error={errorPresent}
								/>
							</Grid>
							<Grid item xs={12} md={3}>
								<Button
									raised
									color="primary"
									className="button"
									type="submit"
									disabled={!(inputText.length > 0 && errorList.length === 0)}
								>
									Add item
								</Button>
							</Grid>
						</Grid>
					</form>
					<FormHelperText error>
						<ErrorList errorList={errorList} />
					</FormHelperText>
				</CardContent>
			</Card>
		);
	}
}

TodoInput.propTypes = {
	onNewItemAdded: PropTypes.func.isRequired
};
