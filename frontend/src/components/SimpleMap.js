import React, { Component } from 'react';
import GoogleMapReact from 'google-maps-react';
import marker from '../graphics-assets/Logo_32.png';
import home from '../graphics-assets/you.png';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  distance(lat1, lon1, lat2, lon2) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
      return dist;
    }
  }
 
 
  
  render() {
    const distance = this.distance(this.props.location.latitude, this.props.location.longitude, this.props.emergency_location.latitude, this.props.emergency_location.longitude)
    const zoom = distance < 20 ? 12 : 7
    console.log(zoom)
    const center = {
        lat: (this.props.location.latitude + this.props.emergency_location.latitude) / 2,
        lng: (this.props.location.longitude+ this.props.emergency_location.longitude) / 2
    }
    return (
    
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%', marginBottom: '5vh', marginTop: '5vh'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDDh061bzOObTWtZjdF0Q1PROynuIiSMX4'}}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={this.props.location.latitude}
            lng={this.props.location.longitude}
            text={<img src={home} alt="marker" />}
          />
          <AnyReactComponent
            lat={this.props.emergency_location.latitude}
            lng={this.props.emergency_location.longitude}
            text={<img src={marker} alt="marker" />}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;