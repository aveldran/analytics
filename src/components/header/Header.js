'use-strict';

import React, { Component } from 'react'

class Header extends Component {
	render() {
		const { title, subTitle, headerClass, titleClass, introClass } = this.props;
		return(
			<header className={headerClass}>
				<h1 className={titleClass}>{title}</h1>
				<span className={introClass}>{subTitle}</span>
			</header>
		);
	}
}

export default Header