'use-strict';

import { initialState } from './initialState'

const reducers = {
	loading: function(state = initialState.loading, action) {
		switch (action.type) {
			case "FETCHING_VIDEO":
				return true;
			case "VIDEO_FETCHED":
				return false;
			case "VIDEO_FETCHING_ERROR":
				return false;	
			default:
				return state
		}
	},
	activeFilters: function(state = initialState.activeFilters, action) {
		switch (action.type) {
			case "FETCHING_VIDEO":
				return Object.assign({}, state, action.data.filters);
			default:
				return state
		}
	},
	currentVideo: function(state, action) {
		switch (action.type) {
			case "VIDEO_FETCHED":
				return Object.assign({}, action.data);
			default:
				return {}
		}
	},
	error: function(state, action) {
		switch (action.type) {
			case "VIDEO_FETCHING_ERROR":
				return action.data;
			default:
				return false;
		}
	}
};

export {
	reducers
}