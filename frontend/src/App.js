import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {scaleThreshold} from 'd3-scale';
import ControlPanel from './control-panel';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXNjb2xlczAxIiwiYSI6ImNrNnhqaDF3dzBhNjMzZW8waHpnMzN5ZWsifQ.mLeEly0rwEBCNiffXh_0tg'; 

export const COLOR_SCALE = scaleThreshold()
  .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    
  ]);

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

const data = require('./result.json');


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredObject: null,
      choice: "ANNUAL",
      modifier: 1,
       text:" / M^2 Solar Potential",
      INITIAL_VIEW_STATE: INITIAL_VIEW_STATE
      
    };
    this._onHover = this._onHover.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);

    const lightingEffect = new LightingEffect({ambientLight, dirLight});
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    this._effects = [lightingEffect];
    this.onChangeChoice = this.onChangeChoice.bind(this);
    this.onSelectM2 = this.onSelectM2.bind(this);

    this.onSelectRooftop = this.onSelectRooftop.bind(this);
    this.zipChange = this.zipChange.bind(this);

  }

  onChangeChoice(choice, check1, check2){
    if(check1 || check2){
      console.log(check1)
    }else{
    this.setState({ choice: choice});
    }

    

  }

  // This changes the focus of the map to a specific zip code area
  zipChange(zip){
   data.features.forEach((feature) => {
     if(zip == "None"){
      this.setState({
        viewState: undefined
     })}
      if(feature.properties.zip == zip){
        var coordX = feature.properties.X_COORD
        var coordY = feature.properties.Y_COORD

        this.setState({
          viewState: {
            latitude: coordY,
            longitude: coordX,
            zoom: 10,
            maxZoom: 16,
            pitch: 0,
            bearing: 0
          }})
      }
    });
  }

  // this is for changing the view for rooftop per m^2 potential
  onSelectM2(checked,month){
    if(checked){
      this.setState({choice: "norm_potential", modifier: 1, text:"/ M^2"})
    } else {
      this.setState({choice: "ANNUAL", modifier: 1, text:" / M^2 Solar Potential"})
    }
  }
  
  // this is for changing the view for rooftop total potential
  onSelectRooftop(checked,month){
    if(checked){
      this.setState({choice: "abs_potential", modifier: 50000, text:" total possible on roofing"})
    } else {
      this.setState({choice: "ANNUAL", modifier: 1, text:" / M^2 Solar Potential "})
    }
  }

  _onHover({x, y, object}) {
    this.setState({x, y, hoveredObject: object});
  }

  _renderLayers(choice) {
    
    return [
      // only needed when using shadows - a plane for shadows to drop on
      // new PolygonLayer({
      //   id: 'ground',
      //   data: data,
      //   stroked: false,
      //   getPolygon: f => f,
      //   getFillColor: [0, 0, 0, 0]
      // }),
      new GeoJsonLayer({
        id: 'geojson',
        data,
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        // getElevation: f => Math.sqrt(f.properties[this.state.choice]) * 100000 ,
        getFillColor: f => COLOR_SCALE(f.properties[choice] / this.state.modifier),
        getLineColor: [255, 255, 255],
        pickable: true,
        onHover: this._onHover,
        updateTriggers: {
          getFillColor: [this.state.choice]
      }
      })
    ];
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
            <div>{hoveredObject.properties.AREA_1} KM size </div>
            <div>
              {hoveredObject.properties[this.state.choice]} KWh {this.state.text}
            </div>
            <div>
            ZIP: {hoveredObject.properties.zip} 
            </div>
          </div>
         </div>
     
      )
    );
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/light-v9'} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers(this.state.choice)}
        // effects={this._effects}
        initialViewState={this.state.INITIAL_VIEW_STATE}
        controller={true}
        viewState={this.state.viewState}

      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      <ControlPanel 
       onChangeChoice = {this.onChangeChoice}
      choice= {this.state.choice}
      onSelectM2={this.onSelectM2}
      onSelectRooftop={this.onSelectRooftop}
      zipChange={this.zipChange}/>
        {this._renderTooltip}
      </DeckGL>
    );
  }
}
// export default App;
export function renderToDOM(container) {
  render(<App />, container);
}
