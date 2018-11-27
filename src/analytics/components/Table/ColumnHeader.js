'use-strict';

import React, { Component } from 'react'

class ColumnHeader extends Component {
	render() {
		return (
			<span>{this.props.text}</span>
		);
	}
}

export default ColumnHeader