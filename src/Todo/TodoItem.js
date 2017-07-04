import React from 'react';
import PropTypes from 'prop-types';

import { RemoveItemButton } from './RemoveItemButton';

const TIME_BEFORE_FINAL_REMOVAL = 1600.0;
const ANIMATION_INTERVAL_DURATION = 200.0;

const ITEM_UNCHECKED_OPACITY = '1.0';
const ITEM_CHECKED_OPACITY = '0.7';

const CHECKED_LABEL_STYLE = 'line-through';
const UNCHECKED_LABEL_STYLE = 'none';

export class TodoItem extends React.Component {
	removingInterval = null;
	removingTimeout = null;

	constructor(props) {
		super(props);

		this.state = {
			removalInProgress: false,
			opacity: props.item.checked ? ITEM_CHECKED_OPACITY : ITEM_UNCHECKED_OPACITY
		};
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
		this.removingInterval = setInterval(animateRemoval, ANIMATION_INTERVAL_DURATION);
	}

	onCancelRemoval = () => {
		clearTimeout(this.removingTimeout);
		clearInterval(this.removingInterval);

		this.setState({
			removalInProgress: false,
			opacity: this.props.item.checked ? ITEM_CHECKED_OPACITY : ITEM_UNCHECKED_OPACITY
		});
	};

	onItemRemove = () => {
		this.removingTimeout = setTimeout(() => {
			clearInterval(this.removingInterval);
			this.props.onTodoRemove(this.props.item);
		}, TIME_BEFORE_FINAL_REMOVAL);
		this.setState({ removalInProgress: true });

		this.decreaseOpacityDuringRemoval(TIME_BEFORE_FINAL_REMOVAL);
	};

	onCheckedStateChange = () => {
		if (!this.state.removalInProgress) {
			this.props.onTodoStatusChange(this.props.item);
			this.setState({
				opacity: !this.props.item.checked ? ITEM_CHECKED_OPACITY : ITEM_UNCHECKED_OPACITY
			});
		}
	};

	render() {
		const { checked, label } = this.props.item;
		const { opacity, removalInProgress } = this.state;

		const checkboxCssStyle = {
			opacity
		};
		const labelCssStyle = {
			opacity,
			textDecoration: checked ? CHECKED_LABEL_STYLE : UNCHECKED_LABEL_STYLE
		};

		return (
			<li className="todo-item">
				<input
					onChange={this.onCheckedStateChange}
					type="checkbox"
					checked={checked}
					style={checkboxCssStyle}
				/>
				<p onClick={this.onCheckedStateChange} style={labelCssStyle}>
					{label}
				</p>
				<RemoveItemButton
					onClick={removalInProgress ? this.onCancelRemoval : this.onItemRemove}
					isRemovingInProgress={removalInProgress}
				/>
			</li>
		);
	}
}

TodoItem.propTypes = {
	item: PropTypes.object.isRequired,
	onTodoRemove: PropTypes.func.isRequired,
	onTodoStatusChange: PropTypes.func.isRequired
};
