'use-strict';

import React from 'react'
import './index.css'

const Button = (props) => {
	const { className, text } = props;
	const classes = ['btn', className].join(' ');
	return <a {...props} className={classes}>{text}</a>;
}

export default Button