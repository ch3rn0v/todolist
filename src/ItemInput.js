import React from 'react';

const tooShortTextError = <p>Please enter at least five characters.</p>;
const restrictedCharsError = <p>Only english letters, spaces, number, and the following characters are allowed:<br/>colons, commas, semicolons, round brackets, exclamation marks, dots, @ signs, dashes, and double quotes.</p>;

const defaultErrorStyle = {
    color: 'red'
};

class ItemInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: '',
            userBeganInput: false,
            errors: {
                tooShortText: false,
                restrictedChars: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const newText = e.target.value;
        this.setState({
            inputText: newText,
            userBeganInput: true
        });

        this.validateInput(newText);
    }

    validateInput(currentInput) {
        let textIsTooShort = false;
        let inputPresent = true;

        // Text is too short
        //fixme
        if (currentInput.length < 5) {
            textIsTooShort = true;
        } else if (currentInput.length === 0) {
            inputPresent = false;
        }

        this.setState({
            errors: {
                tooShortText: textIsTooShort,
                // Restricted chars are present in the text
                //fixme
                restrictedChars: inputPresent && currentInput.match(/[^;,"()@!.\-: a-zA-Z0-9]/g)
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addItem({
            label: this.state.inputText,
            checked: false
        });
        this.setState({
            inputText: '',
            userBeganInput: false,
            errors: {
                tooShortText: false,
                restrictedChars: false
            }
        });
    }

    render() {
        const inputText = this.state.inputText;

        // Display error if it is present
        const tooShortTextErrorPresent = this.state.errors.tooShortText;
        const tooShortTextStyle = Object.assign({
            display: tooShortTextErrorPresent ? "block" : "none"
        }, defaultErrorStyle);

        // Display error if it is present
        const restrictedCharsErrorPresent = this.state.errors.restrictedChars;
        const restrictedCharsStyle = Object.assign({
            display: restrictedCharsErrorPresent ? "block" : "none"
        }, defaultErrorStyle);

        // Render
        return (
            <div>
                <form onSubmit={ this.handleSubmit } className="todo-form">
                    <input onChange={ this.handleChange } value={ inputText } className="text-input" />
                    <input type="submit" value="Add item"
                           disabled={ tooShortTextErrorPresent ||
                                      restrictedCharsErrorPresent ||
                                      !this.state.userBeganInput }
                           className="button" />
                </form>
                <span className="error-list" style={ tooShortTextStyle } >{ tooShortTextError }</span>
                <span className="error-list" style={ restrictedCharsStyle } >{ restrictedCharsError }</span>
            </div>
        );
    }
}

export default ItemInput;