import React from 'react';
import PropTypes from 'prop-types';

const itemUncheckedOpacity = '1.0';
const itemCheckedOpacity = '0.7';

const checkedStyle = 'line-through';
const uncheckedStyle = 'none';
const displayBlockStyle = {
    display: 'block'
};
const displayNoneStyle = {
    display: 'none'
};

class SingleItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            removingInProgress: false,
            removingTimeout: -1,
            removingInterval: -1,
            opacity: itemUncheckedOpacity,
            checked: false
        }
    }

    setInitialCheckedState(initialCheckedState) {
        this.setState({
            checked: initialCheckedState,
            opacity: initialCheckedState ? itemCheckedOpacity : itemUncheckedOpacity
        });
    }

    changeCheckedState() {
        let newValue = this.state.checked ? false : true;
        this.setState({
            checked: newValue,
            opacity: newValue ? itemCheckedOpacity : itemUncheckedOpacity
        });
    }

    handleRemove(id) {
        const timeBeforeFinalRemoval = 1600;
        this.setState({
            removingTimeout: setTimeout(() => {
                clearInterval(this.state.removingInterval);
                this.props.onRemove(id);
            }, timeBeforeFinalRemoval),
            removingInProgress: true
        });
        this.decreaseOpacityDuringRemoval(timeBeforeFinalRemoval);
    }

    handleCancelRemoval(checked) {
        clearTimeout(this.state.removingTimeout);
        clearInterval(this.state.removingInterval);
        this.setState({
            removingInProgress: false,
            opacity: this.returnDefaultOpacity(checked)
        });
    }

    handleChange(id) {
        // Toggle checked state
        this.changeCheckedState();
        // Call parent function to store new value
        this.props.onChange(id);
    }

    decreaseOpacityDuringRemoval(removalDuration) {
        const animationIntervalDuration = 200.0;
        const numberOfSteps = removalDuration / animationIntervalDuration;
        const currentOpacity = this.state.opacity;
        const opacityDecreaseStep = currentOpacity / numberOfSteps;

        const animateRemoval = () => {
            this.setState({
                opacity: this.state.opacity - opacityDecreaseStep
            });
        };
        this.setState({
            removingInterval: setInterval(animateRemoval, animationIntervalDuration)
        });
    }

    returnDefaultOpacity(checked) {
        return checked ? itemCheckedOpacity : itemUncheckedOpacity;
    }

    componentWillMount() {
        // Override default value with what is set via props
        this.setInitialCheckedState(this.props.checked);
    }

    render() {
        // Process properties
        const id = this.props.id;
        const label = this.props.label;
        // Process state
        let checked = this.state.checked;
        const removingInProgress = this.state.removingInProgress;
        let opacity = this.state.opacity;
        // Set style
        let itemLabelStyle = {
            textDecoration: checked ? checkedStyle : uncheckedStyle,
            opacity: opacity
        };
        const checkboxStyle = { opacity: opacity };

        // Render
        return (
            <li key={ id } className="todo-item">
                <input type="checkbox" onChange={ () => { this.handleChange(id) } } style={ checkboxStyle } checked={ checked ? "checked" : "" } />
                <p onClick={ () => { this.handleChange(id) } } style={ itemLabelStyle } >{ label }</p>
                <button onClick={ () => { this.handleRemove(id) } } style={ removingInProgress ? displayNoneStyle : displayBlockStyle } className="remove">Remove</button>
                <button onClick={ () => { this.handleCancelRemoval(checked) } } style={ removingInProgress ? displayBlockStyle : displayNoneStyle } className="cancel">Cancel</button>
            </li>
        );
    }
}

SingleItem.propTypes = {
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default SingleItem;