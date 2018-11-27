'use-strict';

import _ from 'lodash'
import * as GLOBAL_CONSTANTS from '../constants'
import * as ANALYTICS_CONSTANTS from './constants'
import VhxApi from '@vhx/vhxjs/dist/index'

const CONSTANTS = _.assign({}, GLOBAL_CONSTANTS.default, ANALYTICS_CONSTANTS.default);
const vhx = new VhxApi(CONSTANTS.API_KEY);

const fetchAnalytics = function(videoId, from, to, by) {
    return vhx.analytics.retrieve({ video_id: videoId, 
    	type: CONSTANTS.CONTENT_TYPE, 
    	from: from, 
    	to: to, 
    	by: by
    });
};

const fetchDetails = function(videoId) {
	return vhx.videos.retrieve(CONSTANTS.VIDEO_DETAILS_URL + videoId);
};

function fetchVideo(videoId, from) {
	return function(dispatch, getState, api) {
		dispatch({
			type: 'FETCHING_VIDEO',
			data: {
				videoId: videoId,
				filters: {
					from: from
				}
			}
		});
		return fetchAnalytics(videoId, from, CONSTANTS.TODAY, CONSTANTS.DAY).then(function(videoAnalytics) {
			return fetchDetails(videoId).then(function(videoDetails) {
				dispatch({
					type: "VIDEO_FETCHED",
					data: {
						videoId: videoId,
						videoAnalytics: videoAnalytics,
						videoDetails: videoDetails
					}
				});
			}).catch(function(err) {
				dispatch({
					type: "VIDEO_FETCHING_ERROR",
					data: true
				});
			});
		}).catch(function(err) {
			dispatch({
				type: "VIDEO_FETCHING_ERROR",
				data: true
			});
		});
	}
}

export {
	fetchVideo
}