import React from 'react';
import mapboxgl from 'mapbox-gl';
import { observer, inject } from 'mobx-react';
import styles from './map.css';
import PosFilter from './PosFilter';

// TODO where to store this?
mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lcmNhaSIsImEiOiJjamR0ZGs2OGcxNGFmMndwa2NqemthNndsIn0.Stsp5PZX85YeRpdAXnInZA';

@inject('store') @observer
export default class Map extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
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
          'line-color': 'rgba(238,49,36,0.3)',
          'line-width': 5,
        },
      });

      this.mapLayers.push('trips');
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

   toggleOtherLayers = (layer) => {
     this.linesFiltered = true;
     this.mapLayers.forEach((layerId) => {
       if (layerId.indexOf(layer) <= -1 && this.map.getLayoutProperty(layerId, 'visibility') === 'visible') {
         this.map.setLayoutProperty(layerId, 'visibility', 'none');
       } else if (layerId.indexOf(layer) <= -1 && this.map.getLayoutProperty(layerId, 'visibility') === 'none') {
         this.map.setLayoutProperty(layerId, 'visibility', 'visible');
       }
     });
   };

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
