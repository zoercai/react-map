import React from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import styles from './map.css';
import PosFilter from './PosFilter';

// TODO where to store this?
mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lcmNhaSIsImEiOiJjamR0ZGs2OGcxNGFmMndwa2NqemthNndsIn0.Stsp5PZX85YeRpdAXnInZA';

@inject('store') @observer
export default class Map extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [174.7633, -36.8485],
      zoom: 10,
    });

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'trips',
        type: 'line',
        source: {
          type: 'vector',
          url: 'mapbox://zoercai.4jvc8cva',
        },
        'source-layer': 'all',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'rgba(251, 188, 5 ,0.3)',
          'line-width': 1,
        },
      });

      this.mapLayers.push('trips');
    });
  }

  mapLayers = [];

  applyFilters = () => {
    const activeFilters = toJS(this.props.store.activeFilters);
    const numOfActiveFilters = _.reduce(activeFilters, (result, value) => result + value.length, 0);
    if (this.map != null && numOfActiveFilters === 0) {
      this.mapLayers.forEach((layer) => {
        this.map.setFilter(layer, null);
      });
    } else if (numOfActiveFilters > 0) {
      const allMapFilters = {};
      _.forEach(activeFilters, (value, key) => {
        value.forEach((filterOption) => {
          if (allMapFilters[key] == null) {
            allMapFilters[key] = ['any', ['==', key, filterOption]];
          } else {
            allMapFilters[key].push(['==', key, filterOption]);
          }
        });
      });
      const outputFilters = ['all'];
      for (const filter in allMapFilters) {
        if (allMapFilters[filter] != null) {
          outputFilters.push(allMapFilters[filter]);
        }
      }
      this.mapLayers.forEach((layer) => {
        this.map.setFilter(layer, outputFilters);
      });
    }
  }

  render() {
    this.applyFilters();
    return (
      <div>
        <div
          ref={(el) => {
            this.mapContainer = el;
          }
          }
          className={styles.map}
        />

        <div className={styles.filterContainer}>
          <PosFilter />
        </div>
      </div >
    );
  }
}
