'use-strict';

import CONSTANTS from '../constants.js';
import Filters from './filters.js';

const initialState = {
	loading: true,
	activeFilters: {
		from: Filters[0].id,
		to: CONSTANTS.PLAYBACK_FILTERS.TO,
		by: CONSTANTS.PLAYBACK_FILTERS.BY
	}
};

export {
	initialState
}