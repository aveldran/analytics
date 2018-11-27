'use-strict';

import React, { Component } from 'react'
import './filters.css'
import FilterButton from './Button'

class PlaybackFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: this.props.activeFilters.from 
		};
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.resolveClassName = this.resolveClassName.bind(this);
	}
	handleFilterChange(id) {
		const { fetchFn } = this.props;
		fetchFn(this.props.videoId, id);
		this.setState({
			active: id
		});
	}
	resolveClassName(pre, id) {
		const active = this.state.active === id ? 'active' : '';
		return pre + " " + active;
	}
	render() {
		return(
			<div className="filters">
				{this.props.filters.map((filter, i) => (
					<FilterButton
					id={filter.id}
					className={this.resolveClassName("filter-btn", filter.id)}
					onClick={this.handleFilterChange.bind(this, filter.id)} 
					key={i} 
					text={filter.text}/>
		        ))}
			</div>
		);
	}
}

export default PlaybackFilter