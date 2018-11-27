'use-strict';

import CONSTANTS from '../constants'

const { PLAYBACK_FILTERS } = CONSTANTS;
const Filters = [{
	text: PLAYBACK_FILTERS.PAST_7_DAYS,
	id: '7-days-ago'
}, 
{
	text: PLAYBACK_FILTERS.PAST_30_DAYS,
	id: '30-days-ago'
}, 
{
	text: PLAYBACK_FILTERS.PAST_YEAR,
	id: '1-year-ago'
}];

export default Filters