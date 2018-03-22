import React from 'react';
import mapboxgl from 'mapbox-gl';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './map.css';

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
          'line-color': 'rgba(131,7,123,0.6)',
          'line-width': 5,
        },
      });
    });
  }

  linesFiltered = false;

  toggleAllTrips = () => {
    if (this.linesFiltered) {
      this.map.setLayoutProperty('trips', 'visibility', 'visible');
      this.map.setFilter('trips', null);
    } else {
      this.map.setLayoutProperty('trips', 'visibility', 'none');
    }
    this.linesFiltered = !this.linesFiltered;
  };

  filterByVehicleId = (vehicleId) => {
    this.linesFiltered = true;
    this.map.setFilter('trips', ['==', 'vehicleId', vehicleId]);
    // this.map.setFilter('trips', ['all', this.map.getFilter('trips'), ['==', 'vehicleId', vehicleId]]);
  };

  filterBySensor = (sensorName) => {
    this.linesFiltered = true;
    // const features = this.map.queryRenderedFeatures(layerId);
    // this.map.setFilter('trips', ['all', this.map.getFilter('trips'), ['==', 'sensorName', sensorName]]);
    this.map.setFilter('trips', ['==', 'sensorName', sensorName]);
  }

  filterByMultiple = () => {
    this.linesFiltered = true;
    const anyFilter = ['any', ['==', 'vehicleId', 'smiley'], ['==', 'vehicleId', 'zigzaghamilton']];
    // this.map.setFilter('trips', ['any', ['==', 'vehicleId', 'smiley'], ['==', 'vehicleId', 'zigzaghamilton']]);
    this.map.setFilter('trips', ['all', anyFilter, ['==', 'sensorName', 'Input1']]);
  }

  render() {
    return (
      <div>
        <div className={styles.menu}>
          <span className={styles.active} onClick={() => this.toggleAllTrips()}> All Trips </span>
          <span className={styles.active} onClick={() => this.filterBySensor('Input1')}> Input1 </span>
          <span className={styles.active} onClick={() => this.filterBySensor('Seatbelt')}> Seatbelt </span>
          <span className={styles.active} onClick={() => this.filterBySensor('Input2')}> Input2 </span>
          <span className={styles.active} onClick={() => this.filterByVehicleId('smiley')}> Smiley </span>
          <span className={styles.active} onClick={() => this.filterByVehicleId('bigW')}> BigW </span>
          <span className={styles.active} onClick={() => this.filterByVehicleId('zigzaghamilton')}> zigzaghamilton </span>
          <span className={styles.active} onClick={() => this.filterByVehicleId('longAuckland')}> LongAuckland </span>
          <span className={styles.active} onClick={() => this.filterByVehicleId('linesLayer-Eroad-D4')}> Eroad-D4 </span>
          <span className={styles.active} onClick={() => this.filterByMultiple()}> Seatbelt/zigzaghamilton </span>
        </div>{
        }<div
          ref={(el) => {
            this.mapContainer = el;
          }
          }
          className={styles.map}
        />
      </div >
    );
  }
}
