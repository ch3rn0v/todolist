import React from 'react';
import PropTypes from 'prop-types';

export class Link extends React.Component {
	static contextTypes = {
		route: PropTypes.string,
		linkHandler: PropTypes.func
	};

	handleClick = (e) => {
		e.preventDefault();
		this.context.linkHandler(this.props.title, this.props.to);
	};

	render() {
		const activeClass = this.context.route === this.props.to ? 'active' : 'inactive';
		return (
			<a onClick={this.handleClick} className={activeClass + ' nav-link'} href={this.props.to}>
				{this.props.children}
			</a>
		);
	}
}

Link.propTypes = {
	title: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
};
