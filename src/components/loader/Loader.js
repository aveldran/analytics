'use-strict';

import './index.css'
import React, { Component } from 'react'

class Loader extends Component {
	render() {
		return(
			<div className='loading'>
				<span className='loading-icon'>Loading...</span>
			</div>
		);
	}
}

export default Loader