import React, { Component } from 'react';
import './body.css';

class Body extends Component {

	render() {
		return (
			<div className="body">
				{this.props.children}
			</div>
			);
	}
}
export default Body;
