import React from 'react';
import mapboxgl from 'mapbox-gl';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './map.css';
import PosFilter from './PosFilter';

// TODO where to store this?
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

@inject('store') @observer
export default class Map extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [174.7633, -36.8485],
      zoom: 10,
    });

    this.map.on('load', () => {
      // Lines Layer
      const trips = this.props.store.trips;

      this.map.addSource('linesLayer', {
        type: 'geojson',
        data: trips,
      });

      this.map.addLayer({
        id: 'trips',
        type: 'line',
        source: 'linesLayer',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'rgba(238,49,36,0.3)',
          'line-width': 5,
        },
      });
    });
  }

  applyFilters = (activeFilters) => {
    if (this.map != null && activeFilters.length === 0) {
      this.map.setFilter('trips', null);
    } else if (activeFilters.length !== 0) {
      const allMapFilters = {};
      activeFilters.forEach((filterOption) => {
        if (allMapFilters[filterOption.type] == null) {
          allMapFilters[filterOption.type] = ['any', ['==', filterOption.type, filterOption.id]];
        } else {
          allMapFilters[filterOption.type].push(['==', filterOption.type, filterOption.id]);
        }
      });
      const outputFilters = ['all'];
      for (const filter in allMapFilters) {
        if (allMapFilters[filter] != null) {
          outputFilters.push(allMapFilters[filter]);
        }
      }
      this.map.setFilter('trips', outputFilters);
    }
  }

  render() {
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
          <PosFilter setFilters={this.applyFilters} />
        </div>
      </div >
    );
  }
}
