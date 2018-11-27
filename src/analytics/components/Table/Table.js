'use-strict';

import React, { Component } from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'
import ColumnHeader from './ColumnHeader'
import _ from 'lodash'
import Filters from '../../filters'
import './table.css'

class Table extends Component {
	constructor(props) {
		super(props);
		this.generateColumns = this.generateColumns.bind(this);
		this.getFinishes = this.getFinishes.bind(this);
		this.getFilter = this.getFilter.bind(this);
		this.generateRows = this.generateRows.bind(this);
	}
	generateColumns(data) {
		const { activeFilters, totalPlays } = this.props;

		// Columns should be provided as configuration instead
		// hardcoded for now
		const columns = [{
		  header: this.getFilter(Filters, activeFilters.from).text,
		  accessor: 'date'
		},{
		  header: [totalPlays, 'plays'].join(' '),
		  accessor: 'plays'
		},{
		  header: [this.getFinishes(data), 'finishes'].join(' '),
		  accessor: 'finishes'
		}];
		return columns.map(function(item, i) {
			return {
				Header: <ColumnHeader text={item.header}/>,
				accessor: item.accessor,
				Cell: row => (
					<span>
						{row.value.split(' ')[0]}
					</span>
				)
			};
		});
	}
	getFinishes(data) {
	  return _.reduce(data, function(finishes, d) {
	    return parseInt(d.finishes, 10) + finishes;
	  }, 0);
	}
	getFilter(filters, id) {
	  return _.find(filters, function(filter) {
	    return filter.id === id;
	  });
	}
	generateRows(data) {
	  return data.map(function(r, i) {
	    return {
	      date: r.interval_timestamp,
	      plays: r.plays,
	      finishes: r.finishes
	    }
	  });
	}
	render() {
		const { videoAnalytics } = this.props;
		const { data=[] } = videoAnalytics;
		const columns = this.generateColumns(data);
		const rows = this.generateRows(data);
		return (
			<ReactTable className="analytics-table -striped -highlight" columns={columns} data={rows}/>
		);
	}
}

export default Table