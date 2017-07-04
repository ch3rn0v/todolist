import React from 'react';
import { Link } from '../Routing';

class TodoLinks extends React.Component {
	render() {
		return (
			<div className="nav-links">
				<p>Filter:</p>
				<ul>
					<li><Link to="/in_process" title="In process">In process</Link></li>
					<li><Link to="/done" title="Done">Done</Link></li>
					<li><Link to="/" title="Everything">Everything</Link></li>
				</ul>
			</div>
		);
	}
}

export default TodoLinks;
