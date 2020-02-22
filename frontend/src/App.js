import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';
import {json as requestJson} from 'd3-request';
import {boxLayer} from './map-style';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXNjb2xlczAxIiwiYSI6ImNrNnhqaDF3dzBhNjMzZW8waHpnMzN5ZWsifQ.mLeEly0rwEBCNiffXh_0tg'; // Set your mapbox token here

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter(feature => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return {type: 'FeatureCollection', features};
}

export default class App extends Component {
  constructor(props) {
    super(props);
    const current = new Date().getTime();

    this.state = {
      viewport: {
        latitude: 40,
        longitude: -100,
        zoom: 3,
        bearing: 0,
        pitch: 0
      },
      allDay: true,
      startTime: current,
      endTime: current,
      selectedTime: current,
      earthquakes: null
    };

    this._handleChangeDay = this._handleChangeDay.bind(this);
    this._handleChangeAllDay = this._handleChangeAllDay.bind(this);
  }

  componentDidMount() {
    var response = require('../../data/solardata.json'); //(with path)
    console.log(response)
        
    const features = response.features;
          const endTime = features[0].properties.time;
          const startTime = features[features.length - 1].properties.time;

          
          response.features.forEach(feature => {
            if (feature.geometry.type === "Polygon") {
              // Copy the polygon geometry and replace it with a
              // point at the polygon's centroid.
  
              feature.geometry = {
                coordinates: [feature.properties.X_COORD, feature.properties.Y_COORD],
                type: "Point"
              };
            
              
          }
        })
        
          
          this.setState({
            data: response,
            earthquakes: response,
            endTime,
            startTime,
            selectedTime: endTime
          });

  

}


  _onViewportChange = viewport => this.setState({viewport});

  _handleChangeDay = time => {
    this.setState({selectedTime: time});
    if (this.state.earthquakes) {
      this.setState({data: filterFeaturesByDay(this.state.earthquakes, time)});
    }
  };

  _handleChangeAllDay = allDay => {
    this.setState({allDay});
    if (this.state.earthquakes) {
      this.setState({
        data: allDay
          ? this.state.earthquakes
          : filterFeaturesByDay(this.state.earthquakes, this.state.selectedTime)
      });
    }
  
};

  render() {
    const {viewport, data, allDay, selectedTime, startTime, endTime} = this.state;

    return (
      <div style={{height: '100%', position: 'relative'}}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {data && (
            <Source type="geojson" data={data}>
              <Layer {... boxLayer} />
            </Source>
          )}
        </MapGL>
        <ControlPanel
          containerComponent={this.props.containerComponent}
          startTime={startTime}
          endTime={endTime}
          selectedTime={selectedTime}
          allDay={allDay}
          onChangeDay={this._handleChangeDay}
          onChangeAllDay={this._handleChangeAllDay}
        />
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
