import React from 'react';
import PropTypes from 'prop-types';

import RemoveItemButton from './RemoveItemButton';

const TIME_BEFORE_FINAL_REMOVAL = 1600.0;
const ANIMATION_INTERVAL_DURATION = 200.0;

const ITEM_UNCHECKED_OPACITY = '1.0';
const ITEM_CHECKED_OPACITY = '0.7';

const CHECKED_LABEL_STYLE = 'line-through';
const UNCHECKED_LABEL_STYLE = 'none';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            label: props.label,
            checked: props.checked,
            onRemove: props.onRemove,
            removingInProgress: false,
            removingTimeout: -1,
            removingInterval: -1,
            opacity: props.checked ? ITEM_CHECKED_OPACITY : ITEM_UNCHECKED_OPACITY,
            onCheckedStateChange: props.onCheckedStateChange
        };

        this.onItemRemove = this.onItemRemove.bind(this);
        this.onCheckedStateChange = this.onCheckedStateChange.bind(this);
        this.decreaseOpacityDuringRemoval = this.decreaseOpacityDuringRemoval.bind(this);
        this.onCancelRemoval = this.onCancelRemoval.bind(this);
    }

    decreaseOpacityDuringRemoval(removalDuration) {
        const numberOfSteps = removalDuration / ANIMATION_INTERVAL_DURATION;
        const currentOpacity = this.state.opacity;
        const opacityDecreaseStep = currentOpacity / numberOfSteps;

        const animateRemoval = () => {
            this.setState({
                opacity: this.state.opacity - opacityDecreaseStep
            });
        };
        this.setState({
            removingInterval: setInterval(animateRemoval, ANIMATION_INTERVAL_DURATION)
        });
    }

    onCancelRemoval() {
        clearTimeout(this.state.removingTimeout);
        clearInterval(this.state.removingInterval);
        this.setState({
            removingInProgress: false,
            opacity: this.state.checked ? ITEM_CHECKED_OPACITY : ITEM_UNCHECKED_OPACITY
        });
    }

    onItemRemove() {
        this.setState({
            removingTimeout: setTimeout(() => {
                clearInterval(this.state.removingInterval);
                this.state.onRemove(this.state.id);
            }, TIME_BEFORE_FINAL_REMOVAL),
            removingInProgress: true
        });
        this.decreaseOpacityDuringRemoval(TIME_BEFORE_FINAL_REMOVAL);
    }

    onCheckedStateChange() {
        const newState = !this.state.checked;
        this.setState({
            checked: newState,
            opacity: newState ? ITEM_CHECKED_OPACITY : ITEM_UNCHECKED_OPACITY
        });
        this.state.onCheckedStateChange(this.state.id, newState);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !Object.is(this.state, nextState);
    }

    render() {
        const label = this.state.label;
        const checked = this.state.checked;
        const removingInProgress = this.state.removingInProgress;

        const checkboxCssStyle = {
            opacity: this.state.opacity
        };
        const labelCssStyle = {
            opacity: this.state.opacity,
            textDecoration: checked ? CHECKED_LABEL_STYLE : UNCHECKED_LABEL_STYLE
        };

        return (
            <li className="todo-item">
                <input onChange={ this.onCheckedStateChange } type="checkbox" checked={ checked } style={ checkboxCssStyle }/>
                <p onClick={ this.onCheckedStateChange } style={ labelCssStyle }>{ label }</p>
                <RemoveItemButton onClick={ removingInProgress ? this.onCancelRemoval : this.onItemRemove } isRemovingInProgress={ removingInProgress } />
            </li>
        );
    }
}

TodoItem.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCheckedStateChange: PropTypes.func.isRequired
};

export default TodoItem;