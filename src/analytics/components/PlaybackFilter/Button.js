'use-strict';

import { Component } from 'react'
import { Button } from '../../../components/index'

class FilterButton extends Component {
	render() {
		var btn = Button(this.props);
		return (
			btn
		);
	}

}

export default FilterButton