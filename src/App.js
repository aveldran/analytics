'use-strict';

import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Header, Loader, ErrorBoundary } from './components'
import { PlaybackFilter, Table } from './analytics/components'
import Filters from './analytics/filters'
import * as videoActions from './analytics/actionCreators'
import {bindActionCreators} from 'redux'
import CONSTANTS from './constants'

function getTotalPlays(data) {
  return _.reduce(data, function(total, d) {
    return parseInt(d.plays, 10) + total;
  }, 0);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.loadVideo = this.loadVideo.bind(this);
  }
  componentDidMount() {
    const { data } = this.props.videoAnalytics;
    if (!data) {
      const { from } = this.props.activeFilters;
      const id = this.props.videoId;
      this.loadVideo(id, from);
    }
  }
  loadVideo(id, filter) {
    const { fetchVideo } = this.props.actions;
    fetchVideo(id, filter);
  }
  render() {
    const { title, totalPlays, loading } = this.props;
    const TOTAL_PLAYS = [totalPlays, CONSTANTS.TOTAL_PLAYS_SUFFIX].join(' ');
    if (loading) {
      return (<Loader/>);
    } else {
     return (
        <ErrorBoundary error={this.props.error}>
         <div className="App">
            <Header headerClass="App-header" titleClass="App-title" introClass="App-intro" title={title} subTitle={TOTAL_PLAYS}/>
            <PlaybackFilter {...this.props} fetchFn={this.loadVideo} filters={Filters}/>
            <Table {...this.props}/>
          </div> 
        </ErrorBoundary>
      );
    }
  }
}

function mapStateToProps(state) {
  const { currentVideo, activeFilters, loading, error } = state;
  const { videoId= CONSTANTS.DEFAULT_VIDEO_ID, videoDetails={}, videoAnalytics={} } = currentVideo;
  const { title= 'No Video Loaded' } = videoDetails;
  const totalPlays = getTotalPlays(videoAnalytics.data) || 0;

  return {
    videoId,
    loading,
    title,
    totalPlays,
    videoAnalytics,
    activeFilters,
    error
  }
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(videoActions, dispatch)}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);