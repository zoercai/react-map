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
          'line-color': 'rgba(131,7,123,0.6)',
          'line-width': 5,
        },
      });
      //  trying to filter?
      // trips.features.forEach((feature) => {
      //   const vehicleId = feature.properties.vehicleId;
      //   const layerId = `linesLayer-${vehicleId}`;

      //   // Add a layer for this vehicleId if it hasn't been added already.
      //   if (!this.map.getLayer(layerId)) {
      //     this.map.addLayer({
      //       id: layerId,
      //       type: 'line',
      //       source: 'linesLayer',
      //       layout: {
      //         'line-join': 'round',
      //         'line-cap': 'round',
      //       },
      //       paint: {
      //         'line-color': 'rgba(131,7,123,0.6)',
      //         'line-width': 5,
      //       },
      //       filter: ['==', 'vehicleId', vehicleId],
      //     });
      //     this.layerIds.push(layerId);
      //   }
      // });

      // Points layer
      // this.map.addSource('pointsLayer', {
      //   type: 'geojson',
      //   data: this.props.store.events,
      // });
      // this.map.addLayer({
      //   id: 'pointsLayer',
      //   type: 'symbol',
      //   source: 'pointsLayer',
      //   layout: {
      //     'icon-image': 'rocket-15',
      //     'text-field': 'ignition',
      //     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      //     'text-offset': [0, 0.6],
      //     'text-anchor': 'top',
      //   },
      // });
      // this.layerIds.push('pointsLayer');
    });
  }

  // layerIds = [];
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

  // toggleAllTrips = () => {
  //   this.layerIds.forEach((layerId) => {
  //     if (layerId.indexOf('linesLayer') > -1) {
  //       if (this.linesFiltered) {
  //         this.map.setLayoutProperty(layerId, 'visibility', 'visible');
  //       } else {
  //         this.map.setLayoutProperty(layerId, 'visibility', 'none');
  //       }
  //     }
  //   });
  //   this.linesFiltered = !this.linesFiltered;
  // };

  // toggleLayerType = (layerType) => {
  //   this.layerIds.forEach((layerId) => {
  //     if (layerId.indexOf(layerType) > -1) {
  //       if (this.map.getLayoutProperty(layerId, 'visibility') === 'none') {
  //         this.map.setLayoutProperty(layerId, 'visibility', 'visible');
  //       } else {
  //         this.map.setLayoutProperty(layerId, 'visibility', 'none');
  //       }
  //     }
  //   });
  // };

  filterByLayer = (layerPrefix) => {
    this.linesFiltered = true;
    this.map.setFilter('trips', ['==', 'vehicleId', layerPrefix]);
    // this.map.setFilter('trips', ['all', this.map.getFilter('trips'), ['==', 'vehicleId', layerPrefix]]);
  };
  // filterByLayer = (layerPrefix) => {
  //   this.linesFiltered = true;
  //   this.layerIds.forEach((layerId) => {
  //     if (layerId.indexOf(layerPrefix) > -1) {
  //       this.map.setLayoutProperty(layerId, 'visibility', 'visible');
  //     } else {
  //       this.map.setLayoutProperty(layerId, 'visibility', 'none');
  //     }
  //   });
  // };

  filterBySensor = (sensorName) => {
    this.linesFiltered = true;
    // const features = this.map.queryRenderedFeatures(layerId);
    // this.map.setFilter('trips', ['all', this.map.getFilter('trips'), ['==', 'sensorName', sensorName]]);
    this.map.setFilter('trips', ['==', 'sensorName', sensorName]);
  }
  // filterBySensor = (sensorName) => {
  //   this.linesFiltered = true;
  //   this.layerIds.forEach((layerId) => {
  //     // const features = this.map.queryRenderedFeatures(layerId);
  //     // this.map.setFilter(layerId, ['all', this.map.getFilter(layerId), ['==', 'sensorName', sensorName]]);
  //     this.map.setFilter(layerId, ['==', 'sensorName', sensorName]);
  //   });
  // }

  // filterByLayerSearch = (event) => {
  //   this.linesFiltered = true;
  //   const term = event.target.value.trim().toLowerCase();
  //   this.map.setFilter('trips', ['has', 'vehicleId', term]);
  // };
  // filterByLayerSearch = (event) => {
  //   const term = event.target.value.trim().toLowerCase();
  //   this.linesFiltered = true;
  //   this.layerIds.forEach((layerId) => {
  //     const layerIdLower = layerId.trim().toLowerCase();
  //     if (layerIdLower.indexOf(term) > -1) {
  //       this.map.setLayoutProperty(layerId, 'visibility', 'visible');
  //     } else {
  //       this.map.setLayoutProperty(layerId, 'visibility', 'none');
  //     }
  //   });
  // };

  render() {
    return (
      <div>
        <div className={styles.menu}>
          <span className={styles.active} onClick={() => this.toggleAllTrips()}> All Trips </span>
          <span className={styles.active} onClick={() => this.toggleLayerType('pointsLayer')}> Points </span>
          <span className={styles.active} onClick={() => this.filterBySensor('Input1')}> Input1 </span>
          <span className={styles.active} onClick={() => this.filterBySensor('Seatbelt')}> Seatbelt </span>
          <span className={styles.active} onClick={() => this.filterBySensor('Input2')}> Input2 </span>
          <span className={styles.active} onClick={() => this.filterByLayer('smiley')}> Smiley </span>
          <span className={styles.active} onClick={() => this.filterByLayer('bigW')}> BigW </span>
          <span className={styles.active} onClick={() => this.filterByLayer('zigzaghamilton')}> zigzaghamilton </span>
          <span className={styles.active} onClick={() => this.filterByLayer('longAuckland')}> LongAuckland </span>
          <span className={styles.active} onClick={() => this.filterByLayer('linesLayer-Eroad-D4')}> Eroad-D4 </span>
        </div>{
        }<div
          ref={(el) => {
            this.mapContainer = el;
          }
          }
          className={styles.map}
        />

        {/* <div className={styles.filterInput}>
          <input id="filter-input" type="text" name="searchFilter" placeholder="Filter by vehicleId" onChange={this.filterByLayerSearch} />
        </div> */}
      </div >
    );
  }
}
