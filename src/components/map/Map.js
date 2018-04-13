import React from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Switch from 'react-toolbox/lib/switch';
import { observable, toJS } from 'mobx';
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
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [174.8860, -40.9006],
      zoom: 4,
    });

    this.map.on('style.load', () => {
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
      this.applyFilters();
    });

    this.map.flyTo({
      zoom: 4,
    });

    this.map.on('render', this.afterChangeComplete);
  }

  afterChangeComplete = () => {
    if (!this.map.loaded()) {
      this.map.flyTo({
        zoom: 4,
      });
      return;
    } // still not loaded; bail out.

    // now that the map is loaded, it's safe to query the features:
    const filteredSourceFeatures = this.map.querySourceFeatures('trips', { sourceLayer: 'all', filter: this.currentFilters });

    if (filteredSourceFeatures.length > 0) {
      const firstCoordinate = filteredSourceFeatures[0].geometry.type === 'LineString' ? filteredSourceFeatures[0].geometry.coordinates[0] : filteredSourceFeatures[0].geometry.coordinates[0][0];
      const bounds = new mapboxgl.LngLatBounds(firstCoordinate, firstCoordinate);
      filteredSourceFeatures.forEach(feature =>
        feature.geometry.coordinates.forEach((coordinate) => {
          if (feature.geometry.type === 'LineString') {
            bounds.extend(coordinate);
          } else if (feature.geometry.type === 'MultiLineString') {
            coordinate.forEach((linestringCoordinate) => {
              if (linestringCoordinate[0] > 170 && linestringCoordinate[1] < -30) {
                bounds.extend(linestringCoordinate);
              }
            });
          }
        },
        ));
      this.map.fitBounds(bounds, {
        padding: 20,
      });
      this.map.off('render', this.afterChangeComplete); // remove this handler now that we're done.
    }
  }

  mapLayers = [];
  currentFilters = null;

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

      this.currentFilters = outputFilters;

      this.map.on('render', this.afterChangeComplete);
    }
  }

  @observable satelliteOn = false;

  // Toggle satellite
  toggleSatellite = () => {
    this.satelliteOn = !this.satelliteOn;
    if (this.satelliteOn) {
      this.map.setStyle('mapbox://styles/mapbox/satellite-v9');
    } else {
      this.map.setStyle('mapbox://styles/mapbox/dark-v9');
    }

    this.map.on('render', this.afterChangeComplete);
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
          <PosFilter applyFilters={this.applyFilters} />
        </div>

        <Switch
          className={styles.satelliteSwitch}
          checked={this.satelliteOn}
          label="Satellite"
          onChange={this.toggleSatellite}
        />
      </div >
    );
  }
}
