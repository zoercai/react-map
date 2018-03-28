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

      this.mapLayers.push('trips');

      // On points Layer
      const onPoints = this.props.store.onPoints;

      this.map.addSource('onPointsLayer', {
        type: 'geojson',
        data: onPoints,
      });

      this.map.addLayer({
        id: 'onPoints',
        type: 'symbol',
        source: 'onPointsLayer',
        layout: {
          'icon-image': 'rocket-15',
          'icon-allow-overlap': true,
        },
      });

      this.mapLayers.push('onPoints');
      this.popupLayers.push('onPoints');

      // On points Layer
      const offPoints = this.props.store.offPoints;

      this.map.addSource('offPointsLayer', {
        type: 'geojson',
        data: offPoints,
      });

      this.map.addLayer({
        id: 'offPoints',
        type: 'symbol',
        source: 'offPointsLayer',
        layout: {
          'icon-image': 'star-15',
          'icon-allow-overlap': true,
        },
      });

      this.mapLayers.push('offPoints');
      this.popupLayers.push('offPoints');

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.popupLayers.forEach((layer) => {
        this.map.on('mouseenter', layer, (e) => {
        // Change the cursor style as a UI indicator.
          this.map.getCanvas().style.cursor = 'pointer';

          const coordinates = e.features[0].geometry.coordinates.slice();
          const vehicleId = e.features[0].properties.vehicleId;
          const sensorName = e.features[0].properties.sensorName;

          const html = `<strong>Point: </strong> ${layer} <br/> <strong>Vehicle: </strong> ${vehicleId} <br/> <strong>Sensor: </strong> ${sensorName}`;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates)
            .setHTML(html)
            .addTo(this.map);
        });

        this.map.on('mouseleave', layer, () => {
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    });
  }

  mapLayers = [];
  popupLayers = [];

  applyFilters = (activeFilters) => {
    if (this.map != null && activeFilters.length === 0) {
      this.mapLayers.forEach((layer) => {
        this.map.setFilter(layer, null);
      });
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
      this.mapLayers.forEach((layer) => {
        this.map.setFilter(layer, outputFilters);
      });
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
