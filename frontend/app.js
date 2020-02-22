import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {scaleThreshold} from 'd3-scale';
import ControlPanel from './control-panel';
// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXNjb2xlczAxIiwiYSI6ImNrNnhqaDF3dzBhNjMzZW8waHpnMzN5ZWsifQ.mLeEly0rwEBCNiffXh_0tg'; // eslint-disable-line

// export const COLOR_SCALE = scaleThreshold()
//   .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
//   .range([
//     [65, 182, 196],
//     [127, 205, 187],
//     [199, 233, 180],
//     [237, 248, 177],
//     // zero
//     [255, 255, 204],
//     [255, 237, 160],
//     [254, 217, 118],
//     [254, 178, 76],
//     [253, 141, 60],
//     [252, 78, 42],
    
//   ]);

const INITIAL_VIEW_STATE = {
  latitude: 41.650623,
  longitude: -102.693757,
  zoom: 3,
  maxZoom: 16,
  pitch: 10,
  bearing: 0
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: true
});


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredObject: null,
      Month: "ANNUAL"
    };
    this._onHover = this._onHover.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
    this.renderLayers = this.renderLayers.bind(this);

    const lightingEffect = new LightingEffect({ambientLight, dirLight});
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    this._effects = [lightingEffect];
    this.onChangeMonth = this.onChangeMonth.bind(this);

  }
  onChangeMonth(vMonth){
    console.log(vMonth)
    this.setState({ Month: vMonth});

    
  }

  _onHover({x, y, object}) {
    this.setState({x, y, hoveredObject: object});
  }
  onStyleLoad = (map, e) => {
    this.setState( {map} );
  }
  componentWillUpdate(nextProps, nextState) {
    const { map, Month } = nextState;
    if (map) {
      map.getSource('geojson')(Month);
    }
  }
  
  _renderLayers(month) {
    const COLOR_SCALE = scaleThreshold()
  .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    
  ]);
    const data = require('../data/solardata.json');
    console.log(month)
    return [
      // only needed when using shadows - a plane for shadows to drop on
      new PolygonLayer({
        id: 'ground',
        data: data,
        stroked: false,
        getPolygon: f => f,
        getFillColor: [0, 0, 0, 0]
      }),
      new GeoJsonLayer({
        id: 'geojson',
        data,
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        // getElevation: f => Math.sqrt(f.properties[this.state.Month]) * 100000 ,
        getFillColor: f => COLOR_SCALE(f.properties[month]),
        getLineColor: [255, 255, 255],
        pickable: true,
        onHover: this._onHover
      })
    ];
  }
  renderLayers(state){
    const {mapStyle = 'mapbox://styles/mapbox/light-v9'} = this.props;

return(
  <DeckGL
    onStyleLoad={this.onStyleLoad}
        layers={this._renderLayers(state.Month)}
        // effects={this._effects}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      <ControlPanel 
      onChangeMonth = {this.onChangeMonth}
      Month= {state.Month}/>
        {this._renderTooltip}
      </DeckGL>
)
  }
  componentWillUpdate(nextProps, nextState) {
    return (
        this.render()
    )
  }
  _renderTooltip() {
    const {x, y, hoveredObject} = this.state;
    return (
      hoveredObject && (
        <div className="tooltip" style={{top: y, left: x}}>
          <div>
            <b>Average Solar Radiation</b>
          </div>
          <div>
            <div>{hoveredObject.properties.AREA_1} / size</div>
            <div>
              {hoveredObject.properties[this.state.Month]} KWh
{              this.state.Month
}            </div>
          </div>
         </div>
     
      )
    );
  }

  render() {

    return (
      this.renderLayers(this.state)
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
